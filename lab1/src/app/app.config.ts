import {
  ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './env';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig));
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
  ]
};
