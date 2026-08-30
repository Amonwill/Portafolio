import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nombre de la Credencial', type: 'string' }),
    defineField({
      name: 'kind',
      title: 'Tipo de Credencial',
      type: 'string',
      options: {
        list: [
          { title: 'Insignia (Incluye Insignia + Certificado)', value: 'badge' },
          { title: 'Solo Certificado', value: 'certificate' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'category', title: 'Categoría', type: 'string' }),
    defineField({
      name: 'area',
      title: 'Área / Especialización',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Software Development', value: 'Software Development' },
          { title: 'Data Science', value: 'Data Science' },
          { title: 'Data Analytics', value: 'Data Analytics' },
          { title: 'Artificial Intelligence', value: 'Artificial Intelligence' },
          { title: 'Cloud & DevOps', value: 'Cloud & DevOps' },
          { title: 'Databases', value: 'Databases' },
          { title: 'Cybersecurity', value: 'Cybersecurity' },
          { title: 'Project Management', value: 'Project Management' },
          { title: 'Essential Skills', value: 'Essential Skills' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({ name: 'year', title: 'Año', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text' }),

    defineField({
      name: 'credlyUrl',
      title: 'Enlace de la Insignia (Credly)',
      type: 'url',
      hidden: ({ document }) => document?.kind !== 'badge',
    }),
    defineField({
      name: 'badgeImage',
      title: 'IMAGEN DE LA INSIGNIA (Cuadrada/Transparente)',
      type: 'image',
      hidden: ({ document }) => document?.kind !== 'badge',
      options: { hotspot: true },
    }),

    defineField({
      name: 'certificateImage',
      title: 'IMAGEN DEL CERTIFICADO (El diploma completo)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'certificatePdf',
      title: 'PDF DEL CERTIFICADO (Sube esto solo si no tienes la imagen)',
      type: 'file',
    }),
  ]
})