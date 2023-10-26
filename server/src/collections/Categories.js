import payload from 'payload';

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
            required: true,
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'Category',
                            name: args.result.name,
                            action: 'Created',
                        },
                    });
                }
            },
        ],
        afterChange: [
            async (args) => {
                if (args.operation == 'update') {
                    payload.create({
                        collection: 'changelog',
                        data: {
                            type: 'Category',
                            name: args.doc.name,
                            action: 'Updated',
                        },
                    });
                }
            },
        ],
        afterDelete: [
            async (args) => {
                payload.create({
                    collection: 'changelog',
                    data: {
                        type: 'Category',
                        name: args.doc.name,
                        action: 'Deleted',
                    },
                });
            },
        ],
    },
};

export default Categories;
