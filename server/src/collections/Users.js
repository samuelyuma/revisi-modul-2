const Users = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        // Email added by default
        // Add more fields as needed
        {
            name: 'name',
            type: 'text',
        },
    ],
};

export default Users;
