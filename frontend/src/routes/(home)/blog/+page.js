import { listContent } from '$lib/content';

export function load() {
  return {
    posts: listContent('blog')
  };
}