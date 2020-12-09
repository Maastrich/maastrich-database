import { Logger } from 'maastrich-logger';
import { DatabaseProvider } from './Provider';
import { Mongo } from './implementations';

type Db = {type: string, name: string, uri: string};

class DatabaseManager {
  private databases: {db: DatabaseProvider, name: string}[] = [];

  private logger: Logger = new Logger();

  constructor(databaseList: Db[]) {
    databaseList.forEach((db) => {
      switch (db.type) {
        case 'mongo': this.databases.push({ db: new Mongo(db.uri, db.name), name: db.name }); break;
        default: this.databases.push({ db: new Mongo(db.uri, db.name), name: db.name });
      }
    });
  }

  public getDatabase(name: string): DatabaseProvider {
    let askedDatabase: DatabaseProvider | undefined;
    this.databases.forEach((database) => {
      if (database.name === name) { askedDatabase = database.db; }
    });
    if (!askedDatabase) {
      this.logger.error('Database Loader', `Database '${name}' not found`);
      throw new Error();
    }
    return askedDatabase;
  }
}

let database : DatabaseManager;
let isInit = false;
function init(databaseList: Db[]) {
  database = new DatabaseManager(databaseList);
  isInit = true;
}

function Database(name: string = '') {
  if (!isInit) { throw new Error('You need to init the databases manager before using it !!'); }
  const db = database.getDatabase(name);
    return {
      get: (collection: string, opt?: object) => db.get(collection, opt),
      post: (collection: string, data: any) => db.post(collection, data),
      put: (collection: string, data :any, filter: object) => db.put(collection, data, filter),
      delete: (collection: string, filter: object) => db.delete(collection, filter),
    };
}

export { Database as database, init };
export default {
  database: Database,
  init,
};
