import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  buscando = false;
  ideas: string[] = ['Spiderman', 'Avanger', 'Joker', 'Glass'];

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}


  buscar(event) {

    const valor = event.detail.value;

    if(valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;

    this.moviesService.BuscarPeliulas(valor).subscribe(resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });

  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
