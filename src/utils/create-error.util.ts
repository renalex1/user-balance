class CustomError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = this.constructor.name; 
        Error.captureStackTrace(this, this.constructor); 
    }
}

export default (status: number, message: string) => {
    return new CustomError(status, message);
};
