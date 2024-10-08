import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CompliancesInfoModel } from 'src/app/core/models/Compliances.model';


@Component({
  selector: 'app-indicator-individual',
  templateUrl: './indicator-individual.component.html',
  styleUrls: ['./indicator-individual.component.scss']
})
export class IndicatorIndividualComponent implements OnInit {

  @Input() indicator!: CompliancesInfoModel;
  @Input() user!: any;

  percentages: number = 0;
  color: string = '#DBDBDB';

  constructor() { }

  ngOnInit(): void { }

  /**
   * Método que se ejecuta cuando hay cambios en las propiedades de entrada del componente.
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['indicator']) {
      const { Finishline, Compliance } = this.indicator
      this.percentages = Finishline === 0 ? 0 : Compliance! * 100 / Finishline!;
      this.percentages >= 100 ? this.color = 'green' : this.percentages === 0 ? this.color = '#C3C3C3' : this.color = 'red';
    }
  }

}
