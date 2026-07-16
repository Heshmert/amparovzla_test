// src/lib/content.js

export function listContent(category) {
  let modules;
  
  if (category === 'blog') {
    modules = import.meta.glob('/src/lib/content/blog/*.md', { eager: true });
  } else if (category === 'docs') {
    modules = import.meta.glob('/src/lib/content/docs/*.md', { eager: true });
  } else if (category === 'talentos') {
    modules = import.meta.glob('/src/lib/content/talentos/*.md', { eager: true });
  } else {
    return [];
  }

return Object.entries(modules)
    .map(([path, module]) => {
      const slug = path.split('/').pop().slice(0, -3);
      return {
        slug,
        meta: module.metadata
      };
    })
    // Ordenamos numéricamente por la propiedad 'order'
    // Si algún archivo no tiene 'order', lo mandamos al final (le asignamos 99)
    .sort((a, b) => {
      const ordenA = a.meta.order ?? 99;
      const ordenB = b.meta.order ?? 99;
      return ordenA - ordenB;
    });
}