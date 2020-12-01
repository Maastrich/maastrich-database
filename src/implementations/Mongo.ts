import {
 MongoClient, Db as Database, Cursor,
} from 'mongodb';
import { DatabaseProvider } from '../Provider';

class Mongo implements DatabaseProvider {
  private client: MongoClient;

  private database?: Database;

  constructor(uri: string, db: string) {
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.database = this.client.db(db);
    });
  }

  async get(collection: string, filter?: object): Promise<Cursor<any>> {
    if (!this.database) { throw new Error('Trying to access a non connected database'); }
    return this.database.collection(collection).find(filter);
  }

  async post(collection: string, data :string): Promise<any> {
    if (!this.database) { throw new Error('Trying to access a non connected database'); }
    return this.database.collection(collection).insertOne(data);
  }

  async put(collection: string, data :any, filter: object): Promise<any> {
    if (!this.database) { throw new Error('Trying to access a non connected database'); }
    return this.database.collection(collection).updateOne(filter, data);
  }

  async delete(collection: string, filter: object): Promise<any> {
    if (!this.database) { throw new Error('Trying to access a non connected database'); }
    return this.database.collection(collection).deleteOne(filter);
  }
}

export { Mongo };
