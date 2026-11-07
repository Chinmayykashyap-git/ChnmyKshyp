#!/usr/bin/env node
/**
 * Zero-dependency, ATS-readable, 1-page PDF Resume generator
 * Writes /public/Chinmay_Kashyap_Resume.pdf from verified facts.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_PATH = path.join(process.cwd(), 'public', 'Chinmay_Kashyap_Resume.pdf');

function escapePdfText(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/·/g, '|')
    .replace(/~/g, '~')
    .replace(/[^\x20-\x7E]/g, ' ');
}

function buildResumeContentStream() {
  const ops = [];
  const pageWidth = 612; // Letter width (8.5in * 72)
  const margin = 40;
  let y = 756;

  const setColor = (r, g, b) => ops.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
  const setStrokeColor = (r, g, b) => ops.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG`);

  const text = (str, x, yPos, font = 'F1', size = 9.0) => {
    ops.push(`BT /${font} ${size} Tf ${x.toFixed(1)} ${yPos.toFixed(1)} Td (${escapePdfText(str)}) Tj ET`);
  };

  const rule = (yPos) => {
    setStrokeColor(0.78, 0.82, 0.92);
    ops.push(`0.6 w ${margin} ${yPos.toFixed(1)} m ${pageWidth - margin} ${yPos.toFixed(1)} l S`);
  };

  const sectionHeader = (title) => {
    y -= 9;
    setColor(0.12, 0.24, 0.62);
    text(title.toUpperCase(), margin, y, 'F2', 9.0);
    y -= 3.5;
    rule(y);
    y -= 10.5;
    setColor(0.1, 0.12, 0.18);
  };

  const bullet = (str, indent = margin + 8) => {
    setColor(0.18, 0.2, 0.26);
    text('-', margin, y, 'F2', 8.5);
    text(str, indent, y, 'F1', 8.5);
    y -= 10.8;
  };

  // Top Header
  setColor(0.05, 0.09, 0.2);
  text('CHINMAY KASHYAP', margin, y, 'F2', 17.5);
  text('Jaipur, India  |  wrkchinmay@gmail.com', pageWidth - margin - 165, y + 3, 'F1', 8.5);
  y -= 13;

  setColor(0.16, 0.29, 0.72);
  text(
    'Machine Learning Engineer  |  Cloud & Backend Software Engineer (AWS & GCP)',
    margin,
    y,
    'F2',
    9.2
  );
  y -= 11;

  setColor(0.28, 0.32, 0.4);
  text(
    'GitHub: github.com/Chinmayykashyap-git  |  LinkedIn: linkedin.com/in/chinmay-kashyap-216108307  |  LeetCode: chinmayykashyap  |  HackerRank: wrkchinmay',
    margin,
    y,
    'F1',
    7.9
  );
  y -= 6;

  // Summary
  sectionHeader('Summary');
  text(
    'ML engineer and software engineering intern with experience across AWS, GCP, RAG, LLM applications, and end-to-end ML pipelines.',
    margin,
    y,
    'F1',
    8.6
  );
  y -= 10.5;
  text(
    'Built a financial risk classifier with ~94% accuracy and explainable predictions; filed a patent and submitted a research paper on financial',
    margin,
    y,
    'F1',
    8.6
  );
  y -= 10.5;
  text(
    'risk modeling. GSSoC 2026 open-source contributor.',
    margin,
    y,
    'F1',
    8.6
  );
  y -= 5;

  // Education
  sectionHeader('Education');
  setColor(0.06, 0.09, 0.18);
  text('Manipal University Jaipur  -  B.Tech in Computer & Communication Engineering', margin, y, 'F2', 9.0);
  text('Aug 2024 - Jul 2028  |  Jaipur, India', pageWidth - margin - 145, y, 'F2', 8.4);
  y -= 10.8;
  setColor(0.2, 0.23, 0.3);
  text('Seeking Machine Learning, Software Engineering, and Cloud Engineering internships.', margin, y, 'F1', 8.4);
  y -= 5;

  // Experience
  sectionHeader('Experience');

  const exp = [
    {
      role: 'Software Engineering Intern (Cohort 3)  -  ServiceNow',
      date: 'Apr 2026 - Aug 2026',
      bullets: [
        'Built workflow automation modules with JavaScript and REST APIs inside the enterprise software development lifecycle, reducing manual intervention.',
        'Earned first achievement badge in Week 1; collaborated on ITSM system design and state-transition testing.',
      ],
    },
    {
      role: 'Open Source Contributor  -  Kestra (Open-Source Contribution)',
      date: '2026 - Present',
      bullets: [
        'Kestra Core (Issue #19963, branch fix/19963-timezones-tests, commit 9c2dc0ab3, Chinmayykashyap-git/kestra, v2.1.0-SNAPSHOT): Added timeZones unit tests.',
        'Kestra Looker Plugin (io.kestra.plugin.looker, Issue #1 / PR #2): Built tasks, triggers, WireMock tests, docs & icons (./gradlew test: 32 passed).',
      ],
    },
    {
      role: 'AI & Cloud Computing Trainee  -  Amazon Web Services (AWS)',
      date: 'Jan 2026 - Feb 2026',
      bullets: [
        'Built generative AI applications with Bedrock, SageMaker, and Lambda; configured ML inference pipelines with autoscaling and cost controls.',
        'Published technical article on AWS Builder Center detailing the FinSight corporate bankruptcy prediction pipeline.',
      ],
    },
    {
      role: 'Cloud Facilitator  -  Google Cloud Community India',
      date: 'Dec 2025 - Jan 2026',
      bullets: [
        'Built a Document AI pipeline on GCP (9D9P-01) with CI/CD automation (9D9P-02: Cloud Build, Artifact Registry, Cloud Deploy) and GKE (9D9P-03).',
      ],
    },
    {
      role: 'Trainee, Forward Program  -  McKinsey & Company  |  Core Member  -  GDG Manipal University Jaipur',
      date: '2024 - 2026',
      bullets: [
        'Applied structured problem-solving frameworks to technology cases at McKinsey; organized cloud/ML workshops with GDG MUJ.',
      ],
    },
  ];

  for (const item of exp) {
    setColor(0.06, 0.09, 0.18);
    text(item.role, margin, y, 'F2', 8.9);
    text(item.date, pageWidth - margin - 92, y, 'F2', 8.2);
    y -= 10.8;
    for (const b of item.bullets) {
      bullet(b);
    }
    y -= 1.5;
  }

  // Projects
  sectionHeader('Selected Projects');

  const projects = [
    {
      name: 'CompanyQ  (HTML5, CSS3, ES6+ JavaScript, Node.js Test Suite)  [chinmayykashyap-git.github.io/CompanyQ]',
      desc: 'Browser-based interview preparation platform covering 132 companies with 100% mock OA coverage, 65 questions across 7 formats, and 11 test suites.',
    },
    {
      name: 'D.O.O.M  (Python 3.11, FastAPI, Scikit-learn, SQLite, React 18, TypeScript, D3, MapLibre)',
      desc: 'Cargo-manifest forensics platform evaluating 12 batch tampering families (1.0000 F1, 87.5% reconstruction coverage) at 82.89 events/s (9.22 ms p50).',
    },
    {
      name: 'FinSight Risk Engine  (Python, Pandas, Scikit-learn, XGBoost, SMOTE, SHAP)  [AWS Builder Center]',
      desc: 'Evaluates 4 classifiers on 6,819 companies x 95 ratios; Random Forest + SMOTE achieves 94% accuracy, 0.950 ROC-AUC, and 77% recall (up from 57%).',
    },
    {
      name: 'Financial Risk Intelligence System  (Python, Pandas, Scikit-learn, Matplotlib)',
      desc: 'End-to-end ML pipeline predicting corporate financial risk from 5 features (revenue, profit margin, debt ratio, current ratio, cash flow) with feature attribution.',
    },
    {
      name: 'Vertex AI Financial Analyst Assistant  (Python, Vertex AI, GCP, LLMs, RAG)',
      desc: 'LLM assistant with ingestion, embedding, and retrieval-augmented inference pipelines providing grounded answers to financial queries.',
    },
    {
      name: 'GKE CI/CD Automation Pipeline  (Cloud Build, GKE, Kubernetes, Cloud Deploy, Artifact Registry)',
      desc: 'Automated pipeline that builds, tests, containerizes, and deploys microservices to GKE with zero-downtime rolling updates.',
    },
  ];

  for (const p of projects) {
    setColor(0.06, 0.09, 0.18);
    text(p.name, margin, y, 'F2', 8.6);
    y -= 10.2;
    bullet(p.desc);
  }

  // Research, Patent & Publications
  sectionHeader('Research & Intellectual Property');
  bullet('Patent (Filed / Pending): Method for risk assessment and transaction system optimization in financial systems.');
  bullet('Research Paper (Under review): "Financial Risk Modeling and Transaction System Design."');
  bullet('AWS Builder Center Article: "FinSight Risk Engine: Predicting Corporate Bankruptcy Before It Happens."');

  // Technical Skills & Credentials
  sectionHeader('Technical Skills & Credentials');
  bullet('ML & AI: Machine Learning, Deep Learning, LLMs, RAG, Generative AI, Prompt Engineering, PyTorch, TensorFlow, Scikit-learn, Hugging Face, Vertex AI, XAI.');
  bullet('Cloud & DevOps: AWS (SageMaker, Bedrock, Lambda), GCP (GKE, Cloud Run, Cloud Build, Document AI, Cloud Deploy, Artifact Registry, IAM), Docker, Kubernetes, CI/CD.');
  bullet('Languages & Tools: Python, Java, C, C++, C#, JavaScript, SQL, Bash  |  REST APIs, ServiceNow, Pandas, NumPy, Matplotlib, Colab, Git, GitHub.');
  bullet('CS & Credentials: DSA, OOP, SDLC, Agile/Scrum, Unit Testing, Code Review  |  Google Cloud Skill Badges, Kaggle Python Coder, GSSoC 2026, Deloitte Simulation, IITB Robotics.');

  return ops.join('\n');
}

function generatePdf() {
  const streamContent = buildResumeContentStream();
  const streamBytes = Buffer.byteLength(streamContent, 'utf8');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamBytes} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += obj;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, pdf, 'utf8');
  console.log(`Generated PDF resume at ${OUT_PATH} (${Buffer.byteLength(pdf, 'utf8')} bytes)`);
}

generatePdf();
