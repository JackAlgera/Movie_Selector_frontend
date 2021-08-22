import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public title: string = ''
  public message: string = ''

  constructor() { }

  public getTitle() : string {
    return this.title
  }

  public getMessage() : string {
    return this.message
  }

  public setData(title: string, message: string) : void {
    this.title = title;
    this.message = message;
  }

}
