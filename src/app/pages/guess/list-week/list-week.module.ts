import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWeekPageRoutingModule } from './list-week-routing.module';

import { ListWeekPage } from './list-week.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWeekPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ListWeekPage],
})
export class ListWeekPageModule {}
