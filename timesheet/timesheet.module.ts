import {DataService} from "./data.service";
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TimesheetComponent} from './timesheet.component';
import {DayPilotModule} from 'daypilot-pro-angular';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule
  ],
  declarations: [
    TimesheetComponent
  ],
  exports:      [ TimesheetComponent ],
  providers:    [ DataService ]
})
export class TimesheetModule { }
