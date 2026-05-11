import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nombre del Certificado', type: 'string' }),
    defineField({ name: 'category', title: 'Categoría', type: 'string' }),
    defineField({ name: 'year', title: 'Año', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text' }),
    defineField({ name: 'image', title: 'Imagen del Certificado', type: 'image', options: { hotspot: true } }),
  ],
})