import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User, Complaint } from '../_models/index';

@Injectable()
export class ComplaintService {
    constructor(private http: Http) { }

    makeComplaint(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var complaint = new Complaint();
        complaint.accountId = user.accountId;
        complaint.companyId = 1;
        complaint.details = {};

        return this.http.post('http://localhost:4000/makeComplaint', complaint, options)
        	.map((response: Response) => response.json());
    }
}