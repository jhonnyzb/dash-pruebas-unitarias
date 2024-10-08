import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgenciesModel } from 'src/app/core/models/Agencies.model';
import { RegionalModel } from 'src/app/core/models/Regional.model';
import { SegmentsModel } from 'src/app/core/models/Segments.model';
import { SelectorResponseModelF } from 'src/app/core/models/selectorResponse.model';

@Component({
  selector: 'app-selector-report-finally',
  templateUrl: './selector-report-finally.component.html',
  styleUrls: ['./selector-report-finally.component.scss']
})
export class SelectorReportFinallyComponent {

  @Input() user!: any;
  @Input() segmentsList: SegmentsModel[] = [];
  @Input() regionalsList: RegionalModel[] = [];
  @Input() agenciesList: AgenciesModel[] = [];
  @Input() rolsList: SelectorResponseModelF[] = [];
  @Output() messageEventRegional = new EventEmitter();
  @Output() messageEventSelector = new EventEmitter();

  segments = new FormControl([]);
  regionals = new FormControl([]);
  agencies = new FormControl([]);
  rols = new FormControl([]);



  /**
   * Maneja el cambio de selección en los segmentos.
   *
   * @param flag - Indica el tipo de selección ('regional' para selección regional, vacío para selección general).
   * @returns void
   */
  onSelectionChangeSegments(flag = '') {
    if (flag === 'regional') {
      this.messageEventRegional.emit(this.regionals.value);
    } else {
      const selectors = {
        Segments: this.segments.value,
        Agencies: this.agencies.value,
        Rols: this.rols.value
      }
      this.messageEventSelector.emit(selectors);
    }
  }
}
