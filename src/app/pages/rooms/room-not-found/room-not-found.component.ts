import { RoutingService } from './../../../_utils/routing.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-not-found',
  templateUrl: './room-not-found.component.html',
  styleUrls: ['./room-not-found.component.css']
})
export class RoomNotFoundComponent implements OnInit {

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    public routingService: RoutingService
  ) { }

  ngOnInit() {
    this.titleService.setData(this.route.snapshot.data['title'], this.route.snapshot.data['message']);
  }

}
