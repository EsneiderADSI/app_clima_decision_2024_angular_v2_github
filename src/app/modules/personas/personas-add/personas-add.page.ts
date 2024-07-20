import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-personas-add',
  templateUrl: './personas-add.page.html',
  styleUrls: ['./personas-add.page.scss'],
})
export class PersonasAddPage implements OnInit {


  persona = {
    nombre: '',
    descripcion: '',
    departamento: '',
    municipio: '',
    vereda: '',
    propietario: '',
    latitude: '',
    longitude: '',
    area_finca: '',
    unidad_area: 'Ha',
    num_plantas: '',
    edad_cultivo: '',
    tipo_fecha: 'Días',
    tipo_manejo: 'Tecnificado',
    user_id: ''
  };

  constructor(
    private db: DatabaseService,
    private router: Router,
    private toastController: ToastController,
  ) { }


  async addPersona() {
    // Validar si los campos están vacíos
    if (!this.persona.nombre || !this.persona.departamento || !this.persona.municipio || !this.persona.vereda) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000, // Duración del toast en milisegundos
        color: 'warning' // Color del toast
      });
      await toast.present();
      return;
    }

    try {
      await this.db.createPersona(this.persona);
      const toast = await this.toastController.create({
        message: 'La persona ha sido registrado correctamente.',
        duration: 2000, // Duración del toast en milisegundos
        color: 'success' // Color del toast
      });
      await toast.present();
      this.router.navigate(['/tabs/personas-list']);
      // this.router.navigate(['/tabs/fincas']);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
  }

}
