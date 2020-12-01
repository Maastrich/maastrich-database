import { Cursor } from 'mongodb';

interface DatabaseProvider {
  get(collection: string, filter?: object): Promise<Cursor<any>>;
  post(collection: string, data :string): Promise<Cursor<any>>;
  put(collection: string, data :any, filter: object): Promise<Cursor<any>>;
  delete(collection: string, filter: object): Promise<Cursor<any>>;
}

export { DatabaseProvider };
