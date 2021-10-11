import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-title',
  templateUrl: './top-title.component.html',
  styleUrls: ['./top-title.component.css']
})
export class TopTitleComponent implements OnInit {

  constructor(
    public titleService: TitleService
  ) { }

  ngOnInit(): void {
  }

}
