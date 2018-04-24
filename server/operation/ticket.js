var fs = require('fs');
var util = require('util');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database:'wx'
});

export default class DataBase{
    constructor(opts){
        this.opts = Object.assign({},opts);
    }

    async getAccessticket(){
        let self = this;
        let sql = 'select id, ticket, expires_in, create_time, update_time from ticket_schema';
        let getData = function(){
            return new Promise(function (resolve, reject) {
                pool.getConnection(function(err, connection) {
                    connection.query(sql, function(err, rows, fields) {
                        if(err){
                            console.log('[SELECT ERROR] - ',err.message);
                        }
                        connection.release();
                        resolve(rows);
                    });
                });
            })
        };
        return await getData();
    }

    async saveAccessticket (data){
        if(!data || !data instanceof Object){
            return false;
        }
        let sql = 'INSERT INTO ticket_schema(id, ticket, expires_in, create_time, update_time) VALUES(?,?,?,?,?)';
        let params = ['',data.ticket,data.expires_in,new Date().getTime(),''];
        let saveData = function(){
            return new Promise(function (resolve, reject) {
                pool.getConnection(function(err, connection) {
                    connection.query(sql,params,function(err, rows, fields) {
                        if(err){
                             console.log('[INSERT ERROR] - ',err.message);
                        }
                        connection.release();
                        resolve(rows);
                    });
                });
            })
        };
        await saveData();
    }

    async updateAccessticket (){

    }

}
