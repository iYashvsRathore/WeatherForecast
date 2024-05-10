import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { SkyBoxModule } from '@skyux/layout';
import { SkyDataManagerService } from '@skyux/data-manager';

import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Hourly, HourlyWeather } from '../../Models/weatherforecast.model';
import { cellStyleRules } from '../../Models/weatherstyles.model'
import { SkyAgGridModule, SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-weather-forecast-hourly',
  standalone: true,
  templateUrl: './weather-forecast-hourly.component.html',
  styleUrl: './weather-forecast-hourly.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkyDataManagerService],
  imports: [CommonModule, SkyBoxModule, AgGridModule, SkyAgGridModule]
})
export class WeatherForecastHourlyComponent {
  @Input() hourlyWeatherData!: Hourly;

  protected gridData: HourlyWeather[] = [];
  protected gridOptions: GridOptions;
  protected noRowsTemplate = `<div class="sky-font-deemphasized">No results found.</div>`;
  protected themeClass = "ag-theme-quartz";
  protected pagination = true;
  protected paginationPageSize = 10;
  protected paginationPageSizeSelector = [10, 50, 100];

  #columnDefs: ColDef[] = [
    {
      field: 'time',
      headerName: 'time',
      type: SkyCellType.Text,
      hide: true,
      sort: 'asc',
      flex: 0 
    },
    {
      field: 'day_of_week',
      headerName: 'Day',
      type: SkyCellType.Text,
      flex: 1 
    },
    {
      field: 'hour',
      headerName: 'Time',
      type: SkyCellType.Autocomplete,
      sort: 'asc',
      flex: 1 
    },
    {
      field: 'temperature_2m',
      headerName: 'Temp (°C)',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 1,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColorCool']};
        }
        return backgroundColor;
      },
    },
    {
      field: 'apparent_temperature',
      headerName: 'Apparent Temp (°C)',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 2,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColorCool']};
        }
        return backgroundColor;
      },
    },
    {
      field: 'precipitation',
      headerName: 'Precipitation',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + ' mm',
      flex: 2 
    },
    {
      field: 'precipitation_probability',
      headerName: 'Precipitation Probability',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + ' %',
      flex: 2 
    },
    {
      field: 'relative_humidity_2m',
      headerName: 'Relative Humidity',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + ' %',
      flex: 2
    },
  ];

  #gridApi: GridApi | undefined;

  readonly #agGridSvc = inject(SkyAgGridService);

  constructor() {
    const gridOptions: GridOptions = {
      columnDefs: this.#columnDefs,
      onGridReady: (gridReadyEvent): void => this.onGridReady(gridReadyEvent),
      rowSelection: 'single',
    };

    this.gridOptions = this.#agGridSvc.getGridOptions({
      gridOptions,
    });
  }

  ngAfterContentInit(): void {
    console.log(this.hourlyWeatherData);
    this.gridData = this.hourlyWeatherData.time.map<HourlyWeather>((time, index) => {
      const date = new Date(time);
      const dayOfWeek: string = date.toLocaleDateString('en-US', { weekday: 'long' });
      const hour = this.convertTo12HourFormat(date.getHours());
      return {
        time: time,
        hour: hour,
        day_of_week: dayOfWeek,
        temperature_2m: this.hourlyWeatherData.temperature_2m[index],
        apparent_temperature: this.hourlyWeatherData.apparent_temperature[index],
        precipitation: this.hourlyWeatherData.precipitation[index],
        precipitation_probability: this.hourlyWeatherData.precipitation_probability[index],
        relative_humidity_2m: this.hourlyWeatherData.relative_humidity_2m[index]
      }
    });
    console.log(this.gridData);
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.#gridApi = gridReadyEvent.api;
    this.#gridApi.sizeColumnsToFit();
  }

  private convertTo12HourFormat(hour: number): string {
    if (hour === 0) {
      return '12 AM';
    } else if (hour === 12) {
      return '12 PM';
    } else if (hour < 12) {
      return hour + ' AM';
    } else {
      return (hour - 12) + ' PM';
    }
  }

}
