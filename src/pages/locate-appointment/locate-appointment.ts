import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AddressCoordsService } from '../../services/Address_coords.service';

@Component({
  selector: 'page-locate-appointment',
  templateUrl: 'locate-appointment.html',
})
export class LocateAppointmentPage implements OnInit{

    address: string = "";
    latitude: number;
    longitude: number;
    marker: {
        latitude: number;
        longitude: number;
    }

    constructor(public navParams: NavParams, 
                public viewCtrl: ViewController, 
                private addressCoordsService: AddressCoordsService, 
                private alertCtrl: AlertController) 
    {

    }

    ngOnInit()
    {
        this.latitude = 43.753890;
        this.longitude = 4.514380;
    }
    
    dismissModal()
    {
        this.viewCtrl.dismiss();
    }

    onDismissSuccess()
    {
        if(this.marker)
        {
            this.viewCtrl.dismiss(this.marker);
        }
        else
        {
            this.viewCtrl.dismiss();
        }
    }

    findCoords()
    {
        this.addressCoordsService.getCoordsFromAddress(this.address).subscribe(json => {
            console.log(json.results[0]);
            if(json.hasOwnProperty('status'))
            {
                if(json.status == 'OK')
                {
                    this.latitude = json.results[0].geometry.location.lat;
                    this.longitude = json.results[0].geometry.location.lng;
                    this.marker = {latitude: this.latitude, longitude: this.longitude};
                }
                else
                {
                    let alert = this.alertCtrl.create({
                        title: 'Lieu introuvable',
                        subTitle: 'L\'adresse '+this.address+' est introuvable...',
                        buttons: ['Fermer']
                    });
                    alert.present();
                }
            }
            else
            {
                let alert = this.alertCtrl.create({
                    title: 'Serveur indisponible',
                    subTitle: 'Le serveur de recherche est momentanément indisponible...',
                    buttons: ['Fermer']
                });
                alert.present();
            }
        });
    }
}
