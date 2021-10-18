import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

  events: any[] = [
    {
      id: 1,
      start: "2021-10-02T09:15:00",
      end: "2021-10-02T11:00:00",
      text: 'Task 1'
    },
    {
      id: 2,
      start: "2021-10-02T12:00:00",
      end: "2021-10-02T15:00:00",
      text: 'Task 2'
    },
    // {
    //   id: 1,
    //   start: DayPilot.Date.today().addHours(9),
    //   end: DayPilot.Date.today().addHours(11),
    //   text: 'Event 1'
    // },
    // {
    //   id: 2,
    //   start: DayPilot.Date.today().addHours(12),
    //   end: DayPilot.Date.today().addHours(15),
    //   text: 'Event 2'
    // }
  ];

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

  }


}
