import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Perfil de Autor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre Completo', type: 'string' }),
    defineField({ name: 'role', title: 'Título Académico/Rol', type: 'string' }),
    defineField({ name: 'bio', title: 'Biografía Principal', type: 'text' }),
    defineField({ name: 'detailedBio', title: 'Biografía Detallada', type: 'text' }),
    defineField({ name: 'photo', title: 'Foto de Perfil', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'linkedin', title: 'URL LinkedIn', type: 'url' }),
    defineField({ name: 'github', title: 'URL GitHub', type: 'url' }),
    defineField({ name: 'email', title: 'Correo de Contacto', type: 'string' }),
    defineField({ name: 'cvEn', title: 'CV Inglés (Archivo)', type: 'file' }),
    defineField({ name: 'cvEs', title: 'CV Español (Archivo)', type: 'file' }),
  ],
})