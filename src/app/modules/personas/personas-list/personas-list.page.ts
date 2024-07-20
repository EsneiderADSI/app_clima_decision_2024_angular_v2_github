import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.page.html',
  styleUrls: ['./personas-list.page.scss'],
})
export class PersonasListPage implements OnInit {
  pageName: string = 'Lista de Personas';
  personas: any[] = [];

  pruebaArray = Array.from({length: 5}, (_, i) => i + 1); // para prueba de listas

  constructor(
    private databaseService: DatabaseService,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    this.personas = await this.databaseService.getPersonas(1,10);
  }

  personasCreatePage() {
    this.navCtrl.navigateForward('/tabs/personas-add');
  }

}
