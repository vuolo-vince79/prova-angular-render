import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

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

  constructor(private fb : FormBuilder, private authSercice : AuthService){}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      username : [null, Validators.required],
      email : [null, Validators.required],
      psw : [null, Validators.required]
    })
  }

  submit() : void{
    if(this.formRegister.valid){
      this.authSercice.register(this.formRegister).subscribe({
        next : (resp) => console.log("success", resp),
        error : (error) => {
          let errors = error.error.message
          if(Array.isArray(errors)){
            console.log("array di errori", errors)
          }
          if(typeof errors === "string"){
            console.log("stringa unica con typeof", errors)
          }
          if(errors instanceof String){
            console.log("stringa unica con instanceof", errors)
          }
        }
      })
    }
  }

}
