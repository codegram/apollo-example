import { Component, OnInit } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

const DogAndFriends = gql`
  query {
    dogs {
      name,
      age,
      friends {
        age,
        name,
        friends {
          age,
          name
        }
      }
    }
  } 
`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dogsbook';
  dogs: any[];
  
  constructor(private apollo: Angular2Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: DogAndFriends
    }).subscribe(({ data }) => {
      this.dogs = data.dogs;
    })
  }
}
