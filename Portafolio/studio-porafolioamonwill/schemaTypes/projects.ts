import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'desc', title: 'Short Description (Card)', type: 'string' }),
    defineField({ name: 'detailedDesc', title: 'Detailed Description', type: 'text' }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Data Analysis / Data Science', value: 'data-science' },
          { title: 'Mobile App', value: 'mobile' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: { list: ['In Progress', 'Completed', 'Finished', 'On Hold'] },
    }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'github', title: 'GitHub Link', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Live Project Link', type: 'url' }),
    defineField({
      name: 'tech',
      title: 'Technologies',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'iconType', title: 'Type', type: 'string', options: { list: ['Image', 'FontAwesome', 'Emoji'] } }),
          defineField({ name: 'image', title: 'Icon', type: 'image', hidden: ({ parent }) => parent?.iconType !== 'Image' }),
          defineField({ name: 'iconClass', title: 'FA Class', type: 'string', hidden: ({ parent }) => parent?.iconType !== 'FontAwesome' }),
          defineField({ name: 'emoji', title: 'Emoji', type: 'string', hidden: ({ parent }) => parent?.iconType !== 'Emoji' }),
          defineField({ name: 'color', title: 'Hex Color', type: 'string' }),
        ],
      }],
    }),
  ],
})