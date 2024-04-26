import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "https://groceries-server.onrender.com";

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  // returns items array
  getItems(): Observable<object[]>{
    console.log('get Items triggered');
    return this.http.get(this.baseURL + '/api/items').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeItem(id){
    this.http.delete(this.baseURL + "/api/items/" + id).subscribe(
      () => {
        this.getItems().subscribe(items => this.items = items);
        this.dataChangeSubject.next(true);
      },
      error => console.error('Error removing item:', error)
    );
  }

  addItem(item){
    console.log('groceries service add ', item)
    this.http.post(this.baseURL + "/api/items", item ).subscribe(res => {
      this.items = res;
      console.log(this.items + "groceries ts")
      this.dataChangeSubject.next(true);
    })
  }

  editItem(item) {
    console.log('groceries service edit', item._id, item)
    this.http.put(this.baseURL + "/api/items/" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
  });
  }

}

