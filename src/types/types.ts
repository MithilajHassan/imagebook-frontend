export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phone: number;
    password: string;
}

export type IImage = {
    _id: string;
    userId: string
    title: string;
    imagePath: string;
    order: number;
}

export type ImageOrderUpdate = {
    _id: string;
    order: number;
}