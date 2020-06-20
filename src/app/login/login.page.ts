import { Component, OnInit } from '@angular/core';
import { User } from './../models/user'
import {LoginService} from './../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;
  check_user: User[]
  user_id: number;

  constructor(
    private LoginService: LoginService
  ) { 
    this.user = new User();
  }

  ngOnInit() {
  }

  login(user) {

    this.LoginService.postData();
    /*
    this.LoginService.getUser(this.user).subscribe(data => {
      this.check_user = data;
      if (this.check_user.length == 0) {
        console.log("This user not found!");
      } else {
        console.log("OK")
      }
    })*/
  }


}
