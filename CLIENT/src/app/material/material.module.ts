import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule,} from '@angular/material/button'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSidenavModule} from '@angular/material/sidenav'
const MaterialComponents =  [
  MatButtonModule,
  MatSidenavModule
]



@NgModule({
  imports: [
    CommonModule,
    MaterialComponents,
    MatDialogModule
  ],
  exports: [
    MaterialComponents,
    MatDialogModule
    
  ],
})
export class MaterialModule { }
