import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {};

  constructor(private httpClient: HttpClient) {
    this.load();
  }

  load(): void {
    this.httpClient.get('/assets/config.json', { headers: {'SKIP_INTERCEPTOR' : ''} }).subscribe((configuration: any) => this.config = configuration);
  }

  getValue(key: string, defaultValue?: any): any {
    return this.config[key] || defaultValue;
  }

}
