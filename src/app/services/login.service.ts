import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, retry, catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/users";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

 /* pathApi = "http://piot.diginova.com.tr/api/user/users"
  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '80RdynqVVemsS2F7rwGOoAGFfXJBN8nm',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };*/




postData(){

  console.log("post")
 let httpOptions2 = {
    headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
     'Authorization': 'Bearer' + ' ' + this.strToken,
    'Accept': 'application/json',
     // 'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    })
  };

  let postData = JSON.stringify({
    "name": 'posttest3',
    "app_config": 'wifi'
  //  "user_id": 2
})

this.http.post("http://piot.diginova.com.tr/api/device/projects", postData, httpOptions2).subscribe(data => {
    console.log(data['_body']);
   }, error => {
    console.log(error);
  });

  /*.subscribe(data => {
    console.log(data['_body']);
   }, error => {
    console.log(error);
  });
*/
}

strToken : string = "4sI2lYd7Q3IWP1yEc960k7enkaWdRgHR"
strToken1: string = "80RdynqVVemsS2F7rwGOoAGFfXJBN8nm"

  getData() {
    console.log("getData")

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + this.strToken,
      'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
     //'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
 	   //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });

    this.http.get('http://piot.diginova.com.tr/api/device/devices?project_id=2', { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).subscribe(data => {
      console.log(data)
    })

  }

  /*getToken1(){
    let url = this.pathApi; //your API
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
      let options = new RequestOptions({ headers:headers});
   let data= {username:'test_ha',password:'test_ha'}
    return new Promise((resolve,reject)=>{
       this.http.post(this.pathApi+"token",JSON.stringify(data), options).subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    })
  }
  
  */

  /*
    getUser(user): Observable<User[]> {
      return this.http
      .get<User[]>(this.path + "?name="+user.name+"&password="+user.password)
      .pipe(
        tap(data =>console.log(JSON.stringify)),
        catchError(this.handleError)
      )
    }
  
    createUser(user): Observable<User>{
      return this.http
      .post<User>(this.path, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  */
  handleError(err: HttpErrorResponse) {
    let errMessage = "";
    if (err.error instanceof ErrorEvent) {
      errMessage = "Error" + err.error.message;
    } else {
      errMessage = "System error";
    }

   // console.log(errMessage);
    console.log(err)
    return throwError(errMessage);
  }

}
