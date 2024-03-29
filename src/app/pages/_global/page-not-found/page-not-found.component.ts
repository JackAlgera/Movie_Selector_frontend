import { RoutingService } from './../../../_utils/routing.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
    this.titleService.setData(this.route.snapshot.data['title'], this.route.snapshot.data['message']);
  }

}
