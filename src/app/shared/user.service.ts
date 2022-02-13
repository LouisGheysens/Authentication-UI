import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
//Registratie service!
  constructor(private fb: FormBuilder, private http:HttpClient) { }
  readonly BaseURI = 'https://localhost:7269/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required],
    },{Validators: this.comparePasswords})
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordControl = fb.get('ConfirmPassword');
    if(confirmPasswordControl?.errors == null|| 'passwordMismatch' in confirmPasswordControl.errors){
      if(fb.get('Password')?.value!=confirmPasswordControl?.value){
        confirmPasswordControl?.setErrors({ passwordMismatch: true});
      }else{
        confirmPasswordControl?.setErrors(null);
      }
    }
  }

  //Call .NET API
  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI+'/ApplicationUser/Register', body);
  }

  //Login
  login(formData: any){
    return this.http.post(this.BaseURI+'/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    return this.http.get(this.BaseURI+'/UserProfile');
  }
}
