import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -8
  };

  // tslint:disable-next-line: no-output-native
  @Output() load = new EventEmitter<boolean>();


  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}


  
  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.onDidDismiss().then(data => {
      this.load.emit(true);
    });

    modal.present();

  }
}
