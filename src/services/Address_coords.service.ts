import { Injectable } from "@angular/core";
//import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AddressCoordsService
{
    protected url: string = "https://maps.googleapis.com/maps/api/geocode/json?";
    protected apiKey: string = "AIzaSyBQ9s-I2YGlocgEKe0fVUid6mUqacCaqbE";
    protected options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient)
    {

    }

    getCoordsFromAddress(address: string): Observable<any>
    {
        //var json = this.buildURL(address);
        //console.log(json);
        let observable: Observable<any> = this.http.get(this.buildURL(address)).map((res: Response) => res);
        return observable;
    }

    protected buildURL(address: string): string
    {
        return this.url+"address="+address+"&key="+this.apiKey;
    }
}