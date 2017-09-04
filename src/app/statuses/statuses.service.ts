// Import the required packages to the service
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import "rxjs/add/operator/map";

@Injectable()
export class StatusesService {

  // Flag to see if status update is in progress
  private inProgress: boolean = false

  // Possible available reactions
  private reactions: string[] = ['like', 'love', 'dislike']

  // All the statuses available
  public statuses: FirebaseListObservable<any[]>

  // The maimum length and minimum length of a status
  public maxLength:number = 500
  public minLength:number = 0

  // Flag that determines if the status text is valid or nah
  public statusTextValid: boolean = false

  // Class constructor, injects the angular fire database as this.af
  constructor(private af: AngularFireDatabase) { }

  // ----------------------------------------------------------------------
  // Method to post the status to Firebase
  // ----------------------------------------------------------------------

  post(status: string) {
    if ( ! this.updating()) {
      this.inProgress = true
      let payload = {text: status, like:0, dislike:0, love:0, createdAt: {".sv": "timestamp"}};
      this.statuses.push(payload).then( snapshot => {
        this.inProgress = false
      })
    }
  }

  // ----------------------------------------------------------------------
  // Method to send a reaction to a status to Firebase
  // ----------------------------------------------------------------------

  react(reaction: string, status) {
    if (~this.reactions.indexOf(reaction)) {
      let reactions: any = {}
      let count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction])
      reactions[reaction] = count+1
      this.statuses.update(status.$key, reactions)
    }
  }

  // ----------------------------------------------------------------------
  // Method to get the recent statuses from Firebase
  // ----------------------------------------------------------------------

  recent(amount: number): FirebaseListObservable<any[]> {
    return this.statuses = this.af.list('/statuses').map(arr => arr.reverse()) as FirebaseListObservable<any[]>;
  }

  // ----------------------------------------------------------------------
  // Method to check the validity of a status update
  // ----------------------------------------------------------------------

  valid(status: string) : boolean {
    return status.length >= this.minLength && status.length <= this.maxLength
  }

  // ----------------------------------------------------------------------
  // Method to check the in progress flag
  // ----------------------------------------------------------------------

  updating() : boolean {
    return this.inProgress
  }
}
