import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
// import { selectErrMsgFromState } from './selector_err_msg';
import { IMsg } from '../user/reducer_user';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {
  error_msg$: Observable<string> 
  err_msg_edit_product$: Observable<string>

  constructor(
    private store: Store<IState>
  ) {
    this.error_msg$ = this.store.select(state => state.user.err_msg)
    this.err_msg_edit_product$ = this.store.select(state=>state.products.err_msg)
  }

  ngOnInit(): void {
  }
}
