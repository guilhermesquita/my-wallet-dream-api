export const editUserSchema = {
    type: 'object',
    properties: {
        name: { type:'string' },
        email: { type: 'string' },
        password: { type: 'string' },
    }
}