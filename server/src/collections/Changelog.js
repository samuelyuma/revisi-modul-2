const { createHook } = require('@payloadcms/payload');

const Changelog = {
    slug: 'changelog',
    access: {
        read: () => true,
        create: () => false,
        update: () => false,
        delete: () => false,
    },
    fields: [
        {
            name: 'timestamp',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
        },
        {
            name: 'action',
            type: 'select',
            options: [
                {
                    value: 'create',
                    label: 'Create',
                },
                {
                    value: 'update',
                    label: 'Update',
                },
                {
                    value: 'delete',
                    label: 'Delete',
                },
            ],
            required: true,
        },
        {
            name: 'collectionName',
            type: 'text',
            required: true,
        },
        {
            name: 'documentId',
            type: 'text',
            required: true,
        },
    ],
};

const createChangelogEntry = async ({ collectionName, documentId }, action) => {
    const { db } = context;
    const changelogCollection = db.collection('changelog');
    await changelogCollection.insertOne({
        timestamp: new Date(),
        action,
        collectionName,
        documentId,
    });
};

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
            type: 'date',
        },
        {
            name: 'content',
            type: 'richText',
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

const CategoriesHook = createHook('after', ['create', 'update', 'delete'], async (context) => {
    const { operation } = context;
    await createChangelogEntry(operation, operation.type);
});

const TodoHook = createHook('after', ['create', 'update', 'delete'], async (context) => {
    const { operation } = context;
    await createChangelogEntry(operation, operation.type);
});

export default { Categories, Todo, Changelog };
