import { Component } from "@angular/core";
import { Fruit } from "src/app/main/interfaces/fruit.interface";
import { FruitService } from "src/app/main/services/fruit.service";

@Component({
    selector: 'app-juice',
    templateUrl: './juice.component.html',
    styleUrls: ['./juice.component.css']
  })
export class JuiceComponent {

  word: string = ''; 
  count: number = 1;
  fruits: Fruit[] = [];
  fruitsSuggested: Fruit[] = [];
  mistakes: boolean = false;
  displaySuggestions: boolean = false;

  constructor(private fruitService: FruitService) {
    this.fruitService.getAllFruit().subscribe( (data: any) => {
        this.fruits = data.result.content;
    });
  }

  plus(): void {
    this.count += 1;
  }

  less(): void {
    this.count -= 1;
  }

  valid(): boolean {
    if (this.count == 1) {
      return true; 
    } return false;
  }

  search( name: string ) {
    this.displaySuggestions = false;
    this.mistakes = false;
    this.word = name;

    this.fruitService.getByName(name).subscribe( (fruits) => {
      this.fruits = fruits.result.content;
      if (this.fruits.length === 0) {
        this.mistakes = true;
      }
    });
  }

  suggestion( name: string ) {
    this.mistakes = false;
    this.word = name;
    this.displaySuggestions = true;

    this.fruitService.getByName(name).subscribe( (fruits) => {
      fruits = fruits.result.content;
      this.fruitsSuggested = fruits.splice(0, 3)      
    });
  }
  
  searchSuggested( name: string ) {
    this.search(name);
  }
  
}