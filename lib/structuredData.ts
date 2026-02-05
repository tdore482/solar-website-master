import { companyInfo, contactInfo, socialLinks } from "@/lib/config";

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": companyInfo.name,
  "url": companyInfo.website,
  "logo": `${companyInfo.website}${companyInfo.logo}`,
  "description": companyInfo.description,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": contactInfo.phone.replace(/[^\d+]/g, ''),
    "contactType": "customer service",
    "email": contactInfo.email,
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": contactInfo.address.split(',')[0],
    "addressLocality": contactInfo.address.split(',')[1]?.trim().split(' ')[0] || "Green City",
    "addressRegion": contactInfo.address.split(',')[1]?.trim().split(' ')[1] || "GC",
    "postalCode": contactInfo.address.split(',')[1]?.trim().split(' ')[2] || "12345",
    "addressCountry": "US"
  },
  "sameAs": Object.values(socialLinks)
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": companyInfo.name,
  "url": companyInfo.website,
  "description": companyInfo.description,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${companyInfo.website}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Solar Energy Solutions",
  "description": companyInfo.description,
  "provider": {
    "@type": "Organization",
    "name": companyInfo.name,
    "url": companyInfo.website
  },
  "serviceType": [
    "Off-Grid Solar Systems",
    "On-Grid Solar Systems", 
    "Solar Water Heating",
    "Backup Power Solutions"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  }
};