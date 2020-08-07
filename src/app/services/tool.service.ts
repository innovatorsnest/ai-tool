import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ToolService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': '49'
    })
  };

  nlpUrl = 'https://dev-nlp.infer.smartbeings.ai';

  constructor(
    private _http: HttpClient,
  ) {




  }

  gettingDataFromNlu(payload) {

    return this._http.post(this.nlpUrl + '/nlpapi/conversation/predict', payload, this.httpOptions)
    .pipe(
      map((res: Response) => {

        console.log('response from service', res);
        return res;
      })
    )
  }

  // gettingTheLogs() {
  //   return this._http.get(this.nlpUrl + '/nlpapi/conversation/logs',this.httpOptions)
  //   .pipe(
  //     map((res: Response) => {
  //       console.log('response from service', res);
  //       return res;
  //     })
  //   )
  // }

  // updatingTheTrainingStatus(payload) {
  //   return this._http.put(this.nlpUrl + '/nlpapi/conversation/logsupdate', payload,this.httpOptions)
  //   .pipe(
  //     map((res: Response) => {
  //       console.log('response from service', res);
  //       return res;
  //     })
  //   )
  // }

  // gettingCountLogs() {
  //   return this._http.get(this.nlpUrl + '/nlpapi/conversation/logscount',this.httpOptions)
  //   .pipe(
  //     map((res: Response) => {
  //       console.log('response from service', res);
  //       return res;
  //     })
  //   )
  // }







}
