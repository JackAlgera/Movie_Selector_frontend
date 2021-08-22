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
    this.titleService.setData(this.route.snapshot.data['title'], this.route.snapshot.data['message']);
  }

  public createForm() : void {
    this.userInputForm = this.formBuilder.group({
      userName: ['', Validators.required ],
      roomId: ['', Validators.required ]
    });
  }

  public onSubmit() : void {
    if (!this.userService.getUser()) {
      this.userService.setUser(this.userInputForm.value.userName);
    }
    var user = this.userService.getUser();

    if (!this.userInputForm.value.roomId) {
      this.roomDaoService.createNewRoom().subscribe((newRoom: Room) => {
        this.roomDaoService.addUserToRoom(user.userName, user.userId, newRoom.roomId).subscribe( _ => {
          this.router.navigateByUrl(`/rooms/${newRoom.roomId}`, {})
        })
      });
    } else {
      this.router.navigate([`/rooms/${this.userInputForm.value.roomId}`], {});
    }
  }

}
