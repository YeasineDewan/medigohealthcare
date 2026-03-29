import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl, 
  canonicalUrl,
  structuredData,
  noIndex = false 
}) => {
  const siteTitle = 'Medigo Healthcare';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || 'Comprehensive healthcare management system for doctors, patients, and medical professionals';
  const siteKeywords = keywords || 'healthcare, medical, doctor, patient, appointment, prescription, lab tests, diagnostic services';
  const siteImage = ogImage || '/logo.png';
  const siteUrl = ogUrl || 'https://medigohealthcare.com';
  const canonical = canonicalUrl || siteUrl;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": siteTitle,
    "description": siteDescription,
    "url": siteUrl,
    "logo": siteImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801234567890",
      "contactType": "customer service",
      "availableLanguage": ["English", "Bangla"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Bangladesh",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka"
    },
    "sameAs": [
      "https://www.facebook.com/medigohealthcare",
      "https://www.twitter.com/medigohealthcare"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="Medigo Healthcare Team" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#5DBB63" />
      <meta name="msapplication-TileColor" content="#5DBB63" />
      <meta name="application-name" content={siteTitle} />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Content Type */}
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      
      {/* Cache Control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
    </Helmet>
  );
};

export default SEOHead;
