import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"

  items = [
    {
      name:"Milk",
      quantity: 2
    },
    {
      name:"Eggs",
      quantity: 12
    },
    {
      name:"Bread",
      quantity: 1
    },
    {
      name:"Coffee",
      quantity: 2
    },
    {
      name:"Soda",
      quantity: 2
    }
  ]


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  handleRemoveItem(item, index){
    if (item){
      this.items.splice(index, 1)

      const toast = this.toastCtrl.create({
        message: `${item.name} was removed from the list`,
        duration: 3000
      });
      toast.present()
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
            this.items.push(item);
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
}
