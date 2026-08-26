import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nombre del Certificado', type: 'string' }),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Insignia', value: 'badge' },
          { title: 'Certificado', value: 'certificate' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'category', title: 'Categoría', type: 'string' }),
    defineField({ name: 'year', title: 'Año', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text' }),
    defineField({ name: 'image', title: 'Imagen del Certificado', type: 'image', options: { hotspot: true } }),
  ],
})