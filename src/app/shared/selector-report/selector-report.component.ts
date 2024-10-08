import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectorResponseModel } from 'src/app/core/models/selectorResponse.model';

@Component({
  selector: 'app-selector-report',
  templateUrl: './selector-report.component.html',
  styleUrls: ['./selector-report.component.scss']
})

export class SelectorReportComponent implements OnInit {


  @Input() user!: any;
  @Input() selectors: SelectorResponseModel = { selectors: { Segments: [], Agencies: [], Regionals: [], Rols: [] } };
  @Output() messageEvent = new EventEmitter();

  segments = new FormControl([]);
  regionals = new FormControl([]);
  agencies = new FormControl([]);
  rols = new FormControl([]);

  segmentsList: string[] = [];
  regionalsList: string[] = [];
  agenciesList: string[] = [];
  rolsList: string[] = [];

  ngOnInit(): void {
  }

  onSelectionChangeSegments() {
    const selectors = {
      Segments: this.segments.value,
      Regionals: this.regionals.value,
      Agencies: this.agencies.value,
      Rols: this.rols.value
    }
    this.messageEvent.emit(selectors);
  }

  /**
   * Método que se ejecuta cuando hay cambios en las propiedades de entrada.
   * @param changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   * @returns void
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectors']) {
      this.selectors = changes['selectors'].currentValue;
      const { selectors } = this.selectors
      this.segmentsList = selectors.Segments;
      this.regionalsList = selectors.Regionals;
      this.agenciesList = selectors.Agencies;
      this.rolsList = this.selectors.selectors.Rols;
    }
  }

}
