import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];

  populares: Pelicula[] = [];

  slideoptionsPosterPares: any = {
    slidesPerView: 3.3,
    freeMode: true,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    spaceBetween: -8
  };
  

  constructor(private moviesService: MoviesService) {}


  ngOnInit() {
    this.moviesService.getFeatures().subscribe(resp => {
      this.peliculasRecientes = resp.results;
    
    });

 
    this.getPopulares();

    }

    cargarMas() {

      this.getPopulares();

    }

    getPopulares() {

      this.moviesService.getPopulares().subscribe(resp => {

        const arrTemp = [...this.populares, ...resp.results];
        
        this.populares = arrTemp;

        

      });
  

    }

}
