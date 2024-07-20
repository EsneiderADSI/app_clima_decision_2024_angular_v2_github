import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-ideam',
  templateUrl: './map-ideam.page.html',
  styleUrls: ['./map-ideam.page.scss'],
})
export class MapIdeamPage implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-streets-v12';
  lat = 6.77253269951224; // Coordenadas del centro de Colombia
  lng = -73.57559150916143;
  apiUrl = 'https://www.datos.gov.co/resource/hp9r-jxuu.json';
  // apiUrl = 'https://www.datos.gov.co/resource/hp9r-jxuu.json';

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXNuZWlkZXIxMiIsImEiOiJjbGFhOXFvb24wMndyM3ZudXoxbmt0NGhmIn0.WqpXIfgTCT4mgjWf2RIkTg'; // Reemplaza con tu token de MapBox
  }

  ngOnInit() {
    // this.buildMap();
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
      container: 'map',
      style: this.style,
      zoom: 7,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.http.get(this.apiUrl).subscribe({
        next: (data: any) => {
          console.log('Datos recibidos de la API:', data);

          // Filtrar los datos para mostrar solo aquellos donde estado = "Activo" y departamento = "Santander"
          const filteredData = data.filter((station: { estado: string; departamento: string; }) =>
            station.estado === 'Activa' && station.departamento === 'Santander'
          );

          // Limitar el número de puntos a 10 para pruebas
          const limitedData = filteredData.slice(0, 20);

          limitedData.forEach((station: { nombre: any; departamento: any; ubicaci_n: { longitude: string; latitude: string; }; }) => {
            // Convertir coordenadas a número y asegurarse de que están en el formato [lng, lat]
            const longitude = parseFloat(station.ubicaci_n.longitude);
            const latitude = parseFloat(station.ubicaci_n.latitude);

            // Verificar que las coordenadas sean válidas
            if (!isNaN(longitude) && !isNaN(latitude)) {
              const lngLat: [number, number] = [longitude, latitude];
              const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                `${station.nombre} - ${station.departamento}`
              );

              new mapboxgl.Marker()
                .setLngLat(lngLat)
                .setPopup(popup)
                .addTo(this.map);
            } else {
              console.warn('Estación con coordenadas inválidas:', station);
            }
          });
        },
        error: (error) => {
          console.error('Error al obtener los datos de la API', error);
        }
      });
    });
  }
}
