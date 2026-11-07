/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') : '';
// If deployed to a project page (not <username>.github.io), respect NEXT_PUBLIC_BASE_PATH
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isGithubActions && repoName && !repoName.toLowerCase().endsWith('.github.io') ? `/${repoName}` : '');

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
