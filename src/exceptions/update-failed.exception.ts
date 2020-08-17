
export const createUpdateFailedException = (tableName: string, id: string) => ({
    message: 'An error occured while updating an object',
    tableName,
    id
})
export type UpdateFailedException = ReturnType<typeof createUpdateFailedException>;
