import { Model } from "mongoose";

export interface Ibook {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    available: boolean
};

export interface bookStaticMethod extends Model<Ibook>{
    checkAvailability(copies: number): boolean
};