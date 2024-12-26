import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/login.css', './login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin! : FormGroup
  errorUsername : boolean = false
  errorPsw : boolean = false

  constructor(private fb : FormBuilder, private authService : AuthService){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : [null, Validators.required],
      psw : [null, Validators.required]
    })
  }

  submit(){
    if(this.formLogin.valid){
      this.authService.login(this.formLogin).subscribe({
        next : (response) => console.log("success", response),
        error : (error) => {
          let err = error.error.message
          this.errorUsername = err === "INVALID_USERNAME"
          this.errorPsw = err === "INVALID_PSW"
        }
      })
    }
  }

}
