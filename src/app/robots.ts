import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
     const baseUrl = 'https://pemira.nurulfikri.ac.id'; // Primary Domain

     return {
          rules: {
               userAgent: '*',
               allow: '/',
               disallow: ['/api/', '/private/'], // Protect API routes from crawlers (though usually not issue in Next App Router unless exposed)
          },
          sitemap: `${baseUrl}/sitemap.xml`,
     };
}
