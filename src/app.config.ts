import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { environment } from './enviornment.dev';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './app/Interceptor/BaseURLInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    {provide:'BASE_API_URL', useValue: environment.apiUrl}, 
    { provide: HTTP_INTERCEPTORS,  useClass: BaseUrlInterceptor, multi: true }
  ]
};
