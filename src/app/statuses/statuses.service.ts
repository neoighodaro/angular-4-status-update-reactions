import { Injectable } from '@angular/core';

@Injectable()
export class StatusesService {
  private inProgress: boolean = false
  private reactions: string[] = ['like', 'love', 'dislike']

  public maxLength:number = 500
  public statusTextValid: boolean = false

  constructor() { }

  post(status: string) {
    if ( ! this.updating()) {
      this.inProgress = true
      console.log(`Posting "${status}" to the endpoint.`);
      this.inProgress = false
    }
  }

  react(reaction: string, statusId: string) {
    if (~this.reactions.indexOf(reaction)) {
      console.log(`Saving reaction "${reaction}" and status ID: ${statusId}`);
    }
  }

  recent(amount: number) {
    console.log(`Get a recent list (${amount}) of statuses`);
  }

  valid(status: string) : boolean {
    return status.length >= 0 && status.length <= this.maxLength
  }

  updating() : boolean {
    return this.inProgress
  }
}
