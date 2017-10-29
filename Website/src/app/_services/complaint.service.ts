import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User, Complaint, ComplaintDetails } from '../_models/index';

@Injectable()
export class ComplaintService {
    constructor(private http: Http) { }

    makeComplaint(complaint: Complaint) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:4000/makeComplaint', complaint, options)
        	.map((response: Response) => response.json());
    }
    
    uploadLogo(logoURL:string){
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', "apikey":"4bd4faa28188957" });
        let options = new RequestOptions({ headers: headers });
        
        let request = "url="+logoURL+"&isOverlayRequired=true";

        return this.http.post('https://api.ocr.space/parse/image', request, options)
        	.map((response: Response) => response.json());
    }
    
    companySearch(companyName:string){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let request = {"companyName": companyName};

        return this.http.post('http://localhost:4000/companySearch', request, options)
        	.map((response: Response) => response.json());
    }
}