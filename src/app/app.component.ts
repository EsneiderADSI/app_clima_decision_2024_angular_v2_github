import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private databaseService: DatabaseService
  ) {

  }

  ngOnInit(): void {
    this.databaseService.getPersonas(1, 2);

  }


}
