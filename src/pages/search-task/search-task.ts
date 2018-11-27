import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SearchCriteriaService } from '../../services/SearchCriteria.service';
import { TaskTypeService } from '../../services/TaskType.service';

@Component({
    selector: 'page-search-task',
    templateUrl: 'search-task.html',
})
export class SearchTaskPage {

    criteres : string[];
    typeTaches: string[];
    selectedCritere: string;
    titre: string;
    jour: string;
    //heure: string;
    selectedType: string;

    constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private menuCtrl: MenuController,
              private searchCtriteraService: SearchCriteriaService,
              private taskTypeService: TaskTypeService) 
    {
    }

    ionViewWillEnter()
    {
        this.criteres = this.searchCtriteraService.getCriterias();
        this.typeTaches = this.taskTypeService.getTaskTypes();
    }

    dismissModal()
    {
        this.viewCtrl.dismiss();
    }

    onSubmit(form: NgForm)
    {
        //console.log(form.value);
        let data = form.value;
        delete data.selectedCritere;
        this.viewCtrl.dismiss(data);
    }
}
