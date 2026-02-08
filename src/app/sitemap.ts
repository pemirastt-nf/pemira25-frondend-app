import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
     const baseUrl = 'https://pemira.nurulfikri.ac.id'; // Primary Domain

     return [
          {
               url: baseUrl,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 1,
          },
          {
               url: `${baseUrl}/vote`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/results`,
               lastModified: new Date(),
               changeFrequency: 'daily', // Results update frequently during election
               priority: 0.9,
          },
          {
               url: `${baseUrl}/candidates`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
     ];
}
