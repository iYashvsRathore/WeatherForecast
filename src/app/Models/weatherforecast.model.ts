export class WeatherForecast {
  constructor() {
    this.success = false;
    this.statusCode = 200;
    this.data = new Data();
    this.errorMessage = "";

  }
  success: boolean
  statusCode: number
  data: Data
  errorMessage: string
}

export class Data {
  constructor() {
    this.latitude = 0.00;
    this.longitude = 0.00;
    this.generationtime_ms = 0;
    this.utc_offset_seconds = 0;
    this.timezone = "";
    this.timezone_abbreviation = "";
    this.elevation = 0;
    this.current_units = new CurrentUnits();
    this.current = new Current();
    this.hourly_units = new HourlyUnits();
    this.hourly = new Hourly();
    this.daily_units = new DailyUnits();
    this.daily = new Daily();
  }

  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export class CurrentUnits {
  constructor() {
    this.time = "";
    this.interval = "";
    this.temperature_2m = "";
    this.relative_humidity_2m = "";
    this.apparent_temperature = "";
    this.precipitation = "";
  }
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  precipitation: string
}

export class Current {
  constructor() {
    this.time = "";
    this.interval = 0;
    this.temperature_2m = 0;
    this.relative_humidity_2m = 0;
    this.apparent_temperature = 0;
    this.precipitation = 0;
    this.rain = 0;
    this.is_day = '';
    this.wind_speed_10m = 0;
    this.surface_pressure = 0;
  }
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  precipitation: number
  rain: number
  is_day: string
  wind_speed_10m: number
  surface_pressure: number
}

export class HourlyUnits {
  constructor() {
    this.time = "";
    this.temperature_2m = "";
    this.relative_humidity_2m = "";
    this.apparent_temperature = "";
    this.precipitation = "";
    this.precipitation_probability = "";
  }
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  precipitation: string
  precipitation_probability: string
}

export class Hourly {
  constructor() {
    this.time = [];
    this.temperature_2m = []
    this.relative_humidity_2m = []
    this.apparent_temperature = []
    this.precipitation = []
    this.precipitation_probability = []
  }
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  apparent_temperature: number[]
  precipitation: number[]
  precipitation_probability: number[]
}

export class DailyUnits {
  constructor() {
    this.time = "";
    this.temperature_2m_max = "";
    this.temperature_2m_min = "";
    this.apparent_temperature_max = "";
    this.apparent_temperature_min = "";
    this.precipitation_probability_max = "";
  }
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  apparent_temperature_max: string
  apparent_temperature_min: string
  precipitation_probability_max: string
}

export class Daily {
  constructor() {
    this.time = [];
    this.temperature_2m_max = []
    this.temperature_2m_min = []
    this.apparent_temperature_max = []
    this.apparent_temperature_min = []
    this.precipitation_probability_max = []
  }

  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  precipitation_probability_max: number[]
}

export interface DailyWeather {
  time: string,
  day_of_week: string,
  temperature_2m_max: number,
  temperature_2m_min: number,
  apparent_temperature_max: number,
  apparent_temperature_min: number,
  precipitation_probability_max: number
}

export interface HourlyWeather {
  time: string,
  hour: string,
  day_of_week: string,
  temperature_2m: number,
  apparent_temperature: number,
  precipitation: number,
  precipitation_probability: number,
  relative_humidity_2m: number
}

export interface WeatherCard {
  weathervatiable: string
  img: string,
  property: string
}