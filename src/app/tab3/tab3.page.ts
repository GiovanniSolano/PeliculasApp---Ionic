import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];

  generos: Genre[] = [];

  favoritosPorGenero: any[] = [];

  constructor(private dataLocal: DataLocalService, 
              private moviesService: MoviesService,
              private modalCtrl: ModalController,) {}

  ionViewWillEnter() {

    this.cargarDatos();


  }

    async cargarDatos() {

      
    this.peliculas = await this.dataLocal.cargarFavoritos();
    
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero(this.generos, this.peliculas);



    }

  





  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {


    this.favoritosPorGenero = [];

    generos.forEach(genero => {


      this.favoritosPorGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });

    });
    
}
}
