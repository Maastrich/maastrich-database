declare type Db = {
    type: string;
    name: string;
    uri: string;
};
declare function init(databaseList: Db[]): void;
declare function Database(name?: string): {
    get: (collection: string, opt?: object | undefined) => Promise<import("mongodb").Cursor<any>>;
    post: (collection: string, data: string) => Promise<import("mongodb").Cursor<any>>;
    put: (collection: string, data: any, filter: object) => Promise<import("mongodb").Cursor<any>>;
    delete: (collection: string, filter: object) => Promise<import("mongodb").Cursor<any>>;
};
export { Database as database, init };
declare const _default: {
    database: typeof Database;
    init: typeof init;
};
export default _default;
