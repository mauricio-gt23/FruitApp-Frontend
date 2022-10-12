import { Component } from "@angular/core";
import { Fruit } from "src/app/main/interfaces/fruit.interface";
import { FruitService } from "src/app/main/services/fruit.service";

@Component({
    selector: 'app-fruit',
    templateUrl: './fruit.component.html',
    styleUrls: ['./fruit.component.css']
  })
export class FruitComponent {

  word: string = ''; 
  fruits: Fruit[] = [];
  fruitsSuggested: Fruit[] = [];
  countArray: number[] = [];
  mistakes: boolean = false;
  displaySuggestions: boolean = false;

  constructor(private fruitService: FruitService) {
    this.fruitService.getAllFruit().subscribe( (data: any) => {
        this.fruits = data.result.content;
        this.countArray.length = this.fruits.length;
        for (let i = 0; i < this.countArray.length; i++) {
          this.countArray[i] = 1;
        }
    });
  }

  plus( position:number ): void {
    for (let i = 0; i < this.countArray.length; i++) {
      if (i === position) {
        this.countArray[i] += 1; 
      }
    }
  }

  less( position:number ): void {
    for (let i = 0; i < this.countArray.length; i++) {
      if (i === position) {
        this.countArray[i] -= 1; 
      }
    }
  }

  valid( position:number ): boolean {
    for (let i = 0; i < this.countArray.length; i++) {
      if (i === position) {
        if (this.countArray[i] === 1) {
          return true; 
        }
      }
    }
    return false;
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

  color(i: number): string {
    if (i % 2 == 0) {
      return 'button__pair';
    } return 'button__odd';
  }

}