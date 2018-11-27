import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { SearchTaskPage } from '../search-task/search-task';
import { Task } from '../../models/Task';
import { DatabaseService } from '../../services/Database.service';
import { SingleTaskPage } from '../single-task/single-task';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-task-list',
    templateUrl: 'task-list.html',
})
export class TaskListPage {

    taskList: Task[];
    taskListDisplayed: Task[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private modalCtrl: ModalController, 
              private menuCtrl: MenuController, private databaseService: DatabaseService) 
    {
    }
  
    ionViewWillEnter()
    {
        this.databaseService.getTasks().then((resp: Task[]) => {
            if(resp)
            {
                this.taskList = resp;
                this.taskListDisplayed = this.taskList;
            }
            else
            {
                this.taskList = [];
                this.taskListDisplayed = this.taskList;
            }
        }).catch((error) => {
            console.log(error);
            this.taskList = [];
            this.taskListDisplayed = this.taskList;
        });
    }

    onSearchTask()
    {
        let modal = this.modalCtrl.create(SearchTaskPage);
        modal.onDidDismiss((data) => {
            this.taskListDisplayed = [];
            for(let i = 0; i < this.taskList.length; i++)
            {
                let match = true;
                for(var attr in data)
                {
                    if(this.taskList[i][attr] != data[attr])
                    {
                        match = false;
                    }
                }
                if(match)
                {
                    this.taskListDisplayed.push(this.taskList[i]);
                }
            }
        });
        modal.present();
    }

    onToggleMenu() 
    {
        this.menuCtrl.open();
    }

    onDisplayTask(task: Task)
    {
        this.navCtrl.push(SingleTaskPage, {task: task});
    }
}
