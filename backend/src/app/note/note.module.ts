import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteRoutingModule } from './note-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NoteRoutingModule
  ],
  declarations: [NoteListComponent, NoteFormComponent]
})
export class NoteModule { }
