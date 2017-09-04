import { Component, OnInit } from '@angular/core';
import { StatusesService } from './statuses.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {

  // Status text
  public statusText: string

  // The status available
  public statuses: any[]

  // Flag to see if a new status can be added or nah
  public canPostStatus: boolean = false

  // ---------------------------------------------------------
  // Class constructor, injects StatusService as this.status
  // ---------------------------------------------------------

  constructor(public status: StatusesService) { }

  // ---------------------------------------------------------
  // ngOnInit is automatically fired on intialisation
  // ---------------------------------------------------------

  ngOnInit() {
    // Get 50 of the most recent statuses
    this.status.recent(50)
  }

  // ---------------------------------------------------------
  // Get the status of the text if its valid or nah
  // ---------------------------------------------------------

  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() == false;
  }

  // ---------------------------------------------------------
  // Post a status if it is valid
  // ---------------------------------------------------------

  postStatus() {
    this.status.valid(this.statusText) && this.status.post(this.statusText)
  }

  // ---------------------------------------------------------
  // React to an existing post
  // ---------------------------------------------------------

  react(reaction: string, status) {
    this.status.react(reaction, status)
  }
}
