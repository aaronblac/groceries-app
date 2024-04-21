import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


@Component({
  selector: 'input-dialog-modal',
  templateUrl: 'input-dialog-modal.component.html'
})
export class InputDialogModal {
  item: any;
  index: number;
  quantityOptions: number[];

  constructor(private viewCtrl: ViewController, private navParams: NavParams, public dataService: GroceriesServiceProvider) {
    this.item = this.navParams.get('item') || {};
    this.index = this.navParams.get('index');
    this.quantityOptions = Array.from({length: 20}, (_, index) => index + 1);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveItem() {
    this.viewCtrl.dismiss(this.item);
  }
}
