import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastCurrentDayComponent } from './weather-forecast-current-day.component';

describe('WeatherForecastCurrentDayComponent', () => {
  let component: WeatherForecastCurrentDayComponent;
  let fixture: ComponentFixture<WeatherForecastCurrentDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastCurrentDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastCurrentDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
