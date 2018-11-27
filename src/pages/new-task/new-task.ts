import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, normalizeURL, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Task } from '../../models/Task';
import { NgForm } from '@angular/forms';
import { TaskListPage } from '../task-list/task-list';
import { TaskTypeService } from '../../services/TaskType.service';
import { DatabaseService } from '../../services/Database.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileReader } from '@ionic-native/file';
import { LocateAppointmentPage } from '../locate-appointment/locate-appointment';

declare var cordova: any;

@Component({
    selector: 'page-new-task',
    templateUrl: 'new-task.html',
})
export class NewTaskPage {

    newTask: Task;
    typeTaches: string[];
    options: CameraOptions = {
        targetWidth: 700,
        targetHeight: 700,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
    };
    address: string = '';
    notifActivated: boolean = false;

    constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private menuCtrl: MenuController, 
              private taskTypeService: TaskTypeService, 
              private databaseService: DatabaseService, 
              private camera: Camera, 
              private toastCtrl: ToastController, 
              private file: File, 
              private loadingCtrl: LoadingController, 
              private modalCtrl: ModalController) 
    {
        this.newTask = new Task('', '', '', '', '');
    }

    ionViewWillEnter(){
        this.typeTaches = this.taskTypeService.getTaskTypes();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    onSubmit(form: NgForm)
    {
        if(this.notifActivated)
        {
            this.newTask.notifMe = 1;
        }
        else
        {
            this.newTask.notifMe = 0;
        }
            
        //changer le dossier temporaire de l'image vers un dossier fixe
        if(this.newTask.pathFile != '' && this.newTask.fileName != '')
        {
            this.file.moveFile(this.newTask.pathFile, this.newTask.fileName, cordova.file.dataDirectory, this.newTask.fileName).then((data: Entry) => {
                this.newTask.pathFile = data.nativeURL;
                /*let toast = this.toastCtrl.create({
                    message: normalizeURL(data.nativeURL),
                    duration: 10000
                });
                toast.present();*/
            }).catch((error) => {
                let toast = this.toastCtrl.create({
                    message: error.message,
                    duration: 3000
                });
                toast.present();
            });
        }
        this.databaseService.insertTask(this.newTask);
        this.navCtrl.setRoot(TaskListPage);
    }

    onTakePhoto()
    {
        let loader = this.loadingCtrl.create({
            content: 'Aperçu de la photo...'
        });

        this.camera.getPicture(this.options).then((imageData) => {
            loader.present();
            this.newTask.fileName = imageData.substring(imageData.lastIndexOf('/')+1);
            this.newTask.pathFile =  imageData.substring(0,imageData.lastIndexOf('/')+1);
            
            this.file.readAsDataURL(this.newTask.pathFile, this.newTask.fileName).then(res => this.newTask.fileURL = res  );

            loader.dismiss();
        }).catch((error) => {
            this.toastCtrl.create({
                message: error.message,
                duration: 3000,
                position: 'bottom'
            }).present();
        });
    }

    onGeoLocate()
    {
        //ouvrir un modal
        let modal = this.modalCtrl.create(LocateAppointmentPage, {});
        modal.onDidDismiss(marker => {
            if(marker)
            {
                this.newTask.location.lat = marker.latitude;
                this.newTask.location.lng = marker.longitude;

                let toast = this.toastCtrl.create({
                    message: "Lieu bien enregistré.",
                    position: 'bottom',
                    showCloseButton: true,
                    closeButtonText: 'Ok'
                });
                toast.present();
            }
            //console.log(this.newTask);
        });
        modal.present();
    }
}
