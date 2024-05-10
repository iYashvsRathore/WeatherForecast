import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { WeatherForecast } from '../../Models/weatherforecast.model';
import { WeatherForecastRequest } from '../../Models/weatherforeccastrequest.model';
import { WeatherForecastSearchComponent } from '../weather-forecast-search/weather-forecast-search.component';

import { SkyBackToTopModule, SkyBoxModule } from '@skyux/layout';
import { SkyHelpInlineModule, SkyWaitModule } from '@skyux/indicators';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import { SkyToggleSwitchModule } from '@skyux/forms';
import { WeatherForecastCurrentDayComponent } from '../weather-forecast-current-day/weather-forecast-current-day.component';
import { WeatherForecastDailyComponent } from '../weather-forecast-daily/weather-forecast-daily.component';
import { WeatherForecastHourlyComponent } from '../weather-forecast-hourly/weather-forecast-hourly.component';
import { WeatherService } from '../../Services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,
            SkyBoxModule, SkyBackToTopModule, SkyWaitModule, SkyToggleSwitchModule, SkyHelpInlineModule,
            WeatherForecastSearchComponent, WeatherForecastCurrentDayComponent,WeatherForecastDailyComponent, WeatherForecastHourlyComponent],
  providers: [WeatherService],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastBoxComponent implements OnInit, OnDestroy {
  @ViewChild('weatherDataSection' , { static: false }) weatherDataSection: ElementRef | undefined;

  
  protected title = 'WeatherForecast';
  protected forecasts: WeatherForecast = new WeatherForecast();
  protected cityName: string = "";
  protected latitude: number = 0;
  protected longitude: number = 0;
  protected isWaiting: boolean = false;
  protected loadComponent: boolean = false;
  protected loadHourlyComponent = false;
  protected toastTimeout: any[] = [];
  protected request: WeatherForecastRequest = {
    cityName: '',
    startDate: '',
    endDate: '',
    tempratureUnit: '',
    precipitationUnit: '',
    timeFormatUnit: ''
  }

  readonly #toastSvc = inject(SkyToastService);

  constructor(private weatherService: WeatherService) { 
    
  }

  ngOnDestroy(): void {
    this.toastTimeout.map(t => t.clearTimeout());
  }

  ngOnInit() {
    this.cityName = this.request.cityName!;
    this.getLocation();
  }

  protected getForecastsByCityName(request: WeatherForecastRequest) {
    this.isWaiting = true;
    this.weatherService.getForecastsByCityName(request).subscribe(
      (result) => {
        this.forecasts = result;
        this.isWaiting = false;
        this.loadComponent = true;
        this.openToast(`Weather Data fetched by city name: ${this.request.cityName}`, SkyToastType.Success);
        this.scrollIntoView();
        console.log(this.forecasts);
      },
      (error) => {
        this.isWaiting = false;
        this.loadComponent = false;
        this.openToast(`Error: ${error.message}`, SkyToastType.Danger);
      }
    );
  }

  protected getForecastsByLatLong() {
    this.isWaiting = true;
    this.weatherService.getForecastsByLatLong(this.latitude, this.longitude).subscribe(
      (result) => {
        this.forecasts = result;
        this.isWaiting = false;
        this.loadComponent = true;
        this.openToast(`Weather Data Fetched by users current Geolocation`, SkyToastType.Success);
        this.scrollIntoView();
        console.log(this.forecasts);
      },
      (error) => {
        this.isWaiting = false;
        this.loadComponent = false;
        this.openToast(`Error: ${error.message}`, SkyToastType.Danger);
      }
    );
  }

  protected scrollIntoView() {
    if (this.weatherDataSection) {
      this.weatherDataSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  protected onWeatherSearch(searchData: WeatherForecastRequest): void {
    this.isWaiting = true;
    this.loadComponent = false;
    this.request = searchData;
    this.cityName = this.request.cityName!;
    this.getForecastsByCityName(this.request!)
  }

  protected onWeatherReset(reset: boolean): void {
    this.loadComponent = false;
  }

  protected getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.isWaiting = true;
          this.getForecastsByLatLong();
        }
      },
        (error) => {
          this.isWaiting = false;
          this.openToast(`Error: ${error.message}`, SkyToastType.Danger)
        });
    } else {
      this.openToast(`Geolocation is not supported by this browser.`, SkyToastType.Danger)
    }
  }

  protected openToast(message: string, toastType:SkyToastType): void {
    this.#toastSvc.openMessage(`${message}`, {
      type: toastType,
    });

    let timeout = setTimeout(() => {
      this.#toastSvc.closeAll();
    }, 6000);

    this.toastTimeout.push(timeout);
  }

  protected onHourlyToggle(data: boolean): void {
    this.loadHourlyComponent = data;
  }
}
