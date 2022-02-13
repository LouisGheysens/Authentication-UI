import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration succeed');
        }else{
          res.errors.forEach((e: { code: any; }) => {
            switch(e.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration failed');
                break;
                default:
                  this.toastr.error('Username is already taken', 'Registration failed');
                  break;
            }
          })
        }
      },
      err => {
        console.log(err);
      },
    );
  }

}
