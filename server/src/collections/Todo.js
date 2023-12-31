import payload from 'payload';

/** @type {import('payload/types').CollectionConfig} */

const Todo = {
    slug: 'todo',
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
            name: 'title',
            type: 'text',
            required: true,
        },
        // {
        //     name: 'publishedDate',
        //     type: 'date',
        //     label: 'Published Date',
        //     admin: {
        //         date: {
        //             pickerAppearance: 'dayAndTime',
        //             displayFormat: 'd MMM yyy h:mm:ss a',
        //         },
        //     },
        // },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'on progress',
                    label: 'On Progress',
                },
                {
                    value: 'completed',
                    label: 'Completed',
                },
                {
                    value: 'not started',
                    label: 'Not Started',
                }
            ],
            defaultValue: 'not started',
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        afterOperation: [
            async (args) => {
                if (args.operation == 'create') {
                    payload.create({
                        collection: 'log',
                        data: {
                            type: 'Todo',
                            name: args.result.title,
                            action: 'Created',
                        },
                    });
                } else if (args.operation == 'updateByID') {
                    payload.create({
                        collection: 'log',
                        data: {
                            type: 'Todo',
                            name: args.result.title,
                            action: 'Update',
                        },
                    });
                } else if (args.operation == 'deleteByID') {
                    payload.create({
                        collection: 'log',
                        data: {
                            type: 'Todo',
                            name: args.result.title,
                            action: 'Delete',
                        },
                    });
                }
            },
        ],
    },
};

export default Todo;
