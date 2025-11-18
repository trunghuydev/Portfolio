import React from 'react';
import { PersonalInfo } from '@/Interface/TPersonalInfo';

interface SEOProps {
  profile: PersonalInfo;
}

const SEO: React.FC<SEOProps> = ({ profile }) => {
  const title = `${profile.fullname} - ${profile.position_career || 'Software Developer'} Portfolio`;
  const description =
    profile.background?.substring(0, 160) ||
    `Professional portfolio of ${profile.fullname}, ${profile.position_career || 'Software Developer'}. View projects, experience, and skills.`;
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const imageUrl = profile.avatar || `${siteUrl}/portcv.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullname,
    jobTitle: profile.position_career || 'Software Developer',
    description: description,
    email: profile.email,
    telephone: profile.phone_number,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.address,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: profile.university_name,
    },
    url: siteUrl,
    image: imageUrl,
    sameAs: [
      profile.github,
      profile.linkedin_url,
      profile.facebook_url,
    ].filter(Boolean),
  };

  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={`${profile.fullname}, ${profile.position_career}, portfolio, software developer, web developer`} />
      <meta name="author" content={profile.fullname} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={`${profile.fullname} Portfolio`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default SEO;

