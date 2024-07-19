import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlquiPagesComponent } from './pages/alqui-pages/alqui-pages.component';

const routes: Routes = [
  {
    path: '',
  component: AlquiPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlquiRoutingModule { }
