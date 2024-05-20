import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkyToggleSwitchModule } from '@skyux/forms';
import { SkyHelpInlineModule } from '@skyux/indicators';
import { SkyBoxModule } from '@skyux/layout';
import { Subject, takeUntil } from 'rxjs';
import { WeatherCard, WeatherForecast } from '../../Models/weatherforecast.model';

@Component({
  selector: 'app-weather-forecast-current-day',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    SkyBoxModule, SkyToggleSwitchModule, SkyHelpInlineModule,],
  templateUrl: './weather-forecast-current-day.component.html',
  styleUrl: './weather-forecast-current-day.component.css'
})
export class WeatherForecastCurrentDayComponent implements OnChanges, AfterContentInit, OnDestroy {
  @Input()
  forecast!: WeatherForecast;
  @Input()
  locationName!: string;
  @Output() onToggle = new EventEmitter<boolean>();
;

  protected numbersDailyWeather : number[] = [0,1,2,3,4,5,6];
  protected numbersCurrentWeather : number[] = [0,1,2,3];
  protected currentDay: string = '';
  protected currentTime: string = '';
  protected isDay: boolean = false;
  protected dailyDay: any[] = [];
  protected currentDayWeatherCard: WeatherCard[] = [
    {
      weathervatiable:'Wind',
      img: '',
      property: 'wind_speed_10m'
    },
    {
      weathervatiable:'Humidty',
      img: '',
      property: 'relative_humidity_2m'
    },
    {
      weathervatiable:'Pressure',
      img: '',
      property: 'surface_pressure'
    },
    {
      weathervatiable:'Rain',
      img: '',
      property: 'rain'
    }
  ];
  selectedImage: string;
  images: string[] = [
    '../../../assets/city1.jpg',
    '../../../assets/city2.avif',
    '../../../assets/city3.webp'
  ]

  #ngUnsubscribe = new Subject<void>();
  protected formGroup: FormGroup<
  {
    weatherViewToggle: FormControl<boolean | null>
  }>;
  protected title = 'Current Day Weather';

  constructor() {
    this.selectedImage = this.getRandomImage();

    this.formGroup = inject(FormBuilder).group({
      weatherViewToggle: new FormControl(false),
    });

    this.formGroup
      .get('weatherViewToggle')
      ?.valueChanges.pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe((value) => {
        this.onToggle.emit(value!);
      });
  }

  ngAfterContentInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.locationName === '') {
      this.locationName = 'Noida, India';
    }
    this.currentDay = new Date(this.forecast.data.current.time).toLocaleDateString('en-US', { weekday: 'long' });
    this.currentTime = this.convertTo12HourFormat(new Date(this.forecast.data.current.time).getHours());
    this.isDay = this.forecast.data.current.is_day == '1' ? true : false;
    this.dailyDay = this.forecast.data.daily.time.map( (time, index) => {
      const dayOfWeek: string = new Date(time).toLocaleDateString('en-US', { weekday: 'short' });
      return {
        day: dayOfWeek
      } ; 
    })
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }

  protected onToggleSwitchInlineclick(): void {
    alert("Toogle Inline Help Clicked")
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

  private getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    return this.images[randomIndex];
  }
}
