import { Piso12Zona4Component } from './components/piso12-zona4/piso12-zona4.component';
import { Piso19Zona1Component } from './components/piso19-zona1/piso19-zona1.component';
import { Piso19Zona2Component } from './components/piso19-zona2/piso19-zona2.component';
import { Piso19Zona3Component } from './components/piso19-zona3/piso19-zona3.component';
import { Piso19Zona4Component } from './components/piso19-zona4/piso19-zona4.component';
import { Piso12Zona1Component } from './components/piso12-zona1/piso12-zona1.component';
import { Piso12Zona2Component } from './components/piso12-zona2/piso12-zona2.component';
import { Piso12Zona3Component } from './components/piso12-zona3/piso12-zona3.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaZonasComponent } from './components/mapa-zonas/mapa-zonas.component';
import { Zona1Component } from './components/zona1/zona1.component';
import { Zona2Component } from './components/zona2/zona2.component';
import { Zona3Component } from './components/zona3/zona3.component';
import { LoginComponent } from './components/login/login.component';
import { Piso19Component } from './components/piso19/piso19.component';
import { Piso12Component } from './components/piso12/piso12.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mapa-zonas', component: MapaZonasComponent },
  { path: 'zona1', component: Zona1Component },
  { path: 'zona2', component: Zona2Component },
  { path: 'zona3', component: Zona3Component },
  { path: 'piso19', component: Piso19Component },
  { path: 'piso19-zona1', component: Piso19Zona1Component },
  { path: 'piso19-zona2', component: Piso19Zona2Component },
  { path: 'piso19-zona3', component: Piso19Zona3Component },
  { path: 'piso12', component: Piso12Component },
  { path: 'piso12-zona1', component: Piso12Zona1Component },
  { path: 'piso12-zona2', component: Piso12Zona2Component },
  { path: 'piso12-zona3', component: Piso12Zona3Component },
  { path: 'piso12-zona4', component: Piso12Zona4Component },
  { path: 'piso19-zona4', component: Piso19Zona4Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }