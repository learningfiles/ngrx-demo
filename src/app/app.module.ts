import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { appReducers as appReducers } from './app-state/app.state';
import { AppComponent } from './app.component';
import { AuthEffects } from './auth/state/auth.effects';
import { authReducer } from './auth/state/auth.reducer';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { sharedReducer } from './shared/state/shared.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mod
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
