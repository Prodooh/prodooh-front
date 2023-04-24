import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  columns: string[] = [
    'id','name', 'surnames', 'email', 'buttons'
  ];

}
