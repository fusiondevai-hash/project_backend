
class ApiError extends Error{
    constructor(message="something went wrong",statusCode,stack="",errors=[]){
        super(message)
        this.statusCode=statusCode
        this.stack=stack
        this.errors=errors
        this.success=false
    
    if (stack) {
        this.stack = stack;
    } else {
        Error.captureStackTrace(this, this.constructor);
       }   
    }
}

export {ApiError}