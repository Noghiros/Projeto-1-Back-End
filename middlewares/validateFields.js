function validateFields(requiredFields) {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => {
            const value = req.body[field];
            return value === undefined || value === null || value === '';
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Campos obrigatórios ausentes',
                campos: missingFields
            });
        }

        next();
    };
}

module.exports = validateFields;
