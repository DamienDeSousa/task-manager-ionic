import { Injectable } from "@angular/core";
import { SQLiteObject, SQLite } from "@ionic-native/sqlite";
import { Task } from "../models/Task";

@Injectable()
export class DatabaseService
{
    options: any = {
        name: 'taskmanager.db',
        location: 'default'
    };
    private db: SQLiteObject;
    private taskList: Task[];
    private DATA_VERSION: number = 2;

    constructor(private sqlite: SQLite)
    {
        this.taskList = [];
        this.connectToDb();
    }

    private connectToDb()
    {
        this.sqlite.create(this.options).then((db: SQLiteObject) => {
            this.db = db;
            var sql = 'create table if not exists `task`';//
            sql += ' (titre varchar(255), type varchar(255), description varchar(255), jour text, heure text, fichier varchar(255), ';
            sql += 'lat real, lng real, notifme integer)';
            this.db.executeSql(sql, []).then(() => {
                console.log('requete execute: '+sql);
            }).catch((error) => {
                console.log(error);
            });

            if(this.DATA_VERSION == 1)
            {
                var query = "alter table `task` add column notifme integer default 0";
                this.db.executeSql(query, []).then(() => {
                console.log('requete execute: '+query);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    public insertTask(task: Task)
    {
        var sql = "insert into `task` (titre, type, description, jour, heure, fichier, lat, lng, notifme)";
        sql += " values ('"+task.title+"', '"+task.type+"', '"+task.description+"', '"+task.day+"', '"+task.moment+"', '"+task.fileURL+"', '";
        sql += task.location.lat+"', '"+task.location.lng+"',"+task.notifMe+")";
        this.db.executeSql(sql, []).then((data) => {
            console.log('requete execute: '+sql);  
        }).catch((error) => {
            console.log('DatabaseService.insertTask(): ');
            console.log(sql);
            console.log(error);
        });
    }

    public getTasks()
    {
        this.taskList = [];
        return new Promise((resolve, reject) => {
            var sql = "select * from `task`";
            this.db.executeSql(sql, []).then((data) => {
            
                for(let i = 0; i < data.rows.length; i++)
                {
                    let curr_item = data.rows.item(i);
                    this.taskList[i] = new Task(curr_item.titre, curr_item.type, curr_item.description, curr_item.jour, curr_item.heure);
                    this.taskList[i].fileURL = curr_item.fichier;
                    this.taskList[i].location.lat = curr_item.lat;
                    this.taskList[i].location.lng = curr_item.lng;
                    this.taskList[i].notifMe = curr_item.notifme;
                    //console.log(this.taskList[i]);
                }
                resolve(this.taskList);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    public removeTask(task: Task)
    {
        console.log('removeTask');
        return new Promise((resolve, reject) => {
            var sql = "delete from `task` where titre=? and type=? and description=? and jour=? and heure=? and fichier=? and lat=? and lng=? and notifme=?";
            this.db.executeSql(sql, [task.title, task.type, task.description, task.day, task.moment, task.fileURL, task.location.lat, task.location.lng, task.notifMe])
            .then((data) => {
                console.log(data);
                resolve('it works');
            }).catch((error) =>{
                console.log(error);
                reject('error on delete');
            });
        });
    }
}