import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { formatCurrency } from '@angular/common';
import * as _jexl from 'jexl';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Jexl2';
  // @ts-ignore
  jexl: _jexl.Jexl;


  context: any = {
    name: { first: 'Sterling', last: 'Archer' },
    assoc: [
      { first: 'Lana', last: 'Kane' },
      { first: 'Cyril', last: 'Figgis' },
      { first: 'Pam', last: 'Poovey' }
    ],
    age: 36
  };

  ngOnInit() {

    this.context.effectiveDate = null;

    this.jexl = new _jexl.Jexl();

    this.jexl.addTransform('getBool', (val, test) => val > 34);

    this.jexl.addUnaryOp('not', (right) => !right);

    this.jexl.addUnaryOp('empty', (right) => _.isEmpty(right) && !_.isDate(right));

    // const response = this.jexl.evalSync('age > 34 ? name.first : name.last', this.context);
    const response = this.jexl.evalSync('empty effectiveDate', this.context);
    console.log('sync response : ' + response);
  }
}
