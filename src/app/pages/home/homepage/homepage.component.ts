import { User } from 'src/app/_models/user';
import { UserService } from './../../../_services/user.service';
import { Room } from './../../../_models/room';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  userInputForm: FormGroup;

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private roomDaoService: RoomDaoService,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.titleService.setDataWithRoute(this.route);
  }

  public createForm() : void {
    this.userInputForm = this.formBuilder.group({
      userName: ['', Validators.required ],
      roomId: ['', Validators.required ]
    });
  }

  public onSubmit() : void {
    this.userService.setUser(this.userInputForm.value.userName).subscribe(_ => {}, _ => {},
      () => this.handleRoomChange()
    );
  }

  private handleRoomChange() : void {
    if (!this.userInputForm.value.roomId) {
      this.roomDaoService.generateNewRoom().subscribe((newRoom: Room) => {
        this.addUserToRoom(newRoom.roomId);
      });
    } else {
      var roomId = this.userInputForm.value.roomId;
      this.roomDaoService.getRoom(roomId).subscribe(
        _     => this.addUserToRoom(roomId),
        error => this.router.navigate([`/rooms/${roomId}/not-found`], {})
      )
    }
  }

  private addUserToRoom(roomId: string) {
    this.roomDaoService.addUserToRoom(this.userService.getUser().userId, roomId).subscribe(
      _ => {
        this.userService.setRoomId(roomId);
        this.router.navigateByUrl(`/rooms/${roomId}`, {});
      }
    )
  }
}
