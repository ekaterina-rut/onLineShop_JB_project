import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../app.module';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  isLoggedOut$: Observable<boolean>
  

  constructor(
    private router: Router,
    private state: Store<IState>,

  ) { }

  ngOnInit(): void {
    this.isLoggedOut$ = this.state.select(state=>state.user.isLoggedOut)
  }

  joinUs(): void {
    this.router.navigateByUrl('/registration');
  }

}
