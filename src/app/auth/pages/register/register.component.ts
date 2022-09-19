import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  register(){
    const { name, email, password } = this.myForm.value;
    this.authService.register(name, email, password)
      .subscribe(response => {
        if(response === true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error', response, 'error');
        }
      });
      
  }

}
