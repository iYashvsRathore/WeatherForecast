import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastBoxComponent } from './weather-forecast.component';

describe('WeatherForecastBoxComponent', () => {
  let component: WeatherForecastBoxComponent;
  let fixture: ComponentFixture<WeatherForecastBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
