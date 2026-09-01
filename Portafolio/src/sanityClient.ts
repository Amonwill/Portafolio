import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Project ID y dataset se leen de las variables de entorno (VITE_SANITY_*)
// en vez de estar duplicados en el código: así solo hay un lugar que tocar
// si cambian, y coincide con lo que ya declara el .env del proyecto.
const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'iklvlnau'
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'

// 1. Primero creamos el cliente con tu Project ID real
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true,
  apiVersion: '2024-03-01',
})

// 2. Luego le pasamos ese cliente al builder de imágenes usando la importación correcta
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// 3. Ya con tu Project ID colocado en la URL
export function getFileUrl(ref: string) {
  const [_file, id, extension] = ref.split('-')
  return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`
}