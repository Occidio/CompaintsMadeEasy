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
    CompanyId:number;
    marketingInfo: boolean = false;
    isMarketingInfoHidden: boolean = true;

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

    continue() {
        // some shit here
    }

    public updateMarketingInfo(marketingInfo: any): void {
        this.marketingInfo = marketingInfo;
    }

    showMarketingInfo() {
        if(this.isMarketingInfoHidden){
            this.isMarketingInfoHidden = false;
            return false;
        }
        return true;
    }

    makeComplaint() {
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
        let url = this.model.logoUrl;
        
        this.complaintService.uploadLogo(url)
            .subscribe(
                data=>{
                    console.log(data);
                    if(!data.IsErroredOnProcessing){
                        let lines = data.ParsedResults[0].TextOverlay.Lines;
                        this.model.words = lines.map(element => element.Words[0].WordText);
                    }
                },error=>{
                    console.log(error);
                });
    }
}