import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:3000/graphql'),
});
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { DogComponent } from './dog/dog.component';

@NgModule({
  declarations: [
    AppComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.withClient(client)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
