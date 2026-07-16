import { listContent } from '$lib/content';

export function load() {
  return {
    talentos: listContent('talentos')
  };
}