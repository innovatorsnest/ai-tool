import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ToolService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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

  gettingAllEntity() {
    return this._http.get(this.nlpUrl + '/nlpapi/entity/all/', this.httpOptions)
      .pipe(
        map((res: Response) => {
          console.log('response fr  om getting ', res);
          return res;
        })
      )
  }
  gettingAllIntent() {
    return this._http.get(this.nlpUrl + '/nlpapi/intent/all_intent_names/', this.httpOptions)
      .pipe(
        map((res: Response) => {
          console.log('response from getting all Intents ', res);
          return res;
        })
      );
  }
  logsUpdate(payload) {
    return this._http.put(this.nlpUrl + '/nlpapi/conversation/logsupdate', payload,  this.httpOptions)
      .pipe(
        map((res: Response) => {
          console.log('response from getting the logs update', res);
          return res;
        })
      )
  }



  allConversationLogs() {
    return this._http.get(this.nlpUrl + '/nlpapi/conversation/logs?intent='+ ''
    + '&entity=' + '' + '&metric=' + '' + '&logType=', this.httpOptions)
      .pipe(
        map((res: Response) => {
          console.log('response from getting the all conversation logs', res);
          return res;
        })
      )
  }

  filterLogsApi(intent = "",entity = "",logType = "",metric = "" ) {
    return this._http.get(this.nlpUrl + '/nlpapi/conversation/logs?intent='+ intent
    + '&entity=' + entity + '&metric=' + metric + '&logType='+ logType, this.httpOptions)
      .pipe(
        map((res: Response) => {
          console.log('response from getting the all conversation logs', res);
          return res;
        })
      )
  }

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
