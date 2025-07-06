import { getCollection } from 'astro:content';
import { marked } from 'marked';

import oldPosts from '../data/posts/old_posts.json';

export async function getAllPosts() {
  const mdPosts = await getCollection('posts');

  const filteredMdPosts = mdPosts.filter(
    (post) => import.meta.env.DEV || !post.data.draft
  );

  const formattedMdPosts = await Promise.all(
    filteredMdPosts.map(async (post) => {
      const { Content } = await post.render();

      const htmlContent = await marked(post.body || '');

      return {
        title: post.data.title,
        content: htmlContent,
        body: post.body || '',
        renderedContent: Content,
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
    content: post.content || '',
    date: post.date,
    isMdPost: false,
    slug: post.url
      ? post.url
          .toString()
          .toLowerCase()
          .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '')
      : `post-${index}`,
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
