import React, { useEffect } from 'react';
import { PersonalInfo } from '@/Interface/TPersonalInfo';

interface SEOHeadProps {
  profile: PersonalInfo;
}

const SEOHead: React.FC<SEOHeadProps> = ({ profile }) => {
  useEffect(() => {
    const title = `${profile.fullname} - ${profile.position_career || 'Software Developer'} Portfolio`;
    const description =
      profile.background?.substring(0, 160) ||
      `Professional portfolio of ${profile.fullname}, ${profile.position_career || 'Software Developer'}. View projects, experience, and skills.`;
    const siteUrl = window.location.origin;
    const imageUrl = profile.avatar || `${siteUrl}/portcv.png`;

    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', `${profile.fullname}, ${profile.position_career}, portfolio, software developer`);
    updateMetaTag('author', profile.fullname);

    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', imageUrl, true);
    updateMetaTag('og:url', siteUrl, true);
    updateMetaTag('og:site_name', `${profile.fullname} Portfolio`, true);

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', imageUrl);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.fullname,
      jobTitle: profile.position_career || 'Software Developer',
      description: description,
      email: profile.email,
      telephone: profile.phone_number,
      address: profile.address
        ? {
            '@type': 'PostalAddress',
            addressLocality: profile.address,
          }
        : undefined,
      alumniOf: profile.university_name
        ? {
            '@type': 'EducationalOrganization',
            name: profile.university_name,
          }
        : undefined,
      url: siteUrl,
      image: imageUrl,
      sameAs: [
        profile.github,
        profile.linkedin_url,
        profile.facebook_url,
      ].filter(Boolean),
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [profile]);

  return null;
};

export default SEOHead;

