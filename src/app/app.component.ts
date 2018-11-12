import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TaskListPage } from '../pages/task-list/task-list';
import { NewTaskPage } from '../pages/new-task/new-task';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  taskListPage: any = TaskListPage;
  newTaskPage: any = NewTaskPage;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any)
  {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }
}

