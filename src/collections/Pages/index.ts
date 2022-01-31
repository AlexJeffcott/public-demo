import { CollectionConfig } from 'payload/types';
import slug from '../../fields/slug';
import { Content } from '../../blocks/Content';
import { Media } from '../../blocks/Media';
import { Form } from '../../blocks/Form';
import MediaContent from '../../blocks/MediaContent';
import populateFullTitle from './hooks/populateFullTitle';
import MediaSlider from '../../blocks/MediaSlider';
import { Accordion } from '../../blocks/Accordion';
import Breadcrumbs from './fields/Breadcrumbs';
import { populateAuthor } from './hooks/populateAuthor';
import { hero } from '../../fields/hero';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: [
      'fullTitle',
      'author',
      'createdAt',
      'status',
      'appUrl',
    ],
    preview: ({ appUrl }) => (appUrl ? `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/preview?url=${appUrl}` : null),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    hero,
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [
        Accordion,
        Content,
        Form,
        Media,
        MediaContent,
        MediaSlider,
      ],
    },
    {
      name: 'fullTitle',
      type: 'text',
      hooks: {
        beforeChange: [
          populateFullTitle,
        ],
      },
      admin: {
        components: {
          Field: () => null,
        },
      },
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: 'pages',
          maxDepth: 0,
          admin: {
            disabled: true,
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
      admin: {
        readOnly: true,
        components: {
          Field: Breadcrumbs,
        },
      },
    },
    // sidebar
    slug(),
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'pages',
      maxDepth: 0,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      relationTo: 'users',
      type: 'relationship',
      hooks: {
        beforeChange: [
          populateAuthor,
        ],
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Pages;
