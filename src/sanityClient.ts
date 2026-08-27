import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// 1. Primero creamos el cliente con tu Project ID real
export const client = createClient({
  projectId: 'iklvlnau', 
  dataset: 'production',
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
  return `https://cdn.sanity.io/files/iklvlnau/production/${id}.${extension}`
}