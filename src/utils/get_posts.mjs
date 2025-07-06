import { marked } from 'marked';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

import oldPosts from '../data/posts/old_posts.json';

export async function getAllPosts() {
  const postsDir = path.join(process.cwd(), '_posts');
  let mdPosts = [];

  try {
    const files = fs.readdirSync(postsDir);
    const mdFiles = files.filter((file) => file.endsWith('.md'));

    mdPosts = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const slug = file.replace('.md', '');
        const htmlContent = await marked(content || '');

        return {
          title: data.title,
          content: htmlContent,
          body: content || '',
          image: Array.isArray(data.image)
            ? data.image.map((img) => (img.startsWith('/') ? img : `/${img}`))
            : data.image && !data.image.startsWith('/')
              ? `/${data.image}`
              : data.image,
          image_alt: data.image_alt,
          background_image:
            data.background_image && !data.background_image.startsWith('/')
              ? `/${data.background_image}`
              : data.background_image,
          background_image_alt: data.background_image_alt,
          date: data.date
            ? new Date(data.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          cta: data.cta || 'Читати далі',
          slug: slug,
          isMdPost: true,
        };
      })
    );
  } catch (error) {
    console.log('No _posts directory found or error reading posts:', error);
    mdPosts = [];
  }

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

  const allPosts = [...mdPosts, ...formattedJsonPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured);
}
