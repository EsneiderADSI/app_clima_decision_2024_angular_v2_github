import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-home',
  templateUrl: './map-home.page.html',
  styleUrls: ['./map-home.page.scss'],
})
export class MapHomePage implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v12';
  lat = 6.77253269951224; // Coordenadas del centro de Colombia
  lng = -73.57559150916143;
  stationIds = ['IVLEZ2', 'IARCAB1']; // Lista de IDs de estaciones
  apiKey = 'e4a38dcd474f4baea38dcd474febae4c'; // Reemplaza con tu API key de Weather Underground

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXNuZWlkZXIxMiIsImEiOiJjbGFhOXFvb24wMndyM3ZudXoxbmt0NGhmIn0.WqpXIfgTCT4mgjWf2RIkTg';
   }


  ngOnInit() {
  }

   ionViewDidEnter() {
    this.buildMap();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.map) {
      this.map.resize();
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'mapStation',
      style: this.style,
      zoom: 7,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.stationIds.forEach(stationId => {
        this.fetchStationData(stationId);
      });
    });
  }

  fetchStationData(stationId: string) {
    const url = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=e&apiKey=${this.apiKey}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        if (data && data.observations && data.observations.length > 0) {
          const observation = data.observations[0];
          const longitude = observation.lon;
          const latitude = observation.lat;

          if (!isNaN(longitude) && !isNaN(latitude)) {
            const lngLat: [number, number] = [longitude, latitude];
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              `Station ID: ${observation.stationID}`
            );

            new mapboxgl.Marker()
              .setLngLat(lngLat)
              .setPopup(popup)
              .addTo(this.map);
          } else {
            console.warn('Estación con coordenadas inválidas:', observation);
          }
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos de la estación', error);
      }
    });
  }

}
