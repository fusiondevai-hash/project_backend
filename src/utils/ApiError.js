
class ApiError extends Error{
    constructor(statusCode,message="something went wrong",errors=[],stack=""){
        super(message)
        this.statusCode=statusCode
        this.stack=stack
        this.errors=errors
        this.success=false
        this.message = message
    
    if (stack) {
        this.stack = stack;
    } else {
        Error.captureStackTrace(this, this.constructor);
       }   
    }
}

export {ApiError}