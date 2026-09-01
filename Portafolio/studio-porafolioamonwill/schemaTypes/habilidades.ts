import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'habilidades',
  title: 'Habilidades y Tecnologías',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: ['Languages', 'Databases', 'Frameworks', 'Library', 'APIs', 'Tools', 'Others']
      }
    }),
    defineField({ name: 'icon', title: 'Icono (SVG/PNG)', type: 'image' }),
  ],
})