import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};

  oculto = 150;

  actores: Cast[] = [];

  slideOptsActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  existe = false;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private datalocalService: DataLocalService) { }

  ngOnInit() {

  this.datalocalService.existePelicula(this.id).then(existe => this.existe = (existe) ? true : false );
   

  this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      this.pelicula = resp;
    });
  this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      this.actores = resp.cast;
    });

  }

regresar() {
    this.modalCtrl.dismiss();
  }

favorito() {
    const existe = this.datalocalService.guardarPelicula(this.pelicula);
    this.existe = (existe) ? true : false;
  }

}
