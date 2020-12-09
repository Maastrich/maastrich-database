"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.database = void 0;
var maastrich_logger_1 = require("maastrich-logger");
var implementations_1 = require("./implementations");
var DatabaseManager = /** @class */ (function () {
    function DatabaseManager(databaseList) {
        var _this = this;
        this.databases = [];
        this.logger = new maastrich_logger_1.Logger();
        databaseList.forEach(function (db) {
            switch (db.type) {
                case 'mongo':
                    _this.databases.push({ db: new implementations_1.Mongo(db.uri, db.name), name: db.name });
                    break;
                default: _this.databases.push({ db: new implementations_1.Mongo(db.uri, db.name), name: db.name });
            }
        });
    }
    DatabaseManager.prototype.getDatabase = function (name) {
        var askedDatabase;
        this.databases.forEach(function (database) {
            if (database.name === name) {
                askedDatabase = database.db;
            }
        });
        if (!askedDatabase) {
            this.logger.error('Database Loader', "Database '" + name + "' not found");
            throw new Error();
        }
        return askedDatabase;
    };
    return DatabaseManager;
}());
var database;
var isInit = false;
function init(databaseList) {
    database = new DatabaseManager(databaseList);
    isInit = true;
}
exports.init = init;
function Database(name) {
    if (name === void 0) { name = ''; }
    if (!isInit) {
        throw new Error('You need to init the databases manager before using it !!');
    }
    var db = database.getDatabase(name);
    return {
        get: function (collection, opt) { return db.get(collection, opt); },
        post: function (collection, data) { return db.post(collection, data); },
        put: function (collection, data, filter) { return db.put(collection, data, filter); },
        delete: function (collection, filter) { return db.delete(collection, filter); },
    };
}
exports.database = Database;
exports.default = {
    database: Database,
    init: init,
};
//# sourceMappingURL=index.js.map