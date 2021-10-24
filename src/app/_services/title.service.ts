import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public title   = '';
  public message = '';

  constructor() { }

  public getTitle(): string {
    return this.title;
  }

  public getMessage(): string {
    return this.message;
  }

  public setData(title: string, message: string): void {
    this.title    = title;
    this.message  = message;
  }

  public setDataWithRoute(route: ActivatedRoute): void {
    this.title    = route.snapshot.data.title;
    this.message  = route.snapshot.data.message;
  }
}
