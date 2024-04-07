import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
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
      this.showEditItemPrompt(item, index)
    }

  }

  handleAddItem(){
    console.log("add items")
    this.showAddItemPrompt();
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Grocery List',
      message: "Please enter new grocery item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Add Item'
        },
        {
          name: 'quantity',
          placeholder: 'Add Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked');
            this.dataService.addItem(item);
            const toast = this.toastCtrl.create({
              message: `${item.name} was added to the list`,
              duration: 3000
            });
            toast.present()
          }
        }
      ]
    });
    prompt.present();
  }

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Grocery List',
      message: "Edit your item",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked');
            this.dataService.editItem(item,index);
            const toast = this.toastCtrl.create({
              message: `Your item has been edited`,
              duration: 3000
            });
            toast.present()
          }
        }
      ]
    });
    prompt.present();
  }
}
