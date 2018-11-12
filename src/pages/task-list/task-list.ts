import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { SearchTaskPage } from '../search-task/search-task';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  onSearchTask()
  {
    let modal = this.modalCtrl.create(SearchTaskPage);
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }
}
