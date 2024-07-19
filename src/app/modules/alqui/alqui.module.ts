import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlquiRoutingModule } from './alqui-routing.module';
import { AlquiPagesComponent } from './pages/alqui-pages/alqui-pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlquiPagesComponent
  ],
  imports: [
    CommonModule,
    AlquiRoutingModule,
    SharedModule,
    FormsModule, 
  ]
})
export class AlquiModule { }
