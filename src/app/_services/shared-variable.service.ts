import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {

  public shouldRateOtherUsersMovies = false;

  constructor() { }

  public getShouldRateOtherUsersMovies(): boolean {
    return this.shouldRateOtherUsersMovies;
  }

  public swapShouldRateOtherUsersMovies(): void {
    this.shouldRateOtherUsersMovies = !this.shouldRateOtherUsersMovies;
  }
}
