import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-fruit-input',
    templateUrl: './fruit-input.component.html',
    styles: [
    ]
  })
  export class FruitInputComponent implements OnInit {
  
    @Output() onEnter: EventEmitter<string> = new EventEmitter();
    @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
    @Input() placeholder = '';
    
    //RxJs
    debouncer: Subject<string> = new Subject();
  
    word: string = '';
  
    ngOnInit() {
      this.debouncer
          .pipe(debounceTime(300))
          .subscribe( value => {
            this.onDebounce.emit( value );
          });
    }
  
    search() {
      this.onEnter.emit( this.word );
      this.debouncer.subscribe();
    }
  
    keyPressed() {
      this.debouncer.next( this.word );
    }
  
  }
  