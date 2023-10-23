/** @type {import('payload/types').CollectionConfig} */

const Changelog = {
    slug: 'changelog',
    access: {
        create: () => false,
        read: () => true,
        update: () => false,
        delete: () => false,
    },
    fields: [],
};

export default Changelog;
