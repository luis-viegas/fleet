import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Image of Restaurant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude",
    },
    {
      name: "address",
      type: "string",
      title: "Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Rating",
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      name: "type",
      title: "Category",
      type: "reference",
      to: [{type: "category"}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{type: "reference", to: [{type: "dish"}]}],
    },
  ],


})
