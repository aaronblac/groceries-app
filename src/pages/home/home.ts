import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  handleRemoveItem(event: Event){
    const item = (event.target as HTMLElement).closest('ion-item-sliding');
    if (item){
      item.remove();
    }

  }

}
