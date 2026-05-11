import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'iklvlnau', 
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getFileUrl(ref: string) {
  const [_file, id, extension] = ref.split('-')
  return `https://cdn.sanity.io/files/TU_PROJECT_ID/production/${id}.${extension}`
}