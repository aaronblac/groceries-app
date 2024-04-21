import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List";

  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean)=>{
      this.loadItems();
    });
  }

  ionViewDidLoad(){
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
      );
  }

  handleRemoveItem(item){
    if (item){
      this.dataService.removeItem(item._id);
      const toast = this.toastCtrl.create({
        message: `${item.name} was removed from the list`,
        duration: 3000
      });
      toast.present()
    }

  }

  handleShareItem(item){
    if (item){
      const toast = this.toastCtrl.create({
        message: `Sharing Item - ${item._id}` ,
        duration: 3000
      });
      toast.present()

      let message = ` Shared Item: ${item.name} Quantity; ${item.quantity} from Groceries App`
      let subject = `Shared via groceries app `
      this.socialSharing.share(subject, message).then(() => {
         console.log("Shared successfully!")
      }).catch((error) => {
        console.error("error while sharing",error)
      });
    }

  }

  handleEditItem(item,index){
    if (item){
      console.log("Edit item", item, item._id);

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
