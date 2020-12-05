import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  user_msg$: Observable<string>
  bag_msg$: Observable<string>

  constructor(
    private store: Store<IState>
  ) {    
    
  }

  ngOnInit(): void {
    this.user_msg$ = this.store.select(state => state.user.inform_msg);
    this. bag_msg$ =this.store.select(state=> state.bag.inform_msg)

  }

}
