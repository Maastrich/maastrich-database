import { Cursor } from 'mongodb';
import { DatabaseProvider } from '../Provider';
declare class Mongo implements DatabaseProvider {
    private client;
    private database?;
    constructor(uri: string, db: string);
    get(collection: string, filter?: object): Promise<Cursor<any>>;
    post(collection: string, data: any): Promise<any>;
    put(collection: string, data: any, filter: object): Promise<any>;
    delete(collection: string, filter: object): Promise<any>;
}
export { Mongo };
