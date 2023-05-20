function handleDuplicateKeyError(error, response) {
    const field = Object.keys(error.keyValue);
    const code = 409;
    const errorMessage = `An account with that ${field} already exists.`;
    return { messages: errorMessage, fields: field };
}

function handleValidationError(error, response) {
    let errors = Object.values(error.errors).map(el => el.message);
    let fields = Object.values(error.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        return { messages: formattedErrors, fields: fields };
    } else {
        return { messages: errors, fields: fields }
    }
}

export default function(error, request, response, next) {
    try {
        if (error && error.name === 'ValidationError') {
            return handleValidationError(error, response);
        }

        if (error && error.code && error.code === 11000) {
            return handleDuplicateKeyError(error, response);
        }
  
    } catch (err) {
        
        return {message : 'An unknown error occurred'};
    }
}

