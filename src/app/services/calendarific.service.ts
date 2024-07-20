import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarificService {
  private apiKey = 'SWlqMRtIJOaphaLEfaW7HiASR5Pir9CO'; // Reemplaza esto con tu clave API de Calendarific
  private apiUrl = 'https://calendarific.com/api/v2';

  constructor(private http: HttpClient) { }


  getLunarPhases(year: number, month: number): Observable<any> {
    const url = `${this.apiUrl}/holidays?api_key=${this.apiKey}&country=US&year=${year}&month=${month}`;
    return this.http.get(url);
  }
}
