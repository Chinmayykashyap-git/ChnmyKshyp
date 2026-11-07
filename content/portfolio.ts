export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  monogram: string;
  period: string;
  location: string;
  entryType:
    | 'Internship'
    | 'Open Source Contribution'
    | 'Cloud Training'
    | 'Cloud Facilitation'
    | 'Developer Community'
    | 'Training Program';
  current?: boolean;
  badgeText?: string;
  summary: string;
  metadata?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
  highlights: string[];
  stack: string[];
  accentColor: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  projectType: 'Product' | 'Systems Engineering' | 'Applied ML' | 'Research Prototype' | 'Cloud Infrastructure';
  tier: 'primary' | 'secondary';
  problemStatement: string;
  description: string;
  impactStatement: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  architectureSteps?: string[];
  hasCaseStudy?: boolean;
}

export interface SkillGroup {
  id: string;
  category: string;
  code: string;
  description: string;
  items: {
    name: string;
    context: string;
    highlight?: boolean;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
  detail: string;
}

export const PORTFOLIO_DATA = {
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Selected Work', href: '#work' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Research & IP', href: '#research' },
    { label: 'Skills', href: '#skills' },
    { label: 'Live Stats', href: '#telemetry' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ],

  personal: {
    name: 'Chinmay Kashyap',
    shortName: 'CK',
    conceptTagline: 'INTELLIGENCE, ENGINEERED.',
    roleTitle: 'Machine Learning Engineer · Cloud & Backend Software Engineer (AWS & GCP)',
    location: 'Jaipur, India',
    university: 'Manipal University Jaipur',
    degree: 'B.Tech in Computer & Communication Engineering',
    graduationWindow: 'August 2024 – July 2028',
    availability:
      'Seeking software engineering, machine learning, and cloud engineering internships, with a long-term goal of working internationally',
    heroHeadline: 'Intelligence, engineered to work.',
    heroSubheadline:
      'Machine Learning Engineer and Cloud & Backend Software Engineer working across AWS and GCP. I build explainable financial risk models, retrieval-augmented LLM pipelines, and automated enterprise workflows.',
    resumeUrl: '/Chinmay_Kashyap_Resume.pdf',
    email: 'wrkchinmay@gmail.com',
    links: {
      github: 'https://github.com/Chinmayykashyap-git',
      linkedin: 'https://www.linkedin.com/in/chinmay-kashyap-216108307/',
      leetcode: 'https://leetcode.com/u/chinmayykashyap/',
      hackerrank: 'https://www.hackerrank.com/profile/wrkchinmay',
      awsArticle:
        'https://builder.aws.com/content/3JaJZVcbQwoIAtnaVW7Ao3NN8RS/finsight-risk-engine-predicting-corporate-bankruptcy-before-it-happens',
    },
  },

  heroCards: [
    {
      id: 'risk-accuracy',
      label: 'REPORTED CLASSIFIER ACCURACY',
      value: '~94%',
      detail: 'Corporate financial risk & bankruptcy modeling with feature attribution',
    },
    {
      id: 'servicenow-role',
      label: 'ENTERPRISE INTERNSHIP',
      value: 'ServiceNow',
      detail: 'Software Engineering Intern (Apr – Aug 2026) · JavaScript & REST APIs',
    },
    {
      id: 'patent-status',
      label: 'INTELLECTUAL PROPERTY',
      value: 'Patent Filed',
      detail: 'Filed / Pending · Research paper under review',
    },
  ],

  proofStrip: [
    {
      label: 'AWS',
      sublabel: 'Bedrock · SageMaker · Lambda',
      icon: 'cloud',
    },
    {
      label: 'GCP',
      sublabel: 'GKE · Cloud Build · Document AI',
      icon: 'layers',
    },
    {
      label: 'RAG / LLMs',
      sublabel: 'Vertex AI · Grounded Retrieval',
      icon: 'cpu',
    },
    {
      label: 'Patent filed',
      sublabel: 'Financial Risk & Transactions',
      icon: 'shield',
    },
    {
      label: 'GSSoC 2026',
      sublabel: 'Open-Source Contributor',
      icon: 'git-branch',
    },
  ],

  about: {
    eyebrow: '01 / ABOUT',
    headline: 'A model is only useful when an engineer can explain its failure modes and run it reliably.',
    paragraphs: [
      'I study Computer and Communication Engineering at Manipal University Jaipur (2024–2028). My work focuses on three areas: supervised machine learning for financial risk, retrieval-augmented LLM systems, and cloud deployment on AWS and Google Cloud.',
      'As a Software Engineering Intern at ServiceNow (Apr – Aug 2026), I automated internal workflows and IT service management tasks using JavaScript and REST APIs. I also trained with AWS on Bedrock and SageMaker inference pipelines, deployed Document AI and GKE continuous delivery pipelines as a Google Cloud Facilitator, and contribute unit tests and plugin integrations to the Kestra open-source orchestration platform.',
      'In machine learning, I care as much about calibration, class imbalance, and post-hoc explainability as raw accuracy. That focus led to a filed patent application on financial risk assessment and transaction routing, along with a research manuscript currently under peer review.',
    ],
    quickFacts: [
      { label: 'Location', value: 'Jaipur, India' },
      { label: 'Education', value: 'B.Tech CCE, Manipal University Jaipur (August 2024 – July 2028)' },
      { label: 'Enterprise Internship', value: 'Software Engineering Intern at ServiceNow (Apr – Aug 2026)' },
      { label: 'Open Source', value: 'Kestra (#19963 & plugin-looker PR #2) · GSSoC 2026' },
      { label: 'Research & IP', value: '1 Patent (Filed / Pending) · 1 Paper (Under review)' },
      {
        label: 'Career Objective',
        value: 'Seeking SWE, ML & Cloud internships · Long-term goal of working internationally',
      },
    ],
  },

  experience: [
    {
      id: 'servicenow',
      role: 'Software Engineering Intern',
      organization: 'ServiceNow',
      monogram: 'SN',
      period: 'Apr 2026 – Aug 2026',
      location: 'Enterprise Platform · Remote',
      entryType: 'Internship',
      badgeText: 'Cohort 3 · Week 1 Achievement Badge',
      summary:
        'Automated enterprise workflows and IT service management tasks with JavaScript and REST APIs inside the software development lifecycle.',
      highlights: [
        'Selected from a competitive national cohort (Cohort 3) to build and automate digital workflows on the ServiceNow platform.',
        'Developed automated workflow scripts using JavaScript and REST APIs inside the enterprise SDLC, reducing manual operational steps.',
        'Earned first platform achievement badge during Week 1 of the internship and collaborated with peers on ITSM system design.',
      ],
      stack: ['JavaScript', 'REST APIs', 'ServiceNow', 'Workflow Automation', 'ITSM', 'SDLC', 'Git'],
      accentColor: '#62D84E',
    },
    {
      id: 'kestra',
      role: 'Open Source Contributor',
      organization: 'Kestra',
      monogram: 'KS',
      period: '2026 – Present',
      location: 'Open-Source Workflow Orchestration',
      entryType: 'Open Source Contribution',
      current: true,
      badgeText: 'Issue #19963 · plugin-looker PR #2',
      summary:
        'Contributed unit tests to the Kestra core orchestration repository and built tasks, triggers, WireMock tests, documentation, and icons for the Kestra Looker plugin.',
      metadata: [
        {
          label: 'Core Fork & Branch',
          value: 'Chinmayykashyap-git/kestra · fix/19963-timezones-tests',
        },
        {
          label: 'Core Commit & Version',
          value: '9c2dc0ab3 · 2.1.0-SNAPSHOT (Issue #19963)',
        },
        {
          label: 'Plugin Namespace',
          value: 'io.kestra.plugin.looker (Issue #1 / PR #2)',
        },
        {
          label: 'Test Validation',
          value: './gradlew test — 32 tests passed',
        },
      ],
      links: [
        {
          label: 'Kestra Issue #19963',
          url: 'https://github.com/kestra-io/kestra/issues/19963',
        },
        {
          label: 'Branch: fix/19963-timezones-tests',
          url: 'https://github.com/Chinmayykashyap-git/kestra/tree/fix/19963-timezones-tests',
        },
        {
          label: 'Commit 9c2dc0ab3',
          url: 'https://github.com/Chinmayykashyap-git/kestra/commit/9c2dc0ab3',
        },
        {
          label: 'Fork: Chinmayykashyap-git/plugin-looker',
          url: 'https://github.com/Chinmayykashyap-git/plugin-looker',
        },
      ],
      highlights: [
        'Kestra Core (Issue #19963, branch fix/19963-timezones-tests, commit 9c2dc0ab3 on fork Chinmayykashyap-git/kestra, v2.1.0-SNAPSHOT): Added unit tests for the timeZones utility covering Intl.supportedValuesOf("timeZone") behavior, fallback when the API is unavailable, fallback when an empty array is returned, and verification that the timeZone key is requested accurately.',
        'Kestra Looker Plugin (io.kestra.plugin.looker, Issue #1 / PR #2): Implemented tasks and triggers, WireMock integration tests, plugin documentation, and icons.',
        'Validated the plugin-looker test suite via ./gradlew test with 32 tests passing.',
      ],
      stack: [
        'Java',
        'Gradle',
        'WireMock',
        'io.kestra.plugin.looker',
        'JavaScript / TypeScript',
        'Unit Testing',
        'Git / GitHub',
      ],
      accentColor: '#A855F7',
    },
    {
      id: 'aws',
      role: 'AI & Cloud Computing Trainee',
      organization: 'Amazon Web Services',
      monogram: 'AWS',
      period: 'Jan 2026 – Feb 2026',
      location: 'Cloud & Generative AI · Remote',
      entryType: 'Cloud Training',
      badgeText: 'AWS Builder Center Author',
      summary:
        'Built generative AI applications with Amazon Bedrock, SageMaker, and Lambda, and designed autoscaled ML inference pipelines.',
      highlights: [
        'Built generative AI applications using Amazon Bedrock, Amazon SageMaker, and AWS Lambda through AWS Workshop Studio labs, covering end-to-end model invocation and serverless deployment.',
        'Configured ML inference pipelines with autoscaling policies and compute cost controls.',
        'Published technical documentation on the AWS Builder Center detailing corporate bankruptcy prediction with FinSight Risk Engine.',
      ],
      stack: ['AWS Bedrock', 'Amazon SageMaker', 'AWS Lambda', 'AWS Workshop Studio', 'Python', 'ML Pipelines', 'Cost Optimization'],
      accentColor: '#FF9900',
    },
    {
      id: 'gcp',
      role: 'Cloud Facilitator',
      organization: 'Google Cloud Community India',
      monogram: 'GCP',
      period: 'Dec 2025 – Jan 2026',
      location: 'Google Cloud Platform',
      entryType: 'Cloud Facilitation',
      badgeText: 'GKE & CI/CD Skill Badges',
      summary:
        'Built a Document AI processing pipeline on GCP and automated container delivery to Google Kubernetes Engine and Cloud Run.',
      highlights: [
        'Built a Document AI extraction pipeline on Google Cloud Platform (9D9P-01) with scoped IAM roles, service accounts, and API configuration.',
        'Implemented CI/CD pipelines (9D9P-02) using Cloud Build, Artifact Registry, and Cloud Deploy across Cloud Run and GKE.',
        'Deployed, monitored, and debugged containerized workloads on Google Kubernetes Engine (GKE, 9D9P-03) clusters using kubectl, earning Google Cloud skill badges in Intermediate Kubernetes (GKE) and CI/CD.',
      ],
      stack: ['GCP', 'Document AI', 'GKE', 'Cloud Build', 'Artifact Registry', 'Cloud Deploy', 'Cloud Run', 'Kubernetes', 'kubectl', 'Docker'],
      accentColor: '#4285F4',
    },
    {
      id: 'gdg-muj',
      role: 'Core Member',
      organization: 'Google Developer Groups (GDG) — Manipal University Jaipur',
      monogram: 'GDG',
      period: 'Nov 2024 – Sep 2026',
      location: 'Manipal University Jaipur',
      entryType: 'Developer Community',
      badgeText: 'Campus Developer Community',
      summary:
        'Contributed to cloud and machine learning workshops, study jams, and technical peer learning initiatives at Manipal University Jaipur.',
      highlights: [
        'Participated in organizing developer events, Google Cloud study jams, and technical sessions for undergraduate engineering students.',
        'Supported hands-on cloud and machine learning lab sessions on campus.',
      ],
      stack: ['Google Cloud', 'Technical Workshops', 'Developer Community', 'Machine Learning'],
      accentColor: '#34A853',
    },
    {
      id: 'mckinsey',
      role: 'Forward Program Trainee',
      organization: 'McKinsey & Company',
      monogram: 'McK',
      period: 'May 2025 – Jul 2025',
      location: 'Problem Solving & Strategy',
      entryType: 'Training Program',
      badgeText: 'Forward Program',
      summary:
        'Applied structured problem-solving and analytical frameworks to technology and business case studies.',
      highlights: [
        'Used issue trees and hypothesis-driven analysis to break down technology and operations case studies.',
        'Communicated quantitative trade-offs and implementation plans in structured written briefs.',
      ],
      stack: ['Structured Problem Solving', 'Case Analysis', 'Quantitative Synthesis', 'Technical Communication'],
      accentColor: '#7D9DFF',
    },
  ] satisfies ExperienceItem[],

  projects: [
    {
      id: 'companyq',
      number: '01',
      title: 'CompanyQ',
      projectType: 'Product',
      tier: 'primary',
      problemStatement:
        'Software engineering candidates usually practice from generic problem lists without knowing the specific online assessment duration, question format, or hiring stages used by target employers.',
      description:
        'CompanyQ is a static recruitment intelligence database and timed online assessment simulator covering 132 technology employers. Built in standard HTML5, CSS3, and vanilla ES6+ JavaScript with zero runtime dependencies, it provides 132 company-specific mock assessments, 65 original questions across 7 formats (algorithms, SQL window functions, asymptotic complexity, fintech ledgers, SaaS systems, and core CS), an in-browser JavaScript test runner, and weak-topic practice drills.',
      impactStatement:
        '132/132 employer mock OA coverage with deterministic grading across 7 question types and 11 automated Node.js verification suites.',
      metrics: [
        { label: 'Employer Coverage', value: '132 / 132 OAs' },
        { label: 'Question Bank', value: '65 (7 Formats)' },
        { label: 'Runtime Dependencies', value: '0 (Vanilla JS)' },
        { label: 'Verification', value: '11 Test Suites' },
      ],
      stack: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'In-Browser JS Runner', 'LocalStorage', 'Python', 'Node.js Tests'],
      githubUrl: 'https://github.com/Chinmayykashyap-git/CompanyQ',
      liveUrl: 'https://chinmayykashyap-git.github.io/CompanyQ/',
      liveLabel: 'Launch Live App',
      architectureSteps: [
        '132-employer dataset classified into Verified (5), Representative (19), and Estimated (108) evidence tiers.',
        'Client-side hash router (#dashboard, #directory, #simulator, #drill, #progress) for static GitHub Pages hosting.',
        'Timed and untimed assessment simulator with in-browser JavaScript code execution and LocalStorage autosave.',
        'Deterministic grader for code, SQL, Big-O recurrences, and multi-select CS questions with weak-topic drill generation.',
      ],
    },
    {
      id: 'doom-forensics',
      number: '02',
      title: 'D.O.O.M',
      projectType: 'Systems Engineering',
      tier: 'primary',
      problemStatement:
        'When maritime cargo manifests are tampered with in batch or in transit, operators need to detect anomalies and reconstruct corrupted fields without leaking evaluation labels into the detector.',
      description:
        'Detection, Observation & Operational Manifest Reconstruction (D.O.O.M) is a local-first cargo-manifest forensics platform. It generates seeded shipping manifests and synthetic customs/port witnesses, detects 12 batch tampering families plus 3 isolated open-set holdout attacks across a strict forensic trust boundary, assigns explicit ORIGINAL, REPAIRED, REMOVED, or UNRECOVERABLE dispositions, and streams live incidents over WebSockets to a React, TypeScript, D3, and MapLibre console.',
      impactStatement:
        '1.0000 precision, recall, and F1 across 5 synthetic evaluation seeds (1,200 records/seed), 87.5% field reconstruction coverage at 100% accuracy, and 9.22 ms p50 streaming latency.',
      metrics: [
        { label: 'Batch Tampering Suite', value: '12 Known + 3 Holdout' },
        { label: 'Field Repair Coverage', value: '87.5% (100% Acc)' },
        { label: 'Stream Latency (p50)', value: '9.22 ms' },
        { label: 'Stream Throughput', value: '82.89 events/s' },
      ],
      stack: [
        'Python 3.11',
        'FastAPI',
        'Scikit-learn',
        'SQLite',
        'React 18',
        'TypeScript',
        'D3.js',
        'MapLibre GL',
        'Pytest',
        'Vitest',
      ],
      githubUrl: 'https://github.com/Chinmayykashyap-git/D.O.O.M',
      liveUrl: 'https://doom-taupe.vercel.app',
      liveLabel: 'Open Live Console',
      architectureSteps: [
        'Separate SQLite databases enforce a strict boundary between operator evidence and the evaluator injection oracle.',
        'Nine detector modules evaluate integrity hashes, control ledgers, route geometry, temporal shifts, and schema novelty.',
        'Reconstruction engine repairs tampered fields only when independent witness records corroborate the expected value.',
        'FastAPI backend streams live mutation alerts over WebSockets to a virtualized React and TypeScript operations UI.',
      ],
    },
    {
      id: 'finsight-risk-engine',
      number: '03',
      title: 'FinSight Risk Engine',
      projectType: 'Applied ML',
      tier: 'primary',
      problemStatement:
        'Corporate bankruptcy datasets are heavily imbalanced (only 3.23% bankrupt firms in the Taiwan Economic Journal dataset), causing standard classifiers to miss distressed companies despite high overall accuracy.',
      description:
        'FinSight Risk Engine is a corporate bankruptcy prediction and risk-scoring pipeline trained on 6,819 companies and 95 accounting ratios from the Taiwan Economic Journal dataset. It compares Logistic Regression, Random Forest, and XGBoost models, applies SMOTE oversampling to address minority-class imbalance, uses SHAP TreeExplainer waterfall plots to attribute individual predictions, and assigns calibrated Low (<30%), Medium (30–60%), and High (>60%) risk tiers.',
      impactStatement:
        'Improved minority-class bankruptcy recall from 57% to 77% on the 1,364-company test set using Random Forest + SMOTE while maintaining 94% accuracy and 0.950 ROC-AUC.',
      metrics: [
        { label: 'Dataset Scale', value: '6,819 Firms × 95 Ratios' },
        { label: 'RF + SMOTE ROC-AUC', value: '0.950 (0.944 Base)' },
        { label: 'Bankruptcy Recall Lift', value: '57% → 77%' },
        { label: 'Overall Test Accuracy', value: '94% (n = 1,364)' },
      ],
      stack: ['Python', 'Scikit-learn', 'Random Forest', 'XGBoost', 'SMOTE', 'SHAP', 'Pandas', 'NumPy', 'Joblib'],
      githubUrl: 'https://github.com/Chinmayykashyap-git/FinSight-Risk-Engine',
      liveUrl:
        'https://builder.aws.com/content/3JaJZVcbQwoIAtnaVW7Ao3NN8RS/finsight-risk-engine-predicting-corporate-bankruptcy-before-it-happens',
      liveLabel: 'Read AWS Builder Article',
      architectureSteps: [
        'Exploratory analysis and Pearson correlation ranking across 95 financial ratios for 6,819 companies (220 bankrupt, 6,599 solvent).',
        'Stratified 80/20 train/test split (5,455 train / 1,364 test) with SMOTE applied strictly to training folds.',
        'Model evaluation across Logistic Regression (0.917 AUC), Random Forest (0.944 AUC), XGBoost (0.961 AUC), and RF + SMOTE (0.950 AUC).',
        'SHAP TreeExplainer waterfall attribution and probability thresholding into Low, Medium, and High corporate risk categories.',
      ],
    },
    {
      id: 'financial-risk-intelligence',
      number: '04',
      title: 'Financial Risk Intelligence System',
      projectType: 'Research Prototype',
      tier: 'secondary',
      hasCaseStudy: true,
      problemStatement:
        'Rule-based credit checks and black-box models need a reproducible synthetic testbed to verify that tree ensembles recover underlying leverage and margin thresholds with human-readable explanations.',
      description:
        'A synthetic corporate risk classification pipeline in Python and Scikit-learn that evaluates five core indicators (Revenue, Profit Margin, Debt Ratio, Current Ratio, and Cash Flow) across 10,000 generated company profiles. Trains a 200-tree Random Forest classifier, extracts Gini feature importances, and formats natural-language risk summaries (`explain_company()`). Forms the algorithmic prototype behind my filed patent application.',
      impactStatement:
        'Recovers multi-tier risk rules across a 2,000-company holdout split and pairs with the empirical ~94% accuracy benchmark in the flagship case study below.',
      metrics: [
        { label: 'Synthetic Cohort', value: '10,000 Firms' },
        { label: 'Core Ratios', value: '5 Indicators' },
        { label: 'Model', value: '200-Tree RF' },
        { label: 'Role', value: 'Patent Prototype' },
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'Matplotlib'],
      githubUrl: 'https://github.com/Chinmayykashyap-git/financial-risk-intelligence-system',
    },
    {
      id: 'vertex-ai-financial-assistant',
      number: '05',
      title: 'Vertex AI Financial Analyst Assistant',
      projectType: 'Applied ML',
      tier: 'secondary',
      problemStatement:
        'General-purpose LLMs hallucinate financial figures when answering domain-specific questions without grounded document retrieval.',
      description:
        'A retrieval-augmented generation (RAG) assistant built on Google Cloud Vertex AI. Implements document ingestion, chunking, vector embedding generation, and context-grounded prompt assembly so responses cite retrieved financial documents.',
      impactStatement:
        'Delivers grounded answers to domain-specific financial queries through a modular ingestion, embedding, and inference pipeline on GCP.',
      metrics: [
        { label: 'Pattern', value: 'Ingestion → Embedding → RAG' },
        { label: 'Platform', value: 'GCP Vertex AI' },
        { label: 'Focus', value: 'Grounded Financial Q&A' },
      ],
      stack: ['Python', 'Vertex AI', 'Google Cloud (GCP)', 'LLMs', 'RAG', 'Vector Embeddings'],
    },
    {
      id: 'gke-cicd-pipeline',
      number: '06',
      title: 'GKE CI/CD Automation Pipeline',
      projectType: 'Cloud Infrastructure',
      tier: 'secondary',
      problemStatement:
        'Manual container builds and cluster updates introduce deployment drift and service downtime during microservice releases.',
      description:
        'An automated build and deployment pipeline on Google Cloud Platform using Cloud Build, Artifact Registry, Cloud Deploy, and Google Kubernetes Engine (GKE). Packages microservices into immutable Docker images, runs automated checks, and executes rolling Kubernetes updates.',
      impactStatement:
        'Automates container build, registry storage, and zero-downtime rolling updates on GKE clusters.',
      metrics: [
        { label: 'CI/CD', value: 'Cloud Build + Deploy' },
        { label: 'Registry', value: 'Artifact Registry' },
        { label: 'Runtime', value: 'GKE Kubernetes' },
      ],
      stack: ['GKE', 'Kubernetes', 'Cloud Build', 'Cloud Deploy', 'Artifact Registry', 'Docker', 'CI/CD'],
    },
  ] satisfies ProjectItem[],

  caseStudy: {
    eyebrow: 'FLAGSHIP TECHNICAL CASE STUDY',
    title: 'Financial Risk Intelligence & Distress Modeling',
    subtitle:
      'A complete walkthrough from synthetic rule recovery (5 core financial ratios) to empirical bankruptcy prediction (6,819 companies, 95 indicators), class-imbalance correction, and SHAP explainability.',
    stages: [
      {
        step: '01',
        name: 'Problem',
        title: 'Why credit risk models fail in practice',
        summary:
          'Financial risk systems face two failure modes. First, manual statement analysis does not scale across thousands of counterparties. Second, black-box classifiers optimize for raw accuracy on imbalanced datasets and cannot explain which financial ratio triggered a high-risk flag.',
      },
      {
        step: '02',
        name: 'Data',
        title: 'Two-stage dataset design: synthetic verification + real-world empirical data',
        summary:
          'Stage A (`financial-risk-intelligence-system`) generates a seeded 10,000-company dataset (`np.random.seed(42)`) across 5 core ratios (`Revenue`, `ProfitMargin`, `DebtRatio`, `CurrentRatio`, `CashFlow`) to verify threshold recovery. Stage B (`FinSight-Risk-Engine`) evaluates the Taiwan Economic Journal dataset containing 6,819 real companies and 95 accounting indicators with zero missing values (`6,599` non-bankrupt vs `220` bankrupt firms, a 3.23% positive rate).',
      },
      {
        step: '03',
        name: 'Feature Engineering',
        title: 'Leverage, liquidity, and profitability signals',
        summary:
          'In the 5-feature pipeline, risk tiers are governed by interaction thresholds (`DebtRatio > 1.3` with `ProfitMargin < 5%` for High Risk; `DebtRatio > 0.8` for Medium Risk; otherwise Low Risk) encoded via `LabelEncoder`. In the 95-feature empirical dataset, Pearson correlation analysis against `Bankrupt?` identifies the strongest positive distress drivers: `Debt ratio %` (`r = +0.250`), `Current Liability to Assets` (`r = +0.194`), `Borrowing dependency` (`r = +0.177`), and `Liability to Equity` (`r = +0.167`).',
      },
      {
        step: '04',
        name: 'Model',
        title: 'Tree ensembles and SMOTE minority oversampling',
        summary:
          'The 5-feature pipeline trains a 200-tree Random Forest (`RandomForestClassifier(n_estimators=200, random_state=42)`) on an 80/20 split (`8,000` train / `2,000` test). The 95-feature pipeline uses a stratified 80/20 split (`5,455` train / `1,364` test with `44` bankruptcies) and compares Logistic Regression, a 300-tree Random Forest (`max_depth=10`), a 300-tree XGBoost classifier (`max_depth=6, lr=0.05`), and Random Forest trained with SMOTE (`Synthetic Minority Oversampling Technique`) on the training fold.',
      },
      {
        step: '05',
        name: 'Explainability',
        title: 'Gini importance and SHAP TreeExplainer attributions',
        summary:
          'Global feature behavior is inspected via `model.feature_importances_` (mean decrease in Gini impurity across trees). Local, per-company explanations are generated in two ways: rule-aligned natural-language summaries (`explain_company()`) and exact `shap.TreeExplainer` waterfall plots over the `(1, 95, 2)` SHAP tensor, showing how each ratio pushes a firm’s predicted default probability above or below the base rate.',
      },
      {
        step: '06',
        name: 'Evaluation',
        title: 'Why accuracy alone is misleading on imbalanced financial data',
        summary:
          'Because 96.77% of companies in the empirical dataset are solvent (`6,599 / 6,819`), a trivial model that predicts "non-bankrupt" for every company achieves 96.77% accuracy while catching 0% of bankruptcies. For example, uncalibrated XGBoost achieved 97% accuracy and 0.961 ROC-AUC, but its bankruptcy recall was only 34% (`15 / 44` defaults caught). Applying SMOTE to Random Forest traded 2 percentage points of overall accuracy (`96% → 94%`) to increase minority-class bankruptcy recall from 57% to 77% (`34 / 44` caught) with a 0.950 ROC-AUC.',
      },
      {
        step: '07',
        name: 'Result',
        title: 'Calibrated risk tiers and patent-pending transaction routing',
        summary:
          'Predicted probabilities are mapped into actionable risk bands (`< 30%` Low Risk, `30–60%` Medium Risk, `> 60%` High Risk) and serialized with `joblib`. This interpretable risk score serves as the input signal for my filed patent application on risk-adaptive transaction verification and routing.',
      },
    ],
    evaluationTable: [
      {
        model: 'Logistic Regression (Balanced)',
        accuracy: '88.0%',
        rocAuc: '0.917',
        bankruptcyPrecision: '0.19',
        bankruptcyRecall: '82.0% (36/44)',
        bankruptcyF1: '0.30',
        note: 'High recall but 158 false positives on 1,364 test firms.',
      },
      {
        model: 'XGBoost (300 trees, depth 6)',
        accuracy: '97.0%',
        rocAuc: '0.961',
        bankruptcyPrecision: '0.65',
        bankruptcyRecall: '34.0% (15/44)',
        bankruptcyF1: '0.45',
        note: 'Highest raw accuracy, but misses 66% of actual bankruptcies.',
      },
      {
        model: 'Random Forest (300 trees, balanced)',
        accuracy: '96.0%',
        rocAuc: '0.944',
        bankruptcyPrecision: '0.41',
        bankruptcyRecall: '57.0% (25/44)',
        bankruptcyF1: '0.48',
        note: 'Balanced baseline before synthetic minority oversampling.',
      },
      {
        model: 'Random Forest + SMOTE (Selected)',
        accuracy: '94.0%',
        rocAuc: '0.950',
        bankruptcyPrecision: '0.33',
        bankruptcyRecall: '77.0% (34/44)',
        bankruptcyF1: '0.46',
        note: '+20 percentage point recall gain while retaining 94% accuracy.',
      },
    ],
    syntheticReport: {
      testSize: 2000,
      supportLow: 798,
      supportMedium: 991,
      supportHigh: 211,
      accuracy: '100.0% (Synthetic Rule Recovery)',
    },
    featureVisualizationNote:
      'Methodological note: The notebook plots `model.feature_importances_` (mean decrease in Gini impurity across 200 trees) and Pearson correlations (`df.corr()["Bankrupt?"]`). Because the 5-feature synthetic labeling rule is deterministic on `DebtRatio` and `ProfitMargin`, those two features account for the overwhelming share of tree split impurity reduction, while `CurrentRatio`, `CashFlow`, and `Revenue` provide secondary split refinement. In the 95-feature empirical notebook, the exact verified top Pearson correlations with bankruptcy are shown alongside the interactive 5-featuregini importance chart.',
    empiricalCorrelations: [
      { feature: 'Debt ratio %', correlation: 0.2502, direction: 'Positive distress driver' },
      { feature: 'Current Liability to Assets', correlation: 0.1945, direction: 'Positive distress driver' },
      { feature: 'Borrowing dependency', correlation: 0.1765, direction: 'Positive distress driver' },
      { feature: 'Current Liability to Current Assets', correlation: 0.1713, direction: 'Positive distress driver' },
      { feature: 'Liability to Equity', correlation: 0.1668, direction: 'Positive distress driver' },
      { feature: 'Current Liabilities / Equity', correlation: 0.1538, direction: 'Positive distress driver' },
    ],
    illustrativeGiniFeatures: [
      {
        name: 'Debt Ratio',
        key: 'debtRatio',
        share: 54.0,
        thresholdNote: 'Primary split threshold at DebtRatio > 0.80 and > 1.30',
      },
      {
        name: 'Profit Margin',
        key: 'profitMargin',
        share: 34.0,
        thresholdNote: 'Secondary split threshold at ProfitMargin < 5.0% for High Risk',
      },
      {
        name: 'Current Ratio',
        key: 'currentRatio',
        share: 4.5,
        thresholdNote: 'Liquidity ratio (0.2 – 5.0×); leaf-level refinement in synthetic benchmark',
      },
      {
        name: 'Cash Flow',
        key: 'cashFlow',
        share: 4.0,
        thresholdNote: 'Operating cash flow (-$0.5M to $5.0M); leaf-level refinement',
      },
      {
        name: 'Revenue',
        key: 'revenue',
        share: 3.5,
        thresholdNote: 'Enterprise revenue scale ($0.1M to $10.0M); leaf-level refinement',
      },
    ],
  },

  researchAndIp: {
    eyebrow: '04 / RESEARCH & INTELLECTUAL PROPERTY',
    headline: 'Formalizing applied financial ML into intellectual property and peer-reviewed research.',
    lead: 'All status labels below reflect current official filing and review stages.',
    items: [
      {
        id: 'patent',
        type: 'PATENT APPLICATION',
        status: 'Filed / Pending',
        statusTone: 'amber',
        title: 'Method for risk assessment and transaction system optimization in financial systems',
        inventors: 'Chinmay Kashyap',
        domain: 'Financial Risk Assessment · Transaction System Optimization',
        summary:
          'Specifies a method for evaluating corporate and counterparty financial risk from fundamental accounting indicators and using the resulting interpretable risk tier to adjust transaction verification and routing parameters.',
        pillars: [
          'Multi-factor financial risk classification from core leverage, margin, liquidity, and cash-flow indicators',
          'Feature-importance attribution attached to each risk classification output',
          'Risk-conditional transaction system optimization based on predicted counterparty tier',
        ],
      },
      {
        id: 'paper',
        type: 'RESEARCH PAPER',
        status: 'Under review',
        statusTone: 'periwinkle',
        title: 'Financial Risk Modeling and Transaction System Design',
        inventors: 'Chinmay Kashyap',
        domain: 'Machine Learning · Financial Systems',
        summary:
          'Examines ensemble classification, class-imbalance correction via SMOTE, and post-hoc explainability for corporate risk prediction, and outlines how calibrated risk scores integrate into transaction processing systems.',
        pillars: [
          'Evaluation of precision, recall, F1, and ROC-AUC across imbalanced corporate financial datasets',
          'Analysis of recall improvements achieved through synthetic minority oversampling (~94% accuracy, 0.950 ROC-AUC)',
          'System design connecting interpretable risk scoring with transaction execution workflows',
        ],
      },
    ],
    publication: {
      type: 'TECHNICAL PUBLICATION · AWS BUILDER CENTER',
      status: 'Published',
      title: 'FinSight Risk Engine: Predicting Corporate Bankruptcy Before It Happens',
      url: 'https://builder.aws.com/content/3JaJZVcbQwoIAtnaVW7Ao3NN8RS/finsight-risk-engine-predicting-corporate-bankruptcy-before-it-happens',
      summary:
        'Technical article published on AWS Builder Center walking through the 6,819-company bankruptcy dataset, SMOTE class-imbalance handling, and SHAP waterfall explanations.',
    },
  },

  skills: [
    {
      id: 'ml-ai',
      category: 'ML & AI',
      code: '01',
      description: 'Supervised classification, ensemble methods, class-imbalance handling, explainable AI, and RAG pipelines.',
      items: [
        { name: 'Machine Learning', context: 'FinSight Risk Engine & Financial Risk Intelligence System', highlight: true },
        { name: 'Deep Learning', context: 'Neural network training & representation learning' },
        { name: 'LLMs', context: 'AWS Bedrock, Vertex AI & Anthropic Claude workflows', highlight: true },
        { name: 'RAG', context: 'Vertex AI Financial Analyst Assistant', highlight: true },
        { name: 'Generative AI', context: 'AWS AI & Cloud Computing Trainee projects', highlight: true },
        { name: 'Prompt Engineering', context: 'Context-grounded financial query prompts' },
        { name: 'PyTorch', context: 'Deep learning experimentation' },
        { name: 'TensorFlow', context: 'Model prototyping' },
        { name: 'Scikit-learn', context: 'Random Forest, Logistic Regression, calibration & metrics', highlight: true },
        { name: 'Hugging Face', context: 'Transformer models & embeddings' },
        { name: 'Vertex AI', context: 'GCP LLM & embedding pipelines', highlight: true },
        { name: 'Random Forest', context: '200–300 tree ensembles for corporate risk classification', highlight: true },
        { name: 'Feature Engineering', context: '95-ratio accounting & leverage feature analysis', highlight: true },
        { name: 'Explainable AI', context: 'SHAP TreeExplainer waterfall plots & Gini importance', highlight: true },
        { name: 'Model Deployment', context: 'Joblib serialization & cloud inference endpoints' },
        { name: 'ML Pipelines', context: 'End-to-end ingestion, training, evaluation & scoring', highlight: true },
      ],
    },
    {
      id: 'cloud-devops',
      category: 'Cloud & DevOps',
      code: '02',
      description: 'Cloud infrastructure, serverless compute, container registries, and Kubernetes CI/CD across AWS and GCP.',
      items: [
        { name: 'AWS SageMaker', context: 'Managed ML training & autoscaled inference endpoints', highlight: true },
        { name: 'AWS Bedrock', context: 'Foundation model integration on AWS', highlight: true },
        { name: 'AWS Lambda', context: 'Serverless compute for event-driven inference', highlight: true },
        { name: 'GCP GKE', context: 'Kubernetes cluster deployment & rolling updates', highlight: true },
        { name: 'GCP Cloud Run', context: 'Managed container execution' },
        { name: 'GCP Cloud Build', context: 'Automated container build & test pipelines', highlight: true },
        { name: 'GCP Document AI', context: 'Automated document extraction pipeline on GCP', highlight: true },
        { name: 'GCP Cloud Deploy', context: 'Continuous delivery to GKE and Cloud Run', highlight: true },
        { name: 'Artifact Registry', context: 'Container image storage & vulnerability scanning' },
        { name: 'GCP IAM', context: 'Service accounts & least-privilege access control' },
        { name: 'Docker', context: 'Container packaging for microservices', highlight: true },
        { name: 'Kubernetes', context: 'Pod management, kubectl debugging & rolling deploys', highlight: true },
        { name: 'CI/CD', context: 'Automated build, test, and release pipelines', highlight: true },
        { name: 'Kestra', context: 'Open-source contributions (#19963 & io.kestra.plugin.looker PR #2)', highlight: true },
        { name: 'Microservices', context: 'Containerized backend service architecture' },
      ],
    },
    {
      id: 'languages',
      category: 'Programming Languages',
      code: '03',
      description: 'Languages used across machine learning, backend services, enterprise automation, and algorithmic problem solving.',
      items: [
        { name: 'Python', context: 'ML pipelines, FastAPI backend in D.O.O.M & data tooling', highlight: true },
        { name: 'JavaScript', context: 'ServiceNow workflow automation, Kestra #19963 & CompanyQ', highlight: true },
        { name: 'Java', context: 'Kestra plugin-looker, OOP, DSA & HackerRank', highlight: true },
        { name: 'SQL', context: 'Analytical queries, window functions & SQLite forensics', highlight: true },
        { name: 'C++', context: 'Data structures & competitive programming' },
        { name: 'C', context: 'Systems fundamentals & Harvard CS50' },
        { name: 'C#', context: 'Object-oriented application development' },
        { name: 'Bash', context: 'Shell scripting & CI workflow automation' },
      ],
    },
    {
      id: 'tools',
      category: 'Backend, Web & Data Frameworks',
      code: '04',
      description: 'Backend frameworks, frontend libraries, enterprise platforms, data tooling, and version control.',
      items: [
        { name: 'FastAPI', context: 'Async Python backend & WebSocket streaming in D.O.O.M', highlight: true },
        { name: 'Spring Boot', context: 'Java backend services & REST API development', highlight: true },
        { name: 'React', context: 'Interactive operator console in D.O.O.M & Next.js UI', highlight: true },
        { name: 'REST APIs', context: 'ServiceNow integrations, Looker API & FastAPI endpoints', highlight: true },
        { name: 'ServiceNow', context: 'Enterprise workflow & ITSM automation', highlight: true },
        { name: 'Pandas', context: 'Tabular financial data manipulation', highlight: true },
        { name: 'NumPy', context: 'Numerical arrays & synthetic dataset generation' },
        { name: 'Matplotlib', context: 'ROC curves, correlation charts & importance plots' },
        { name: 'Colab', context: 'Notebook execution for ML experiments' },
        { name: 'Git', context: 'Version control & branching workflows', highlight: true },
        { name: 'GitHub', context: 'GitHub Actions, Pages deployment & open-source PRs', highlight: true },
      ],
    },
    {
      id: 'cs-fundamentals',
      category: 'Computer Science Fundamentals',
      code: '05',
      description: 'Core software engineering practices applied in internships, open-source contributions, and testing.',
      items: [
        { name: 'DSA', context: 'Algorithmic problem solving on LeetCode & CompanyQ', highlight: true },
        { name: 'OOP', context: 'Modular class hierarchies in Python & Java' },
        { name: 'SDLC', context: 'Enterprise development lifecycle at ServiceNow', highlight: true },
        { name: 'Agile / Scrum', context: 'Iterative delivery & sprint collaboration' },
        { name: 'Unit Testing', context: 'Kestra #19963, WireMock (32 Gradle tests), Pytest & Vitest', highlight: true },
        { name: 'Code Review', context: 'Pull request reviews & maintainer feedback' },
      ],
    },
  ] satisfies SkillGroup[],

  certifications: [
    {
      id: 'gcp-ml-apis',
      title: 'Google Cloud Skill Badges — GKE, CI/CD & Data for ML APIs',
      issuer: 'Google Cloud',
      category: 'Cloud & ML Badge',
      year: '2026',
      detail: 'Completed hands-on Google Cloud labs covering Document AI (9D9P-01), CI/CD pipelines (9D9P-02), Intermediate Kubernetes on GKE (9D9P-03), and Data for ML APIs.',
    },
    {
      id: 'anthropic-fluency',
      title: 'AI Fluency Framework & Foundations',
      issuer: 'Anthropic',
      category: 'Verified Certificate',
      year: 'Jun 2026',
      credentialId: 'a5at7otmzybm',
      credentialUrl: 'https://verify.skilljar.com/c/a5at7otmzybm',
      detail: 'Completed Anthropic certification on LLM capabilities, evaluation, and practical deployment.',
    },
    {
      id: 'anthropic-claude-101',
      title: 'Claude 101',
      issuer: 'Anthropic',
      category: 'Verified Certificate',
      year: 'Jun 2026',
      credentialId: 'et59sj9f6hf4',
      credentialUrl: 'https://verify.skilljar.com/c/et59sj9f6hf4',
      detail: 'Completed Anthropic training on prompt design and building workflows with Claude.',
    },
    {
      id: 'kestra-gssoc-2026',
      title: 'Kestra Open Source & GSSoC 2026 Contributor',
      issuer: 'Kestra / GirlScript Summer of Code',
      category: 'Open Source',
      year: '2026',
      detail: 'Contributed unit tests to Kestra core (#19963) and Looker plugin tasks, triggers, and WireMock tests (io.kestra.plugin.looker PR #2); GSSoC 2026 participant.',
    },
    {
      id: 'harvard-cs50',
      title: 'CS50: Introduction to Computer Science',
      issuer: 'Harvard University',
      category: 'Computer Science Course',
      year: '2025',
      detail: 'Coursework in C, memory management, data structures, algorithms, Python, SQL, and web development.',
    },
    {
      id: 'kaggle-python',
      title: 'Kaggle Python Coder Badge',
      issuer: 'Kaggle',
      category: 'Programming Credential',
      year: '2025',
      detail: 'Earned for Python programming and data manipulation exercises on Kaggle.',
    },
    {
      id: 'deloitte-sim',
      title: 'Deloitte Australia Job Simulation',
      issuer: 'Deloitte Australia (Forage)',
      category: 'Industry Simulation',
      year: '2025',
      detail: 'Completed practical engineering and data analysis tasks modeled on Deloitte technology engagements.',
    },
    {
      id: 'iitb-robotics',
      title: 'IIT Bombay Robotics Workshop',
      issuer: 'IIT Bombay',
      category: 'Engineering Workshop',
      year: '2024',
      detail: 'Hands-on workshop covering embedded hardware control, sensors, and robotics fundamentals.',
    },
    {
      id: 'model-un',
      title: 'Model UN',
      issuer: 'Collegiate Conference',
      category: 'Public Speaking & Policy',
      year: '2024',
      detail: 'Researched policy positions, debated resolutions, and drafted committee working papers.',
    },
    {
      id: 'community-volunteering',
      title: 'Student Volunteer — Indian Red Cross & Blind Welfare Society',
      issuer: 'IRCS New Delhi & Blind Welfare Society',
      category: 'Community Service',
      year: '2016 – Present',
      detail: '9 years as Student Volunteer with Indian Red Cross Society (2016–2024) and 7+ years supporting fundraising and aid with the Blind Welfare Society (2019–Present).',
    },
  ] satisfies CertificationItem[],
} as const;
