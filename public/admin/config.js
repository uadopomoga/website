window.CMS_MANUAL_INIT = true;

const config = {
  backend: {
    name: 'github',
    repo: process.env.REPOSITORY,
    branch: process.env.BRANCH,
    site_domain: process.env.DOMAIN,
    base_url: process.env.BASE_URL,
    auth_endpoint: '/oauth',
  },
  media_folder: 'public/content-images/new-posts',
  public_folder: '/content-images/new-posts',
  collections: [
    {
      name: 'blog',
      label: 'blog',
      folder: '_posts',
      create: true,
      slug: '{{slug}}',
      editor: {
        preview: false,
      },
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        {
          label: 'Images',
          name: 'image',
          widget: 'list',
          field: { label: 'Image', name: 'image', widget: 'image' },
        },
        { label: 'Image Alt Text', name: 'image_alt', widget: 'string' },
        {
          label: 'Background Image',
          name: 'background_image',
          widget: 'image',
        },
        {
          label: 'Background Image Alt Text',
          name: 'background_image_alt',
          widget: 'string',
        },
        { label: 'Video', name: 'video', widget: 'string', required: false },
        { label: 'Publish Date', name: 'date', widget: 'datetime' },
        { label: 'CTA', name: 'cta', widget: 'string' },
        { label: 'Content', name: 'body', widget: 'markdown' },
      ],
    },
  ],
};

document.addEventListener('DOMContentLoaded', function () {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.reload();
        });
      }
    });
  }

  if (window.CMS) {
    window.CMS.init({ config });
  }
});
