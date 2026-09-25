import React, { useEffect } from 'react';
import { business } from '../../data/business';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: string;
  image?: string;
  jsonLd?: object | object[];
}

export const SEO: React.FC<SEOProps> = ({
  title = "Miss Cakist | Homemade Cakes & Bakery in Muzaffarpur",
  description = "Order homemade cakes and bakery treats from Miss Cakist in Muzaffarpur, Bihar. Explore cakes for birthdays, celebrations and special moments.",
  canonicalPath = "/",
  type = "website",
  image = "/images/miss-cakist-og.webp",
  jsonLd,
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://misscakist.vercel.app');
  const fullCanonicalUrl = `${siteUrl.replace(/\/$/, '')}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Update Open Graph Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': type,
      'og:url': fullCanonicalUrl,
      'og:image': fullImageUrl,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // 5. Default JSON-LD for LocalBusiness Bakery if no custom provided
    const defaultLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      "name": business.name,
      "image": fullImageUrl,
      "telephone": business.phone,
      "url": siteUrl,
      "priceRange": business.priceRange,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Anandpuri Bibiganj Road, Near Naunihal International School",
        "addressLocality": "Muzaffarpur",
        "addressRegion": "Bihar",
        "postalCode": "842001",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviewCount
      }
    };

    const finalSchemas = jsonLd ? (Array.isArray(jsonLd) ? [defaultLocalBusinessSchema, ...jsonLd] : [defaultLocalBusinessSchema, jsonLd]) : [defaultLocalBusinessSchema];

    // Remove existing dynamic script
    const existingScript = document.getElementById('dynamic-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'dynamic-json-ld';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(finalSchemas);
    document.head.appendChild(script);

  }, [title, description, fullCanonicalUrl, fullImageUrl, type, jsonLd, siteUrl]);

  return null;
};
