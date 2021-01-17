import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rocketUrl = 'assets/images/rocket.svg';
  moonUrl = 'assets/images/moon.svg';
  currentYear = new Date().getFullYear();
  languages = ['English', 'French', 'Spanish'];

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  navigateToPrivacyPage(): void {
  }

  navigateToTermsAndConditionsPage(): void {
  }
}
