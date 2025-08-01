import { Piso12Zona4Component } from './components/piso12-zona4/piso12-zona4.component';
import { Piso19Zona1Component } from './components/piso19-zona1/piso19-zona1.component';
import { Piso19Zona2Component } from './components/piso19-zona2/piso19-zona2.component';
import { Piso19Zona3Component } from './components/piso19-zona3/piso19-zona3.component';
import { Piso19Zona4Component } from './components/piso19-zona4/piso19-zona4.component';
import { Piso12Zona1Component } from './components/piso12-zona1/piso12-zona1.component';
import { Piso12Zona2Component } from './components/piso12-zona2/piso12-zona2.component';
import { Piso12Zona3Component } from './components/piso12-zona3/piso12-zona3.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaZonasComponent } from './components/mapa-zonas/mapa-zonas.component';
import { Zona1Component } from './components/zona1/zona1.component';
import { Zona2Component } from './components/zona2/zona2.component';
import { Zona3Component } from './components/zona3/zona3.component';
import { LoginComponent } from './components/login/login.component';
import { Piso19Component } from './components/piso19/piso19.component';
import { Piso12Component } from './components/piso12/piso12.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MapaZonasComponent,
    Zona1Component,
    Zona2Component,
    Zona3Component,
    LoginComponent,
    Piso19Component,
    Piso12Component,
    Piso19Zona1Component,
    Piso19Zona2Component,
    Piso19Zona3Component,
    Piso12Zona1Component,
    Piso12Zona2Component,
    Piso12Zona3Component,
    Piso12Zona4Component,
    Piso19Zona4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }