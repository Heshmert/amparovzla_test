import { listContent } from '$lib/content';

export function load() {
  return {
    menuDocs: listContent('docs')
  };
}