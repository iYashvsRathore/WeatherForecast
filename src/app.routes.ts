import { Routes } from '@angular/router';
import { WeatherForecastBoxComponent } from './app/Components/weather-forecast/weather-forecast.component';

export const routes: Routes = [
    { path: 'weatherforecast', component: WeatherForecastBoxComponent },
    { path: '', redirectTo: 'weatherforecast', pathMatch: 'full' },
    { path: '**', redirectTo: 'weatherforecast' },
];
