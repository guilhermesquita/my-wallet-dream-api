export const addUserSchema = {
    type: 'object',
    properties: {
        name: { type:'string' },
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['name', 'email', 'password'],
}