/** @type {import('payload/types').CollectionConfig} */

const Categories = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
        },
    ],
};

export default Categories;
