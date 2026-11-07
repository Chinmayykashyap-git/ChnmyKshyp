import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { PORTFOLIO_DATA } from '@/content/portfolio';

const spaceGrotesk = localFont({
  src: '../../public/fonts/SpaceGrotesk-Variable.woff2',
  weight: '300 700',
  variable: '--font-display',
  display: 'swap',
});

const inter = localFont({
  src: '../../public/fonts/Inter-Variable.woff2',
  weight: '400 700',
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../../public/fonts/JetBrainsMono-Variable.woff2',
  weight: '400 600',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chinmayykashyap-git.github.io'),
  title: 'Chinmay Kashyap',
  description:
    'Chinmay Kashyap: Machine Learning Engineer and Cloud & Backend Software Engineer (AWS & GCP). Software Engineering Intern at ServiceNow, Manipal University Jaipur.',
  keywords: [
    'Chinmay Kashyap',
    'Machine Learning Engineer',
    'Cloud Software Engineer',
    'ServiceNow Intern',
    'AWS Bedrock SageMaker',
    'Google Cloud GKE Document AI',
    'FinSight Risk Engine',
    'CompanyQ',
    'D.O.O.M',
    'Manipal University Jaipur',
  ],
  authors: [{ name: 'Chinmay Kashyap', url: 'https://github.com/Chinmayykashyap-git' }],
  openGraph: {
    title: 'Chinmay Kashyap',
    description:
      'Machine Learning Engineer and Cloud & Backend Software Engineer (AWS & GCP). Software Engineering Intern at ServiceNow.',
    url: 'https://chinmayykashyap-git.github.io',
    siteName: 'Chinmay Kashyap',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Chinmay Kashyap',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmay Kashyap',
    description:
      'Machine Learning Engineer and Cloud & Backend Software Engineer (AWS & GCP).',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PORTFOLIO_DATA.personal.name,
    jobTitle: PORTFOLIO_DATA.personal.roleTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressCountry: 'India',
    },
    email: `mailto:${PORTFOLIO_DATA.personal.email}`,
    url: 'https://chinmayykashyap-git.github.io',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PORTFOLIO_DATA.personal.university,
    },
    worksFor: {
      '@type': 'Organization',
      name: 'ServiceNow',
    },
    sameAs: [
      PORTFOLIO_DATA.personal.links.github,
      PORTFOLIO_DATA.personal.links.linkedin,
      PORTFOLIO_DATA.personal.links.leetcode,
      PORTFOLIO_DATA.personal.links.hackerrank,
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
