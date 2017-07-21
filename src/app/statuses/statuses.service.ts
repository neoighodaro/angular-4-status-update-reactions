import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import "rxjs/add/operator/map";

@Injectable()
export class StatusesService {
  private inProgress: boolean = false
  private reactions: string[] = ['like', 'love', 'dislike']

  public statuses: FirebaseListObservable<any[]>
  public maxLength:number = 500
  public minLength:number = 0
  public statusTextValid: boolean = false

  constructor(private af: AngularFireDatabase) { }

  post(status: string) {
    if ( ! this.updating()) {
      this.inProgress = true
      let payload = {text: status, like:0, dislike:0, love:0, createdAt: {".sv": "timestamp"}};
      this.statuses.push(payload).then( snapshot => {
        this.inProgress = false
      })
    }
  }

  react(reaction: string, status) {
    if (~this.reactions.indexOf(reaction)) {
      let reactions: any = {}
      let count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction])
      reactions[reaction] = count+1
      this.statuses.update(status.$key, reactions)
    }
  }

  recent(amount: number): FirebaseListObservable<any[]> {
    let query = { orderByChild: 'createdAt', limitToLast: amount }
    return this.statuses = this.af.list('/statuses').map(arr => arr.reverse()) as FirebaseListObservable<any[]>;
  }

  valid(status: string) : boolean {
    return status.length >= this.minLength && status.length <= this.maxLength
  }

  updating() : boolean {
    return this.inProgress
  }
}
