import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/login.css', './register.component.css']
})
export class RegisterComponent implements OnInit{

  formRegister! : FormGroup
  errorUsernameExists : boolean = false
  errorEmailInvalid : boolean = false
  errorEmailExists : boolean = false
  errorPswShort : boolean = false

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username : [null, Validators.required],
      email : [null, Validators.required],
      psw : [null, Validators.required]
    })
  }

  submit() : void{

  }

}
