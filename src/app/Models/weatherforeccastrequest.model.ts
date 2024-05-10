export interface WeatherForecastRequest {
    cityName: string | null;
    startDate: string | null;
    endDate: string | null;
    tempratureUnit: string | null;
    precipitationUnit: string | null;
    timeFormatUnit: string | null;
  }

 export interface RadioButtonItem {
    name: string;
    value: string;
    disabled: boolean;
  }