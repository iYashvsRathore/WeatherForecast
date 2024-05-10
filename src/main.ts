import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/Components/app-component/app.component';
import { appConfig } from './app.config';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
