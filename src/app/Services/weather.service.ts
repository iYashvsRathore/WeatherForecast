import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherForecastRequest } from '../Models/weatherforeccastrequest.model';
import { WeatherForecast } from '../Models/weatherforecast.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getForecastsByCityName(request: WeatherForecastRequest) : Observable<WeatherForecast> {
    const queryparam: string = `/WeatherForecast?LocationName=${request.cityName}&StartDate=${request.startDate}&EndDate=${request.endDate}&TempratureUnit=${request.tempratureUnit}&PrecipitationUnit=${request.precipitationUnit}&TimeFormat=${request.timeFormatUnit}`; 
    return this.http.get<WeatherForecast>(`${queryparam}`);
  }

  public getForecastsByLatLong(latitude: number, longitude: number): Observable<WeatherForecast> {
    const queryparam: string = `/WeatherForecast?Latitude=${latitude}&Longitude=${longitude}`;
    return this.http.get<WeatherForecast>(`${queryparam}`);
  }
}
