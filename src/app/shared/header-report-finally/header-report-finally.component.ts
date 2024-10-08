import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PeriodsModel } from 'src/app/core/models/Periods.model';
import { SelectorResponseModelF } from 'src/app/core/models/selectorResponse.model';

@Component({
  selector: 'app-header-report-finally',
  templateUrl: './header-report-finally.component.html',
  styleUrls: ['./header-report-finally.component.scss']
})
export class HeaderReportFinallyComponent {

  @Input() periods: PeriodsModel[] = [];
  @Input() user!: any;
  @Input() information!: {};
  @Input() isSelectPeriod!: string;
  @Output() messageEventPeriod = new EventEmitter();

  occupation: string = '--';
  regional: string = '--';
  cedi: string = '--';
  force: string = '--';
  errorPeriod: string = '';

  period = new FormControl([]);


  /**
   * Método que se ejecuta cuando se producen cambios en las propiedades de entrada.
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['information']) {
      const { occupation, regional, cedi, force } = changes['information'].currentValue;
      this.occupation = occupation;
      this.regional = regional;
      this.cedi = cedi;
      this.force = force;
    }
    if (changes['isSelectPeriod']) {
      this.errorPeriod = changes['isSelectPeriod'].currentValue;
    }
  }

  onSelectionChangePeriod() {
    // const periodSelect = this.period.value?.toString().split(' ');
    // const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // const monthIndex= MONTHS.indexOf(periodSelect![0]) + 1;
    // const periodSend = {
    //   month:  monthIndex,
    //   year: Number(periodSelect![1]),
    // }
    this.messageEventPeriod.emit(this.period.value);
  }

}
