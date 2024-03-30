import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  formMessage = "Contact Us!"
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }
handleFormSend(){

  const toast = this.toastCtrl.create({
    message: "Thanks for contacting us, we will get back with you shortly",
    duration: 3000
  });
  toast.present()
}

}
