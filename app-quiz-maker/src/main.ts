import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';


const routes:Routes=[
  {
    path: '',
    loadChildren: ()=> import('./app/routes/quiz-maker-route')
}

]
bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule), provideRouter(routes, withComponentInputBinding())],
    
})
  .catch(err => console.error(err));