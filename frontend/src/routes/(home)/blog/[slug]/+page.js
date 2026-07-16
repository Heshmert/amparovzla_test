import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`$lib/content/blog/${params.slug}.md`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    error(404, 'No encontramos ese post.');
  }
}