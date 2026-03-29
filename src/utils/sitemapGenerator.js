const generateSitemap = (baseUrl) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/doctors`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/lab-tests`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/diagnostic-services`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/appointments`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/pharmacy`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/records`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/login`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/register`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5'
    }
  ];

  // Add lab test categories
  const labTestCategories = [
    'complete-blood-count',
    'lipid-profile',
    'thyroid-function',
    'liver-function',
    'kidney-function',
    'diabetes-screening',
    'vitamin-d',
    'covid-19-pcr'
  ];

  labTestCategories.forEach(category => {
    pages.push({
      url: `${baseUrl}/lab-tests/${category}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  // Add diagnostic service categories
  const diagnosticCategories = [
    'imaging',
    'cardiology',
    'neurology',
    'pathology',
    'specialized'
  ];

  diagnosticCategories.forEach(category => {
    pages.push({
      url: `${baseUrl}/diagnostic-services/${category}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

const generateRobotsTxt = (baseUrl) => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow specific paths if needed
# Disallow: /admin/
# Disallow: /api/
# Disallow: /private/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;
};

export { generateSitemap, generateRobotsTxt };
