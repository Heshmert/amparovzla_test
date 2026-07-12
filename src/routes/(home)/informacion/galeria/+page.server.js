import archivosEvidencias from '$lib/data/evidencias.json';

export function load() {
  return {
    registros: Promise.resolve(archivosEvidencias)
  };
}