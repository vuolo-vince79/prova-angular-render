import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/login.css', './login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin! : FormGroup
  errorUsername : boolean = false
  errorPsw : boolean = false

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : [null, Validators.required],
      psw : [null, Validators.required]
    })
  }

  submit(){
    if(this.formLogin.valid){
      console.log(this.formLogin.value)
      this.errorUsername = this.formLogin.value.username !== "vince"
      this.errorPsw = this.formLogin.value.psw !== "1234"
    }
  }

}
