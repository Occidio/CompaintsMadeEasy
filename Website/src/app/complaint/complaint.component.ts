import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Complaint, ComplaintDetails } from '../_models/index';
import { UserService, ComplaintService, AlertService } from '../_services/index';

@Component({
    selector: 'complaint-component',
    moduleId: module.id,
    templateUrl: 'complaint.component.html'
})

export class ComplaintComponent {
    currentUser: User;
    model: any = {};
    loading = false;
    marketingInfo: boolean;
    CompanyId:number;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private complaintService: ComplaintService,
        private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    continue(){
        // some shit here
    }

    public updateMarketingInfo(marketingInfo: any):void {
        this.marketingInfo = marketingInfo;
    }

    makeComplaint(){
        var complaintDetails = new ComplaintDetails();
        complaintDetails.marketingInfo = this.marketingInfo;
        complaintDetails.reason = this.model.complaint;
        var complaint = new Complaint();
        complaint.accountId = this.currentUser.accountId;
        complaint.companyId = 1;
        complaint.details = complaintDetails;
        this.complaintService.makeComplaint(complaint)
            .subscribe(
                data => {
                    this.alertService.success('Complaint made', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    
    uploadLogo(){
        var url = this.model.logoUrl;
    }
}