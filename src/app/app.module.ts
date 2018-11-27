import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TaskListPage } from '../pages/task-list/task-list';
import { SearchTaskPage } from '../pages/search-task/search-task';
import { NewTaskPage } from '../pages/new-task/new-task';
import { TaskTypeService } from '../services/TaskType.service';
import { SearchCriteriaService } from '../services/SearchCriteria.service';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseService } from '../services/Database.service';
import { SingleTaskPage } from '../pages/single-task/single-task';
import { AgmCoreModule } from '@agm/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { LocateAppointmentPage } from '../pages/locate-appointment/locate-appointment';
import { AddressCoordsService } from '../services/Address_coords.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TaskListPage,
    SearchTaskPage,
    NewTaskPage,
    SingleTaskPage,
    LocateAppointmentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBQ9s-I2YGlocgEKe0fVUid6mUqacCaqbE'}),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TaskListPage,
    SearchTaskPage,
    NewTaskPage,
    SingleTaskPage,
    LocateAppointmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskTypeService,
    SearchCriteriaService,
    SQLite,
    DatabaseService,
    Camera,
    File,
    AddressCoordsService
  ]
})
export class AppModule {}
