import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  // tslint:disable-next-line: no-output-native
  @Output() load = new EventEmitter<boolean>();


  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  };

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
