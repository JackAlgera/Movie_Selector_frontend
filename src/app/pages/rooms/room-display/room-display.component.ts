import { MovieDaoService } from './../../../_web/_daos/movie-dao.service';
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

  roomId: string = '';

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private roomDaoService: RoomDaoService,
    private router: Router,
    private movieDaoService: MovieDaoService
  ) { }

  ngOnInit() {
    this.titleService.setData(this.route.snapshot.data['title'], this.route.snapshot.data['message']);
    this.checkIfRoomExists();
    this.movieDaoService.getAllMovies().subscribe(movies => {
      console.log(movies)
    });
  }

  private checkIfRoomExists() : boolean {
    this.route.paramMap.subscribe(params => {
      this.roomDaoService.getRoom(params.get('roomId')).subscribe(
        _ => {
          this.roomId = params.get('roomId');
        },
        error => {
          this.router.navigateByUrl(`rooms/${params.get('roomId')}/not-found`);
        })
    });

    return true;
  }
}
