import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */

const Categories = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
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
                        collection: 'log',
                        data: {
                            type: 'Category',
                            name: args.result.name,
                            action: 'Created',
                        },
                    });
                } else if (args.operation == 'updateByID') {
                    payload.create({
                        collection: 'log',
                        data: {
                            type: 'Category',
                            name: args.result.name,
                            action: 'Update',
                        },
                    });
                } else if (args.operation == 'deleteByID') {
                    payload.create({
                        collection: 'log',
                        data: {
                            type: 'Category',
                            name: args.result.name,
                            action: 'Delete',
                        },
                    });
                }
            },
        ],
    },
};

export default Categories;
