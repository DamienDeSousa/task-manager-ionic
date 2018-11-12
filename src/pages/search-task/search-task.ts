import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';

/**
 * Generated class for the SearchTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-task',
  templateUrl: 'search-task.html',
})
export class SearchTaskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menuCtrl: MenuController) {
  }

  dismissModal()
  {
    this.viewCtrl.dismiss();
  }
}
