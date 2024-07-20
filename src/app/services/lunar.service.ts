import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LunarService {
  private apiUrl = 'https://www.icalendar37.net/lunar/api/';

  constructor(private http: HttpClient) { }

  getLunarPhases(month: number, year: number): Observable<any> {
    const configMoon: Record<string, any> = {
      month: month,
      year: year,
      lightColor: "rgb(255,255,100)",
      shadeColor: "black",
      LDZ: new Date(year, month - 1, 1).getTime() / 1000
    };
    let params = new URLSearchParams();
    for (let key in configMoon) {
      params.set(key, configMoon[key]);
    }
    const url = `${this.apiUrl}?${params.toString()}`;
    return this.http.get(url);
  }

}
