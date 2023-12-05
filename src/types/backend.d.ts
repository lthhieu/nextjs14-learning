export { }
declare global {
    interface IBackendResponse<T> {
        error?: string | string[],
        message: string,
        statusCode: number | string,
        data?: T
    }
    interface IMeta {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    }
    interface IUserPaginate {
        "_id": string,
        "email": string,
        "name": string,
        "role": string,
        "address": string,
        "age": number,
        "gender": string,
        "isVerify": boolean,
        "type": string,
    }
    interface INewUser extends IUserPaginate {
        password: string
    }
    interface IPaginate<T> {
        meta: IMeta,
        result: T[]
    }
}