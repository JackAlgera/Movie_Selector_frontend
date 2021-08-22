import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.css']
})
export class RoomDisplayComponent implements OnInit {

  roomId: string;

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private roomDaoService: RoomDaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setData(this.route.snapshot.data['title'], this.route.snapshot.data['message']);
    this.checkIfRoomExists();
  }


  private checkIfRoomExists() : boolean {
    this.route.paramMap.subscribe(params => {
      this.roomDaoService.getRoom(params.get('roomId')).subscribe(
        _ => {},
        error => {
          this.router.navigateByUrl(`rooms/${params.get('roomId')}/not-found`)
        })
    });

    return true;
  }
}