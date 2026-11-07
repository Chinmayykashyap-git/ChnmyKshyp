#!/usr/bin/env node
/**
 * Fetches live competitive programming & GitHub stats for Chinmay Kashyap:
 * 1. LeetCode public GraphQL endpoint (user: "chinmayykashyap")
 * 2. HackerRank public REST endpoints (user: "wrkchinmay") — best-effort with fallback
 * 3. GitHub public REST API (user: "Chinmayykashyap-git")
 * 4. Merges any manual overrides from /data/manual-stats.json
 * Never fails destructively: preserves last-known good values on any network error.
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const ROOT = process.cwd();
const STATS_PATH = path.join(ROOT, 'public', 'data', 'stats.json');
const MANUAL_PATH = path.join(ROOT, 'data', 'manual-stats.json');
const PUBLIC_MANUAL_PATH = path.join(ROOT, 'public', 'data', 'manual-stats.json');

function requestJson(url, options = {}) {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Chinmay-Portfolio-Stats-Action/1.0',
          Accept: 'application/json',
          ...(options.headers || {}),
        },
        timeout: 12000,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve({ ok: true, data: JSON.parse(body) });
            } catch {
              resolve({ ok: false, error: 'Invalid JSON response' });
            }
          } else {
            resolve({ ok: false, error: `HTTP ${res.statusCode}` });
          }
        });
      }
    );
    req.on('error', (err) => resolve({ ok: false, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, error: 'Request timed out' });
    });
    if (options.body) req.write(options.body);
    req.end();
  });
}

function readJsonSafe(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.warn(`Warning reading ${filePath}:`, err.message);
  }
  return fallback;
}

async function fetchLeetCode(username, previous) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
      }
    }
  `;

  const res = await requestJson('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username } }),
  });

  if (!res.ok || !res.data?.data?.matchedUser) {
    console.warn('LeetCode fetch failed, keeping last-known values:', res.error);
    return previous;
  }

  const user = res.data.data.matchedUser;
  const contest = res.data.data.userContestRanking;
  const stats = user.submitStatsGlobal?.acSubmissionNum || [];
  const getDiff = (d) => stats.find((s) => s.difficulty === d) || { count: 0, submissions: 0 };

  const all = getDiff('All');
  const easy = getDiff('Easy');
  const medium = getDiff('Medium');
  const hard = getDiff('Hard');

  let calendar = {};
  try {
    calendar = JSON.parse(user.userCalendar?.submissionCalendar || '{}');
  } catch {
    calendar = previous?.submissionCalendar || {};
  }

  const acceptanceRate =
    all.submissions > 0 ? Number(((all.count / all.submissions) * 100).toFixed(1)) : previous?.acceptanceRate || 80;

  return {
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    ranking: user.profile?.ranking ?? previous?.ranking ?? null,
    totalSolved: all.count,
    easySolved: easy.count,
    mediumSolved: medium.count,
    hardSolved: hard.count,
    totalSubmissions: all.submissions,
    easySubmissions: easy.submissions,
    mediumSubmissions: medium.submissions,
    hardSubmissions: hard.submissions,
    acceptanceRate,
    streak: user.userCalendar?.streak ?? previous?.streak ?? 0,
    totalActiveDays: user.userCalendar?.totalActiveDays ?? previous?.totalActiveDays ?? 0,
    contestRating: contest?.rating ? Math.round(contest.rating) : previous?.contestRating ?? null,
    submissionCalendar: calendar,
  };
}

async function fetchHackerRank(username, previous) {
  const badgesRes = await requestJson(`https://www.hackerrank.com/rest/hackers/${username}/badges`);
  if (!badgesRes.ok || !Array.isArray(badgesRes.data?.models)) {
    console.warn('HackerRank fetch failed, keeping last-known values:', badgesRes.error);
    return previous;
  }

  const badges = badgesRes.data.models
    .filter((b) => (b.solved || 0) > 0 || (b.current_points || 0) > 0 || (b.stars || 0) > 0)
    .map((b) => ({
      name: b.badge_short_name || b.badge_name || 'Domain',
      category: b.category_name || 'Skill',
      solved: b.solved || 0,
      totalChallenges: b.total_challenges || 0,
      points: Number((b.current_points || 0).toFixed(2)),
      progressToNextStar: Math.round((b.progress_to_next_star || 0) * 100),
      stars: b.stars || (b.current_points > 0 ? 1 : 0),
    }));

  return {
    username,
    profileUrl: `https://www.hackerrank.com/profile/${username}`,
    badges: badges.length > 0 ? badges : previous?.badges || [],
    activeTracks: previous?.activeTracks || [
      'Artificial Intelligence',
      'Algorithms',
      'Data Structures',
      'Python',
      'Java',
      'SQL',
    ],
    certificates: previous?.certificates || [],
  };
}

async function fetchGitHub(username, previous) {
  const userRes = await requestJson(`https://api.github.com/users/${username}`);
  if (!userRes.ok || !userRes.data) {
    console.warn('GitHub user fetch failed, keeping last-known values:', userRes.error);
    return previous;
  }

  const u = userRes.data;
  return {
    ...previous,
    username,
    profileUrl: u.html_url || `https://github.com/${username}`,
    publicRepos: u.public_repos ?? previous?.publicRepos ?? 29,
    followers: u.followers ?? previous?.followers ?? 3,
    following: u.following ?? previous?.following ?? 5,
    bio: (u.bio || previous?.bio || 'Building at the Edge of Finance × Cloud × LLMs').trim(),
  };
}

async function main() {
  const existing = readJsonSafe(STATS_PATH, {});
  const manual = readJsonSafe(MANUAL_PATH, {});

  // Sync manual-stats.json to public/data/manual-stats.json so static frontend also has access
  fs.mkdirSync(path.dirname(PUBLIC_MANUAL_PATH), { recursive: true });
  if (fs.existsSync(MANUAL_PATH)) {
    fs.copyFileSync(MANUAL_PATH, PUBLIC_MANUAL_PATH);
  }

  const lcUser = manual.leetcode?.username || existing.leetcode?.username || 'chinmayykashyap';
  const hrUser = manual.hackerrank?.username || existing.hackerrank?.username || 'wrkchinmay';
  const ghUser = existing.github?.username || 'Chinmayykashyap-git';

  let leetcode = await fetchLeetCode(lcUser, existing.leetcode);
  if (manual.leetcode?.useManualOverride) {
    leetcode = { ...leetcode, ...manual.leetcode };
  }

  let hackerrank = await fetchHackerRank(hrUser, existing.hackerrank);
  if (manual.hackerrank?.useManualOverride) {
    hackerrank = { ...hackerrank, ...manual.hackerrank };
  }

  const github = await fetchGitHub(ghUser, existing.github);

  const nextStats = {
    lastUpdated: new Date().toISOString(),
    source: 'github-actions-cron-or-dispatch',
    leetcode,
    hackerrank,
    github,
  };

  fs.mkdirSync(path.dirname(STATS_PATH), { recursive: true });
  fs.writeFileSync(STATS_PATH, JSON.stringify(nextStats, null, 2) + '\n', 'utf8');
  console.log(`Updated ${STATS_PATH} at ${nextStats.lastUpdated}`);
}

main();
