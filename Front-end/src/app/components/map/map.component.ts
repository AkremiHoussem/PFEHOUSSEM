import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: { name: string; lat: number; lng: number; marker?: L.Marker }[] = [
    { name: "Hôpital La Rabta", lat: 36.8065, lng: 10.1815 },
    { name: "Hôpital Charles Nicolle", lat: 36.8111, lng: 10.1766 },
    { name: "Hôpital Militaire", lat: 36.8190, lng: 10.1660 },
    { name: "Hôpital Mongi Slim", lat: 36.8786, lng: 10.3243 },
    { name: "Hôpital Farhat Hached", lat: 35.8256, lng: 10.6346 }
  ];

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 10); // Centré sur Tunis

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter des marqueurs pour chaque hôpital
    this.markers.forEach(hospital => {
      hospital.marker = L.marker([hospital.lat, hospital.lng]).addTo(this.map)
          .bindPopup(hospital.name);
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  // Fonction de recherche
  searchHospital(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    const hospital = this.markers.find(h => h.name.toLowerCase().includes(searchText));

    if (hospital && hospital.marker) {
      this.map.setView([hospital.lat, hospital.lng], 14);
      hospital.marker.openPopup();
    }
  }
}
