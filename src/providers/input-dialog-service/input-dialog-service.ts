import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../groceries-service/groceries-service';
import { ModalController, ToastController } from 'ionic-angular';
import { InputDialogModal } from '../../components/input-dialog-modal/input-dialog-modal.component';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }


  // showPrompt(item?, index?) {
  //   const prompt = this.alertCtrl.create({
  //     title: item ? 'Edit Item' : 'Add to Grocery List',
  //     message: item ? "Edit your item": 'Enter Item',
  //     inputs: [
  //       {
  //         name: 'name',
  //         placeholder: 'Name',
  //         value: item ? item.name : null
  //       },
  //       {
  //         name: 'quantity',
  //         placeholder: 'Quantity',
  //         type: 'select',
  //         value: item ? item.quantity : null,

  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: item => {
  //           console.log('Saved clicked');
  //           if( index !== undefined){
  //             this.dataService.editItem(item,index);
  //           }
  //           else{
  //             this.dataService.addItem(item);
  //           }
  //           const toast = this.toastCtrl.create({
  //             message: item ? `Your item has been edited` : `${item.name} was added to the list`,
  //             duration: 3000
  //           });
  //           toast.present()
  //         }
  //       }
  //     ]
  //   });

  //   prompt.present();
  // }
  showPrompt(item?, index?) {
    const modal = this.modalCtrl.create(InputDialogModal, { item, index });

    modal.onDidDismiss((item) => {
      if (item) {
        if (index !== undefined) {
          this.dataService.editItem(item, index);
        } else {
          this.dataService.addItem(item);
        }
        const toast = this.toastCtrl.create({
          message: item ? `Your item has been edited` : `${item.name} was added to the list`,
          duration: 3000
        });
        toast.present();
      }
    });

    modal.present();
  }

}
