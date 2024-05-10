import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastDailyComponent } from './weather-forecast-daily.component';

describe('WeatherForecastDailyComponent', () => {
  let component: WeatherForecastDailyComponent;
  let fixture: ComponentFixture<WeatherForecastDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
