import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';

import { SkyBoxModule } from '@skyux/layout';
import { SkyAgGridModule, SkyAgGridService, SkyCellType } from '@skyux/ag-grid';
import { SkyDataManagerService } from '@skyux/data-manager';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, ValueFormatterParams, } from 'ag-grid-community';
import { Daily, DailyWeather } from '../../Models/weatherforecast.model';
import { of } from 'rxjs';
import { cellStyleRules } from '../../Models/weatherstyles.model';

@Component({
  selector: 'app-weather-forecast-daily',
  standalone: true,
  templateUrl: './weather-forecast-daily.component.html',
  styleUrl: './weather-forecast-daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkyDataManagerService],
  imports: [CommonModule, SkyBoxModule, AgGridModule, SkyAgGridModule]
})
export class WeatherForecastDailyComponent implements AfterContentInit {
  @Input() dailyWeatherData!: Daily;

  protected gridData: DailyWeather[] = [];
  protected gridOptions: GridOptions;
  protected noRowsTemplate = `<div class="sky-font-deemphasized">No results found.</div>`;
  protected themeClass = "ag-theme-quartz";
  protected pagination = true;
  protected paginationPageSize = 10;
  protected paginationPageSizeSelector = [10, 50, 100];
  

  #columnDefs: ColDef[] = [
    {
      field: 'time',
      headerName: 'Day',
      type: SkyCellType.Autocomplete,
      hide: true,
      sort: 'asc',
      flex: 1
    },
    {
      field: 'day_of_week',
      headerName: 'Day',
      type: SkyCellType.Autocomplete,
      flex: 1,
      width: 5
    },
    {
      field: 'temperature_2m_max',
      headerName: `Max Temp (°C)`,
      type: SkyCellType.Number,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColoeCool']};
        }
        return backgroundColor;
      },
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 1
    },
    {
      field: 'temperature_2m_min',
      headerName: 'Min Temp (°C)',
      type: SkyCellType.Number,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColorCool']};
        }
        return backgroundColor;
      },
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 1
    },
    {
      field: 'apparent_temperature_max',
      headerName: 'Max Apparent Temp (°C)',
      type: SkyCellType.Number,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColorCool']};
        }
        return backgroundColor;
      },
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 2
    },
    {
      field: 'apparent_temperature_min',
      headerName: 'Min Apparent Temp (°C)',
      type: SkyCellType.Number,
      cellStyle: (params) => {
        let backgroundColor = {};
        if (params.value >= 25) { 
          backgroundColor = {'background-color': cellStyleRules['backgroundColorHot']}; 
        } else {
          backgroundColor = {'background-color': cellStyleRules['backgroundColorCool']};
        }
        return backgroundColor;
      },
      valueFormatter: p => p.value.toLocaleString() + ' °C',
      flex: 2
    },
    {
      field: 'precipitation_probability_max',
      headerName: 'Max Precipitation Probability',
      type: SkyCellType.Number,
      valueFormatter: p => p.value.toLocaleString() + '%',
      flex: 4
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
    this.gridData = this.dailyWeatherData.time.map<DailyWeather>((time, index) => {
      // const date: Date = new Date(time);
      const dayOfWeek: string = new Date(time).toLocaleDateString('en-US', { weekday: 'long' });
      return {
        time: time,
        day_of_week: dayOfWeek,
        temperature_2m_max: this.dailyWeatherData.temperature_2m_max[index],
        temperature_2m_min: this.dailyWeatherData.temperature_2m_min[index],
        apparent_temperature_max: this.dailyWeatherData.apparent_temperature_max[index],
        apparent_temperature_min: this.dailyWeatherData.apparent_temperature_min[index],
        precipitation_probability_max: this.dailyWeatherData.precipitation_probability_max[index]
      }
    });
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.#gridApi = gridReadyEvent.api;
    this.#gridApi.sizeColumnsToFit();
  }

}

