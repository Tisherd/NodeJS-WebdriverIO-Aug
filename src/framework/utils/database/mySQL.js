const mysql = require('mysql2/promise');
const Logger = require('../logger/logger');

class MySQL{
    constructor(){
        this.#connection;
    }

    async createConnection(sqlUser){
        Logger.info("Connecting to a MySQL server...");
        if (!this.#connection) {            
            this.#connection = await mysql.createConnection(sqlUser);
        }
        else {
            Logger.error("Unable to create connection. Connection already exists");
        }        
    }

    async execute(query, queryName="query result"){
        try{
            Logger.info(`Receiving '${queryName}'...`);
            const [rows, fields] = await this.#connection.execute(query);
            Logger.table(rows);
        } catch {
            Logger.error(`'${queryName}' ended with an error`)
        }        
    }

    async disconnect(){
        Logger.info("Closing MySQL connection...");
        if (this.#connection) {            
            return this.#connection.end();            
        }
        else {
            Logger.error("Unable to close connection. No connection");
        }        
    }
}

module.exports = MySQL;
