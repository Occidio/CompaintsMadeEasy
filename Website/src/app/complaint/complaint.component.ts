import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector: 'complaint-component',
    moduleId: module.id,
    templateUrl: 'complaint.component.html'
})

export class ComplaintComponent {
    currentUser: User;
    model: any = {};
    loading = false;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    continue(){
        // some shit here
    }
}