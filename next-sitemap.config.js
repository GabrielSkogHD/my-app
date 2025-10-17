/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://raspi.gabrielskoghd.org',
  generateRobotsTxt: true,
  outDir: './public',
  exportTrailingSlash: false,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
  additionalPaths: async (config) => [
    { loc: '/' },
    { loc: '/about' },
    { loc: '/cards' },
    { loc: '/projects' },
    { loc: '/projects/newsfeedbot' },
    { loc: '/projects/selfhosted' },
    { loc: '/projects/WebDev' },
    { loc: '/stats' },
  ],
};
