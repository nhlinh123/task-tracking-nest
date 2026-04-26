export class BaseResponse<T> {
    data: T;
    message?: string;
    status: number;

    constructor(data: T, message?: string, status: number = 200) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}