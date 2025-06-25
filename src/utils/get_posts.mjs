import { getCollection } from 'astro:content';

import oldPosts from '../data/posts/old_posts.json';

export async function getAllPosts() {
  const mdPosts = await getCollection('posts');

  // Filter out draft posts in production
  const filteredMdPosts = mdPosts.filter(
    (post) => import.meta.env.DEV || !post.data.draft
  );

  const formattedMdPosts = await Promise.all(
    filteredMdPosts.map(async (post) => {
      const { Content } = await post.render();

      return {
        title: post.data.title,
        content: post.body,
        image: Array.isArray(post.data.image)
          ? [...post.data.image]
          : post.data.image,
        image_alt: post.data.image_alt,
        background_image: post.data.background_image,
        background_image_alt: post.data.background_image_alt,
        date: post.data.date.toISOString().split('T')[0],
        cta: post.data.cta || 'Читати далі',
        slug: post.slug,
        isMdPost: true,
        entry: post,
      };
    })
  );

  const formattedJsonPosts = oldPosts.map((post, index) => ({
    ...post,
    date: post.date,
    isMdPost: false,
    slug: post.url
      ? post.url
          .toString()
          .toLowerCase()
          .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '') // Remove special characters except hyphens
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Collapse multiple hyphens
          .replace(/^-+|-+$/g, '') // Trim hyphens from start/end
      : `post-${index}`, // Fallback to index if url is missing
  }));

  const allPosts = [...formattedMdPosts, ...formattedJsonPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured);
}
