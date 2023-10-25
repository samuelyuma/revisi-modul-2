/** @type {import('payload/types').CollectionConfig} */

const Categories = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read : () => true,
        update : () => true,
        delete : () => true,
        create : () => true
    },
    fields: [
        {
            name: 'name',
            type: 'text',
        },
    ],
    hooks: {
        afterChange: [
            async ({
                doc,
                req,
                previousDoc,
                operation
            }) => {
                console.log(`coba aj dlu (categories)`);
            },
        ],
    },
};

export default Categories;
