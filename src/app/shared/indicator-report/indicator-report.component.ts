import { Component, Input, OnInit } from '@angular/core';
import { IndicatorModel } from '../../core/models/IndicatorResponse.model';
import { CompliancesInfoModel } from 'src/app/core/models/Compliances.model';

@Component({
  selector: 'app-indicator-report',
  templateUrl: './indicator-report.component.html',
  styleUrls: ['./indicator-report.component.scss']
})
export class IndicatorReportComponent implements OnInit {

  @Input() indicators!: CompliancesInfoModel[];
  @Input() user!: any;

  constructor() { }

  ngOnInit(): void {
 
  }

}
