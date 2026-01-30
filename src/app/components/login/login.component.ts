import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatCardModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb=inject(FormBuilder);
  private route =inject(ActivatedRoute)

  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false; 

  constructor() {
    this.loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      });
  }
  

  onSubmit() {
    if(this.loginForm.invalid)return;
    this.isLoading = true;
    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe(
      {
        next:()=>{
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
          this.router.navigate([returnUrl])

        },
        error:(err)=>{
          this.isLoading = false;
          this.errorMessage='incorrect email or password '; 
          console.error('Login error:', err);
        }
      }
    )
  }

}
