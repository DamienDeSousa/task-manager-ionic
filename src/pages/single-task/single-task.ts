import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/Task';
import { DatabaseService } from '../../services/Database.service';
import { File } from '@ionic-native/file';

declare var cordova: any;

@Component({
    selector: 'page-single-task',
    templateUrl: 'single-task.html',
})
export class SingleTaskPage {

    task: Task;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                private databaseService: DatabaseService, 
                private file: File) 
    {
    }

    ngOnInit()
    {
       this.task = this.navParams.get('task');
    }

    onRemoveTask()
    {
        console.log('onRemoveTask');
        this.databaseService.removeTask(this.task).then((resp: any) => {
            console.log(resp);
            //var currentName = this.task.fileURL.replace(/^.*[\\\/]/, '');
            this.file.removeFile(this.task.pathFile , this.task.fileName).then((resp: any) => {
                console.log('fichier supprimé');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
        this.navCtrl.pop();
    }
}
