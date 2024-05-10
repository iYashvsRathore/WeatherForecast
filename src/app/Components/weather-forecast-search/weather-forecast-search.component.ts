import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SkyDatepickerModule } from '@skyux/datetime';
import { SkyInputBoxModule, SkyRadioModule, SkyToggleSwitchModule } from '@skyux/forms';
import { SkyHelpInlineModule } from '@skyux/indicators';
import { SkyBoxModule, SkyFluidGridModule } from '@skyux/layout';
import { RadioButtonItem, WeatherForecastRequest } from '../../Models/weatherforeccastrequest.model';



@Component({
  selector: 'app-weather-forecast-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SkyBoxModule,
    SkyInputBoxModule, SkyFluidGridModule, SkyDatepickerModule, SkyRadioModule],
  providers: [DatePipe],
  templateUrl: './weather-forecast-search.component.html',
  styleUrl: './weather-forecast-search.component.css'
})
export class WeatherForecastSearchComponent implements OnDestroy {
  @Output() onWeatherSearch = new EventEmitter<WeatherForecastRequest>();
  @Output() onWeatherReset = new EventEmitter<boolean>();

  protected tempratureUnits: RadioButtonItem[] = [
    { name: 'Celsius (°C)', value: 'celsius', disabled: false },
    { name: 'Fahrenheit (°F)', value: 'fahrenheit', disabled: false },
  ];

  protected precipitationUnits: RadioButtonItem[] = [
    { name: 'Millimeter', value: 'mm', disabled: false },
    { name: 'Inch', value: 'inch', disabled: false },
  ];

  protected timeFormatUnits: RadioButtonItem[] = [
    { name: 'ISO 8601', value: 'iso8601', disabled: false },
    { name: 'Unix Timestamp', value: 'unix', disabled: false },
  ];

  protected formGroup: FormGroup<{
    cityName: FormControl<string | null>;
    startDate: FormControl<string | null>;
    endDate: FormControl<string | null>;
    selectedTempratureUnit: FormControl<string | null>;
    selectedPrecipitationUnits: FormControl<string | null>;
    selectedTimeFormatUnits: FormControl<string | null>;
  }>;

  request: WeatherForecastRequest = {
    cityName: '',
    startDate: '',
    endDate: '',
    tempratureUnit: '',
    precipitationUnit: '',
    timeFormatUnit: ''
  }

  constructor(private datePipe: DatePipe) {
    this.formGroup = inject(FormBuilder).group({
      cityName: new FormControl('Noida, India', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      selectedTempratureUnit: this.tempratureUnits[0].value,
      selectedPrecipitationUnits: this.precipitationUnits[0].value,
      selectedTimeFormatUnits: this.timeFormatUnits[0].value
    });
  }

  ngOnDestroy(): void {
    
  }

  protected onSearch(): void {
    this.request.cityName = this.formGroup.value.cityName!;
    this.request.startDate = this.formGroup.value.startDate!;
    this.request.endDate = this.formGroup.value.endDate ? this.datePipe.transform(this.formGroup.value.endDate, 'yyyy-MM-dd') : this.formGroup.value.endDate!;
    this.request.tempratureUnit = this.formGroup.value.selectedTempratureUnit!;
    this.request.precipitationUnit = this.formGroup.value.selectedPrecipitationUnits!;
    this.request.timeFormatUnit = this.formGroup.value.selectedTimeFormatUnits!;

    this.onWeatherSearch.emit(this.request);
  }

  protected onReset(): void {
    this.formGroup.value.cityName = '';
    this.formGroup.value.startDate = '';
    this.formGroup.value.endDate = '';
    this.formGroup.value.selectedTempratureUnit = this.tempratureUnits[0].value;
    this.formGroup.value.selectedPrecipitationUnits = this.precipitationUnits[0].value;
    this.formGroup.value.selectedTimeFormatUnits = this.timeFormatUnits[0].value;
    this.onWeatherReset.emit(true);
  }

}