import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastSearchComponent } from './weather-forecast-search.component';

describe('WeatherForecastSearchComponent', () => {
  let component: WeatherForecastSearchComponent;
  let fixture: ComponentFixture<WeatherForecastSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherForecastSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
