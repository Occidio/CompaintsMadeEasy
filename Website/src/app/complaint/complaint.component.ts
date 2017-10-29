import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/index';
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

    makeComplaint(user){
        this.complaintService.makeComplaint(user)
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
}