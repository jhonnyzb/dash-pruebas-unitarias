import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-report',
  templateUrl: './header-report.component.html',
  styleUrls: ['./header-report.component.scss']
})
export class HeaderReportComponent implements OnInit {

  @Input() dateReport?: string = '';
  @Input() information?: {};
  @Input() user!: any;

  toppings = new FormControl('');
  toppingList: string[] = [];
  cargo: string = '';
  regional: string = '';
  cedi: string = '';
  force: string = '';
  ngOnInit(): void {

  }

  /**
   * Método que se ejecuta cuando hay cambios en las propiedades de entrada.
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateReport']) {
      this.dateReport = changes['dateReport'].currentValue.split('T')[0]
    }
    if (changes['information']) {
      const { cargo, regional, cedi, force } = changes['information'].currentValue;
      this.cargo = cargo;
      this.regional = regional;
      this.cedi = cedi;
      this.force = force;
    }
  }

}
