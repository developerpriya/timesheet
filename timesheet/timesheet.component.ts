import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import {DataService} from "./data.service";

@Component({
  selector: 'timesheet-component',
  template: `<daypilot-scheduler [config]="config" [events]="events" #timesheet></daypilot-scheduler>`,
  styles: [``]
})
export class TimesheetComponent implements AfterViewInit {

  @ViewChild('timesheet', {static: false})
  timesheet!: DayPilotSchedulerComponent;

  events: any[] = [];

  config: DayPilot.SchedulerConfig = {
    locale: "en-us",
    timeHeaders: [{"groupBy":"Hour"},{"groupBy":"Cell","format":"mm"}],
    scale: "CellDuration",
    cellDuration: 15,
    days: 31,
    viewType: "Days",
    startDate: "2021-10-01",
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: false,
    eventDeleteHandling: "Update",
    rowHeaderColumns: [
      {title: 'Date'},
      {title: 'Day', width: 30},
      {title: 'Total'}
    ],
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Task 1");
      dp.clearSelection();
      if (modal.canceled) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result
      });
    },
    onBeforeRowHeaderRender: args => {
      const day = args.row.start.toString("ddd");
      args.row.columns[1].text = `${day}`;

      const duration = args.row.events.totalDuration();
      if (duration.totalSeconds() === 0) {
        return;
      }

      let hours = duration.toString('H:mm');
      if (duration.totalDays() >= 1) {
        hours = Math.floor(duration.totalHours()) + ':' + duration.toString('mm');
      }
      args.row.columns[2].text = `${hours} hours`;
    },
    onBeforeEventRender: args => {
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      args.data.areas = [
        { right: 2, top: 0, bottom: 0, width: 30, html: duration.toString('h:mm'), style: 'display: flex; align-items: center'}
      ];
      args.data.backColor = '#b6d7a8';
      args.data.borderColor = 'darker';
      args.data.barColor = '#6aa84f';
    },
    onEventDelete: args => {
      if (!confirm("Do you really want to delete this event?")){
        args.preventDefault();
      }
    }
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {

    this.timesheet.control.scrollTo(DayPilot.Date.today().firstDayOfMonth().addHours(9));

    var from = this.timesheet.control.visibleStart();
    var to = this.timesheet.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

}

