import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Task } from '../../models/Task';
import { NgForm } from '@angular/forms';
import { TaskListPage } from '../task-list/task-list';

/**
 * Generated class for the NewTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTaskPage {

  newTask: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.newTask = new Task('', '', '', '', '');
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onSubmit(form: NgForm)
  {
    console.log(form.value);
    this.navCtrl.setRoot(TaskListPage);
  }
}
