# How to build status update reactions using Angular 4 and Firebase

Nowadays, most applications have a commenting system of sorts, whether it’s commenting on a status update or a story or even a live feed. With status updates also comes the ‘like’ feature which was made popular by companies like Facebook. In this tutorial, we will add reactions to a comment just like Facebook allows you do on status updates. 


## What we will be building

We will be building a simple application where you can publish a status and after publishing a status, you can add reactions to it. You can **like**, **dislike** and **love** any status on the application.

The application will be powered by [Angular 4](http://angular.io) in the front-end and [Firebase](http://firebase.google.com) in the backend. In following articles, I will demonstrate how to add other real-time features to the app using a tool like [Pusher](https://pusher.com), but for this one, we will be focusing on the update and reactions part. It will look something like this after we are done.

![How to build status update reactions using Angular 4 and Firebase](https://cdn.scotch.io/3646/ZuYAM0cCT6BpiDA8W9zf_create-status-update-reactions-angular4-4.gif)

-----

### Requirements for building our status update reactions app

To successfully follow along in this tutorial, you need to have a few things in place. Here is a list of those things:


- [NodeJS & NPM installed](https://docs.npmjs.com/getting-started/installing-node) on your local machine.
- `angular-cli` installed on your machine. Run `$ npm install -g @angular/cli` to install it.
- Visual Studio Code or any text editor of your choice.
- Basic knowledge of Sass, TypeScript and JavaScript.
- [Firebase](https://firebase.google.com/) account to create a database for our application.

Let us get started with building the application. To start we will need to create our Angular application. You can create a new application by running the `ng new` command as will be explained below.

## Creating our new Angular application

To create our new application, we can use the Angular CLI and just run the command below in the directory we want to create our project in:

```shell
$ ng new reactions --style scss --skipTests
```

The command above will create a new directory called **reactions**, and will set our default style engine to **SCSS**, and will skip creating tests for the application. Tests are important but we won’t be needing them for this tutorial.

Once this is complete, open your project in a text editor of your choice. Visual Studio Code is recommended solely because it has inbuilt support for TypeScript, but you can use whichever you want to use.

## Creating the Angular Application UI

Let us focus on building the front-end or UI of our application. We will need FontAwesome and Bootstrap for the application so let’s pull those in:

```shell
npm install --save bootstrap font-awesome
```

Now we need to import Bootstrap and FontAwesome into our stylesheets build process. Open up your `src/styles.scss` file and add the following to the file:

```sass
// import bootstrap and font awesome into our scss file
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.css";

body {
    background-color: #e6ecf0;
}
```

For this tutorial, we do not need the JavaScript part of Bootstrap but if you want to add this to your application, you can import it in the scripts section of `.angular.cli.json`. You will need to add the path relative to the file. For example, to add Bootstrap, the path will be: `../node_modules/bootstrap/dist/js/bootstrap.js`

Now we are ready to start building our application. To serve our application, run the command below to serve your application:

```shell
ng serve --open
```

Once the build is complete, it will automatically open the application on your default browser. If you did everything correctly, you should see the default Angular page on your screen. Perfect.

-----

![Default Angular Screen](https://cdn.scotch.io/3646/le507ulRiCXPN6KT1hQo_Default%20Angular%20Screen.png)

-----

## Creating Angular components for our page
Next, let's create some components to make up the page. We will create a navigation component where we will add our navigation items. It is unimportant to the tutorial and it is just going to be there for aesthetic reasons. Generate the component using the `ng g component` command as seen below: 

### Creating the Angular navigation component

```shell
$ ng g component nav --spec=false
```

> The `--spec` flag is basically a boolean that specifies if a spec file is generated. We do not need this for this tutorial.

This should create a new `nav` directory in the `./src/app` folder. Open the `nav.component.html` file and replace the contents with the code below:

```html
<!-- Bootstrap navigation bar -->
<nav class="navbar navbar-fixed navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a></li>
        <li><a href="#"><i class="fa fa-bell-o"></i> Notifications</a></li>
        <li><a href="#"><i class="fa fa-commenting-o"></i> Messages</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="profile-photo">
          <a href="#" alt="John Doe"><img src="https://randomuser.me/api/portraits/men/84.jpg" alt=""></a>
        </li>
      </ul>
      <form class="navbar-form navbar-right">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search" disabled>
        </div>
      </form>
    </div>
  </div>
</nav>
```

This is just a basic Bootstrap navigation bar. Now let’s add some custom styling to the navigation bar component. Open the `nav.component.scss` file and add the following:

```sass
// Style the navigation bar icon
.nav i.fa {
    font-size: 18px;
    margin-right: 5px;
    top: 3px;
}

// Style the navigation bar profile photo
.nav > li.profile-photo > a {
    padding: 8px 0;
    img {
        border-radius: 100%;
        max-width: 34px;
    }
}
```

Finally, to see our navigation bar, we will need to clear the contents of our `app.component.html` file and replace it with the component selector, as shown in the code below:

```html
<!-- Show the angular navigation component -->
<app-nav></app-nav>

<div class="container">
    <div class="row">
        <div class="col-xs-12 col-md-3">
            <!--<app-sidebar></app-sidebar>-->
        </div>
        <div class="col-xs-12 col-md-9">
            <div class="statuses">
                <!--<app-statuses></app-statuses>-->
            </div>
        </div>
    </div>
</div>
```

> *We commented out the `app-sidebar` and `app-statuses` component selectors because they do not exist yet. We will create them later in the article and uncomment the component selectors to show them.*

If you are still running the `ng serve` command, refresh the page and you should see your changes on the browser.

---

![](https://cdn.scotch.io/3646/hRNKp7jQfmOEKJquIWvO_Angular%20Reactions%20App%20Navigation%20Bar.png)

---

### Creating the Angular sidebar component
The next thing we want to add after the navigation is the sidebar. As we did before, we will run the `ng g component` command to create the sidebar Angular component:

```shell
$ ng g component sidebar --spec=false
```

Open the `sidebar.component.html` file and replace the contents with the HTML code below:

```html
<aside class="main">
  <div class="profile-block">
    <div class="photo">
      <div class="banner-photo"></div>
    </div>
    <div class="profile">
      <div class="row">
        <div class="col-xs-4">
          <div class="profile-photo">
            <img src="https://randomuser.me/api/portraits/men/84.jpg" alt="">
          </div>
        </div>
        <div class="col-xs-8">
          <span class="name">John Doe</span>
          <span class="handle">@johndoe</span>
        </div>
      </div>
      <div class="row assets">
        <div class="col-xs-6">
          <span class="assets-title">Following</span>
          <span class="assets-count">10</span>
        </div>
        <div class="col-xs-6">
          <span class="assets-title no-left-pad">Followers</span>
          <span class="assets-count no-left-pad">103K</span>
        </div>
      </div>
    </div>
  </div>
  <div class="followers">
    <h3>Followers</h3>
    <div class="row">
      <div class="col-xs-12">
        <ul class="list-inline">
          <li><a href="#"><img src="https://randomuser.me/api/portraits/women/25.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/women/26.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/men/25.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/men/89.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/men/39.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/men/59.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/women/39.jpg" alt=""></a></li>
          <li><a href="#"><img src="https://randomuser.me/api/portraits/women/79.jpg" alt=""></a></li>
        </ul>
      </div>
    </div>
  </div>
</aside>
```

This should add a make-believe sidebar. Next, open the `sidebar.component.scss` file and add the accompanying style for the sidebar component:

```sass
aside.main {
    .photo {
        height: 95px;
        width: 100%;
        background-color: #d9d9d9;
    }
    .banner-photo {
        background-image: url(https://pbs.twimg.com/profile_banners/843496574332354560/1497099556/600x200);
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .profile {
        background-color: #fff;
        min-height: 50px;
        .profile-photo {
            img {
                max-width: 100%;
                width: 72px;
                float: right;
                left: 25px;
                position: absolute;
                border-radius: 100%;
                top: -26px;
                border: 2px solid #fff;
            }
        }
        .col-xs-8 {
            padding-left: 10px;
        }
        .name {
            font-weight: 600;
            font-size: 18px;
            margin-top: 5px;
            display: block;
            line-height: 1.2;
        }
        .handle {
            display: block;
            margin-bottom: 10px;
            color: #657786;
        }
    }
    .assets {
        padding: 10px 0;
        .assets-count {
            padding: 0 16px;
            display: block;
            font-size: 13px;
            color: #657786;
        }
        .assets-title {
            font-weight: 600;
            padding: 0 16px;
            color: #657786;
            display: block;
        }
        .no-left-pad {
            padding-left: 0;
        }
    }
    .followers {
        margin-top: 10px;
        padding: 10px 16px;
        background-color: #fff;
        h3 {
            margin: 0 0 10px;
            font-size: 17px;
            font-weight: 600;
            color: #14171a;
        }
        .list-inline {
            margin-bottom: 0;
        }
        .list-inline li {
            padding: 10px 5px;
            a {
                display: block;
            }
        }
        img {
            border-radius: 100%;
            max-width: 45px;
        }
    }
}
```

Now go to the `app.component.html` file and uncomment the `<app-statuses></app-statuses>` tag. This should make the sidebar instantly visible on the browser. So far you should have something similar to the screenshot below:

![Preview of our status updates reaction Angular 4 application](https://cdn.scotch.io/3646/gHQAKl48SOmYxSK6jGoO_create-status-update-reactions-angular4-1.png)

## Connecting our application to Firebase

Now, let’s create the statuses component and the statuses service. The statuses service will be the place where all the calls to Firebase will happen from. It will be the proxy between our application and Firebase. It is important to use services for such interfacing because it becomes reusable as opposed to using Firebase directly.

Before we create the component let us import Firebase and the AngularFire library. You will need to stop the `ng serve`  command if it is currently running. Now run the command below to install the required Firebase libraries:

```shell
$ npm install angularfire2 firebase --save
```

After it is done, we need to configure firebase. Open the `app.module.ts` file and add the following into the file:

```javascript
// Import the AngularFireModule and the AngularFireDatabaseModule
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Define the firebase database configuration keys, get it from your Firebase application console
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
```

Scroll down to the imports section of the same file and add the `AngularFireModule` and `AngularFireDatabaseModule` to the `@NgModule` imports as shown below:

```
@NgModule({
  // ...
  imports: [
    // ...
	
    // Import as an NgModule... 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ]
  // ...
})
```

Next, go to the Firebase website and [create a new Firebase application](https://console.firebase.google.com/u/0/). 

![Create a new Firebase application for our status updates reaction Angular 4 app](https://cdn.scotch.io/3646/hYahvBCTr6j4hmQDq8qL_create-status-update-reactions-angular4-2.png)


When the application has been created, navigate to “Add Firebase to your web app” and then use the credentials to replace the empty `firebaseConfig`  constant in your `app.module.ts` file.

![Copy the firebase credentials from the console](https://cdn.scotch.io/3646/g0HW6NLNQSG9uxfLXF0T_Firebase%20screenshot%20of%20the%20credentials.png)

One last thing, in your Firebase application dashboard, navigate to “Database” and then click on “Rules”, in the field, paste the following:

```json
{
  "rules": {
    "statuses": {
      ".read": "true",
      ".write": "true",
      ".indexOn": "createdAt"
    }
  }
}
```

![Firebase database rules](https://cdn.scotch.io/3646/oGt641YQtiKrzQm2BvZT_Firebase%20database%20rules.png)

> IMPORTANT: This will turn off authentication for your Firebase and should only be used for the purposes of this application ALONE. This is NOT recommended for a production application! 

## Creating the Status Angular Component & Service
Now that we have Firebase plugged in, we can create the statuses component and the service.

```shell
$ ng g component statuses --spec=false
$ ng g service statuses/statuses --spec=false
```

The first command basically creates a status component, while the second command creates a `statuses.service.ts` file in the `./app/statuses` directory. 

Open the `./app/statuses/status.service.ts` file so we can add the Firebase functionality. Replace the existing code with the code below:

```javascript
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
```

Whoa! That is a lot! The first 3 lines simply import node modules that we will be needing for the service to work properly. We define a couple of `private` and `public` properties for the class that will be used both internally and externally in the class. 

In the constructor, we initialize the `af`  property which is for working with Firebase. We also create a `post` method, and in there, we define the logic for posting status updates to Firebase. 

The `react` method checks if the reaction is valid and if it is, it posts a reaction to the Firebase. The `recent`  method fetches the most recent statuses from Firebase. The `valid` method just checks if the status text is valid and the `updating` checks to see if there is currently a post to Firebase pending completion.

Next, we have to register the service so our application can see and use it. In the `app.module.ts` file, add the following:

```javascript
// Import the status service and forms module
import { FormsModule } from '@angular/forms';
import { StatusesService } from './statuses/statuses.service';

@NgModule({
  imports: [
    // .... other modules
    FormsModule,
    // ...other modules
  ],
  providers: [
    // Add the status service as a provider
    StatusesService
  ],
  // ...
})
```

Great, now we have registered the service. Moving on.

The next thing we will do is update our `statuses.component.ts` to interact with our application using the `statuses.service.ts` file. Open the `statuses.component.ts` file and replace it with the following:

```javascript
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
  // Get the status of the text if it's valid or nah
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
```

Above, we defined some properties and methods to use in the lifetime of the component. The `ngOnInit` method is called automatically when the component is initialized. In the `constructor`, we inject the status service into the component so the methods will be available to this component. 

The `typingStatus` method will be called every time someone updates the status text from the front-end. We use this to determine if the post button should be enabled or not. The `postStatus` posts the status to Firebase using the status service, and finally, the `react` method posts to Firebase using the service.

## Adding our Status Component to the application 
Once we are done with the backend of our Status Component, we will now add the UI to interact with the component. 

Open the `statuses.component.html` and add replace the content with the HTML below:

```html
<div class="create-status">
  <form class="clearfix">
    <div class="form-group">
      <textarea class="form-control" rows="3" placeholder="Whats happening?" [(ngModel)]="statusText" (ngModelChange)="typingStatus()" name="statusText"></textarea>
    </div>
    <div class="pull-right">
      <span class="countdown">
        <!-- Show the characters remaining for the status to remain valid -->
        <span *ngIf="statusText">{{this.status.maxLength - statusText.length}}</span>
        <span *ngIf="!statusText">{{this.status.maxLength}}</span>
      </span>
      <!-- On click of this button, post status -->
      <button class="btn btn-primary btn-md" [disabled]="canPostStatus != true" (click)="postStatus()">Post</button>
    </div>
  </form>
</div>
<div class="list-statuses clearfix">
  <ul>
    <!-- Loop through the statuses and display them -->
    <li *ngFor="let status of status.statuses | async">
      <div class="photo">
        <img src="https://randomuser.me/api/portraits/men/84.jpg" alt="">
      </div>
      <div class="status">
        <p>{{status.text}}</p>
        <div class="reaction">
          <ul class="list-inline pull-left">
            <!-- On click of any of the reactions, call the react method -->
            <li><a href="#" class="btn btn-sm btn-default" (click)="react('like', status)">Like</a></li>
            <li><a href="#" class="btn btn-sm btn-default" (click)="react('dislike', status)">Dislike</a></li>
            <li><a href="#" class="btn btn-sm btn-default" (click)="react('love', status)">Love</a></li>
          </ul>
          <div class="counts pull-right">
            <!-- Show the reaction counts -->
            <span class="thumbs reaction" [hidden]="!status.like || status.like <= 0"><span class="count">{{status.like}}</span> Like</span>
            <span class="thumbs reaction" [hidden]="!status.dislike || status.dislike <= 0"><span class="count">{{status.dislike}}</span> Dislike</span>
            <span class="heart reaction" [hidden]="!status.love || status.love <= 0"><span class="count">{{status.love}}</span> Love</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
```

This is basically HTML that has some parts where Angular is injected. On line 3, we add a text area and we use the `ngModel` and `ngModelChange` attributes to bind a model and listen for model changes respectively. 

On line 8 and 9, we just calculate the available amount of characters left as the user types. On line 11, we have the post button that is `disabled`  when the `canPostStatus` variable is false. We also attached a click event callback `postStatus`. Finally, we loop through all the statuses available on Firebase.

Finally, we will update the statuses component's SCSS file. Paste the following in the `statuses.component.scss` file:

```sass
.create-status {
    padding: 10px;
    background-color: #fcfcfc;
    border-bottom: 1px solid #f0f0f0;
    form {
        .form-group {
            margin-bottom: 5px;
        }
        .countdown {
            color: #657786;
            margin-right: 5px;
            display: inline-block;
            font-size: 13px;
        }
        textarea {
            border-radius: 15px;
            padding: 10px 15px;
            border-color: #f0f0f0;
            resize: none;
            margin: 0;
            &:focus {
                border-color: #00baba;
            }
        }
        button {
            border-radius: 15px;
            background-color: #00baba;
            border: none;
            outline: none;
            min-width: 80px;
            &:focus, &:hover {
                background-color: darken(#00baba, 5%);
                &[disabled] {
                    background-color: #00baba;
                }
            }
        }
    }
}
.list-statuses {
    background-color: #fff;
    ul {
        list-style: none;
        padding: 0;
        li {
            padding: 20px;
            border-bottom: 1px solid #f0f0f0;
            &:last-child {
                border: none;
            }
        }
    }
    .photo {
        float:left;
        height:40px;
        width:40px;
        margin-right: 10px;
        img {
            max-width: 100%;
            border-radius: 100%;
        }
    }
    .status {
        overflow: hidden;
        color: #474747;
        p:last-child {
            margin-bottom: 0;
        }
        ul {
            list-style: none;
            float: left;
            padding-left: 5px;
            margin-top: 10px;
            li {
                padding: 0;
            }
        }
    }
    .counts {
        line-height: 40px;
        .reaction {
            display: inline-block;
            font-weight: 600;
            color: #140044;
            margin-left: 5px;
            &[hidden] {
                display: none;
            }
        }
    }
}
```

Alright great! Now go to the `app.component.html` file and uncomment the `app-statuses` tag to show your changes. If all goes well and you have `ng serve` still active, you should see something like this:

-----

![Status update reaction using Firebase and Angular 4](https://cdn.scotch.io/3646/8KTr4oZ2TYeBsACExYtj_create-status-update-reactions-angular4-3.png)

-----

## Conclusion

We have successfully created a simple application that has reactions built-in with Firebase and Angular 4. You can use this as the backbone to your application and you can extend the functionality of this application by adding some more reactions and animations. For practice, I would suggest you do just that.

If you have any feedback or have any questions, feel free to leave a comment below. You can see the source code to this application on [Github](https://github.com/neoighodaro/angular-4-status-update-reactions).
