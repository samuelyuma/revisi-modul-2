/** @type {import('payload/types').CollectionConfig} */

const Changelog = {
    slug: 'changelog',
    access: {
        read: () => true,
        create: () => false,
        update: () => false,
        delete: () => false,
    },
    fields: [],
};

export default Changelog;
