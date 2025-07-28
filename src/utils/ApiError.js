// You're defining a custom error class called ApiError, 
// and it's super useful for building clean, consistent, 
// and structured error responses in your backend apps



class ApiError extends Error {
    constructor (
        statusCode,
        message = "Soemthing went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors;
        
        if ( stack ){
            this.stack = stack
        } else{
            Error.captureStackTrace(this ,this.constructor)
        }
    }
}
export {ApiError}