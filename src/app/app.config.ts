import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
     provideRouter(routes),
      provideAnimationsAsync(),
       provideFirebaseApp(() => initializeApp({
        "projectId":"ring-of-fire-76701",
        "appId":"1:296498438133:web:d1c391ed26d598d4808abc",
        "storageBucket":"ring-of-fire-76701.appspot.com",
        "apiKey":"AIzaSyB06ImAMiG8FO7Vm7kiu0LokM5r6FRhiTk",
        "authDomain":"ring-of-fire-76701.firebaseapp.com",
        "messagingSenderId":"296498438133",
        "measurementId":"G-LM9W4RDYSE"})), provideFirestore(() => getFirestore())]
};
