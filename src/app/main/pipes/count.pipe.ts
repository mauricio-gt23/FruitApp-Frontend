import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'count'
})
export class CountPipe implements PipeTransform {
    transform( value: number ): number {
        if (value < 1) {
            return 1;
        }
        return value;
    }

}