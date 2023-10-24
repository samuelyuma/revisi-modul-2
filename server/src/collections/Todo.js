/** @type {import('payload/types').CollectionConfig} */

const Todo = {
    slug: 'todo',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'publishedDate',
            label: 'Published Date',
            type: 'date',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'not started',
                    label: 'Not Started',
                },
                {
                    value: 'on progress',
                    label: 'On Progress',
                },
                {
                    value: 'done',
                    label: 'Done',
                },
            ],
            defaultValue: 'not started',
            admin: {
                position: 'sidebar',
            },
        },
    ],
};

export default Todo;
