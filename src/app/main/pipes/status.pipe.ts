import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform( value: string ): string {
        if (value === 'PENDING') {
            return 'PENDIENTE';
        }
        return 'ENVIADO';
    }

}