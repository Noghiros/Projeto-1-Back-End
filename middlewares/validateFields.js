// middlewares/validateFields.js

function validateFields(requiredFields, body) {
    const missingFields = requiredFields.filter(field => {
        const value = body[field];
        return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
        return {
            valid: false,
            error: {
                error: 'Campos obrigatórios ausentes',
                campos: missingFields
            }
        };
    }

    return { valid: true };
}

module.exports = validateFields;

