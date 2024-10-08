import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeMoney'
})
export class PipeMoneyPipe implements PipeTransform {

  /**
   * Transforma un valor numérico en una cadena de texto con formato de dinero.
   *
   * @param value - El valor numérico a transformar.
   * @param args - Argumentos adicionales (no utilizado en esta función).
   * @returns La cadena de texto con formato de dinero.
   */
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (value) {
      const formattedValue = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return `$${formattedValue}`;
    }
    return '$0'
  }

}
