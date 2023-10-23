/** @type {import('payload/types').CollectionConfig} */
/** @type {import('payload/types').GlobalAfterChangeHook} */

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
    hooks: {
        afterChange: [{}],
        afterDelete: [{}],
    },
};

export default Categories;
