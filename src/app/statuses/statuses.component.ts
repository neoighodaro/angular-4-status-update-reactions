import { Component, OnInit } from '@angular/core';
import { StatusesService } from './statuses.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  public statusText: string
  public statuses: any[]
  public canPostStatus: boolean = false

  constructor(public status: StatusesService) { }

  ngOnInit() {
    this.status.recent(50)
  }

  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() == false;
  }

  postStatus() {
    this.status.valid(this.statusText) && this.status.post(this.statusText)
  }

  react(reaction: string, status) {
    this.status.react(reaction, status)
  }
}
