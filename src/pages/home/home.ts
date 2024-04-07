import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider) {
  }

  loadItems(){
    return this.dataService.getItems();
  }

  handleRemoveItem(item, index){
    if (item){
      this.dataService.removeItem(index);
      const toast = this.toastCtrl.create({
        message: `${item.name} was removed from the list`,
        duration: 3000
      });
      toast.present()
    }

  }

  handleEditItem(item, index){
    if (item){
      console.log("Edit item", item, index);

      const toast = this.toastCtrl.create({
        message: `Editing item - ${item.name}`,
        duration: 3000
      });
      toast.present()
      this.inputDialogService.showPrompt(item, index)
    }

  }

  handleAddItem(){
    console.log("add items")
    this.inputDialogService.showPrompt();
  }


}
