import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgressBarCategoryComponent } from './components/progress-bar-category/progress-bar-category.component';

import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PhotoSelectorComponent } from './components/photo-selector/photo-selector.component';

@NgModule({
 declarations: [
  DashboardCardComponent,
  ProgressBarCategoryComponent,
  TransactionItemComponent,
  TransactionDetailComponent,
  TransactionFormComponent,
  FilterBarComponent,
  PhotoSelectorComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
exports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule,
  DashboardCardComponent,
  ProgressBarCategoryComponent,
  TransactionItemComponent,
  TransactionDetailComponent,
  TransactionFormComponent,
  FilterBarComponent,
  PhotoSelectorComponent
]
})
export class SharedModule {}
