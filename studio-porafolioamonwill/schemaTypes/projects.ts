import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'desc', title: 'Descripción Corta (Card)', type: 'string' }),
    defineField({ name: 'detailedDesc', title: 'Descripción Detallada', type: 'text' }),
    defineField({ 
      name: 'status', 
      title: 'Estado del Proyecto', 
      type: 'string',
      options: { list: ['En Desarrollo', 'Completado', 'Finalizado', 'Pausado'] }
    }),
    defineField({ name: 'image', title: 'Imagen de Portada', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({ name: 'github', title: 'Link GitHub', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Link del Proyecto (Live)', type: 'url' }),
    defineField({
      name: 'tech',
      title: 'Tecnologías',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Nombre', type: 'string' }),
          defineField({ name: 'iconType', title: 'Tipo', type: 'string', options: { list: ['Imagen', 'FontAwesome', 'Emoji'] } }),
          defineField({ name: 'image', title: 'Icono', type: 'image', hidden: ({ parent }) => parent?.iconType !== 'Imagen' }),
          defineField({ name: 'iconClass', title: 'Clase FA', type: 'string', hidden: ({ parent }) => parent?.iconType !== 'FontAwesome' }),
          defineField({ name: 'emoji', title: 'Emoji', type: 'string', hidden: ({ parent }) => parent?.iconType !== 'Emoji' }),
          defineField({ name: 'color', title: 'Color Hex', type: 'string' }),
        ]
      }]
    }),
  ],
})