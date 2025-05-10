import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    MenubarModule
  ],
  exports: [
    //Modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    //PrimeNG modules
    ButtonModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    CardModule,
    MenuModule,
    MenubarModule,
    NavbarComponent
  ]
})
export class SharedModule { }
