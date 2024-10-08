import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { DaumErrorsModel, ErrorsReportsResponseModel, PaginationErrorsRuleModel } from 'src/app/core/models/ErrorsReportsResponse.model';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TypeOrdersService } from 'src/app/infrastructure/services/type-orders.service';
import { DetailTypeModelRequestModel } from 'src/app/core/models/detailTypeCashRequest.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogParams } from 'src/app/core/models/dialogParams.model';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';





@Component({
  selector: 'app-mat-errors-dialog',
  templateUrl: './mat-errors-dialog.component.html',
  styleUrls: ['./mat-errors-dialog.component.scss'],
  providers: [
    {
      provide: ReportsRepository,
      useClass: TypeOrdersService,
    },
  ]
})

export class MatErrorsDialogComponent implements OnInit {

  processesData: DaumErrorsModel[] = [];
  processesDataFiltered: DaumErrorsModel[] = [];
  pagination: PaginationErrorsRuleModel = {
    PageSize: 10,
    PageNumber: 1,
    TotalElements: 0,
    TotalPages: 0
  };
  idationErrors!: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatErrorsDialogComponent>,
    private reportsRepository: ReportsRepository,
    private paginator: MatPaginatorIntl,
    private dialogService: DialogService,

  ) {
    this.idationErrors = data.settlementId;
    document.addEventListener('closePopUp', () => {
      if (dialogRef) {
        this.dialogRef.close(false);
      }
    });
  }

  ngOnInit() {
    this.paginator.itemsPerPageLabel = "Ítems por página:";
    this.getTypeCashErrors(this.idationErrors, this.pagination.PageNumber, this.pagination.PageSize);
  }



  /**
   * Obtiene los errores de tipo efectivo.
   *
   * @param value - El valor del proceso de redención.
   * @param pageNumber - El número de página.
   * @param pageSize - El tamaño de página.
   */
  getTypeCashErrors(value: number, pageNumber: number, pageSize: number) {

    let data: DetailTypeModelRequestModel = {
      RedemptionProcessDetailId: value,
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    this.reportsRepository.getErrorProcessesTypeCash(data).subscribe({
      next: (response: ResponseBase<ErrorsReportsResponseModel>) => {
        this.processesData = response.data.Errors.Data;
        this.pagination = response.data.Errors.Pagination;

        const inicio = (pageNumber - 1) * pageSize;
        this.processesDataFiltered = this.processesData.slice(inicio, inicio + pageSize);
      },
      error: (error: HttpErrorResponse): void => {
        let params: DialogParams = {
          success: true,
          confirmText: error.error.message,
          error: true,
          isbutton: false,
        }
        this.dialogService.openConfimDialog(params);
      }
    });
  }

  /**
   * Maneja el evento de cambio de página.
   *
   * @param event - El objeto que contiene la información del evento de cambio de página.
   * @param event.pageIndex - El índice de la página seleccionada.
   * @param event.pageSize - El tamaño de la página seleccionada.
   * @returns No devuelve ningún valor.
   */
  onPageChange(event: PageEvent) {
    this.pagination.PageNumber = event.pageIndex + 1;
    this.pagination.PageSize = event.pageSize;

    if (this.idationErrors !== null) {
      this.getTypeCashErrors(this.idationErrors, this.pagination.PageNumber, this.pagination.PageSize);
    } else {
      this.updatePagination();
    }
  }

  /**
   * Actualiza la paginación de los datos.
   *
   * @param inicio - El índice de inicio para la paginación.
   * @param fin - El índice de fin para la paginación.
   */
  updatePagination(): void {
    const inicio = (this.pagination.PageNumber - 1) * this.pagination.PageSize;
    const fin = inicio + this.pagination.PageSize;
    this.processesDataFiltered = this.processesData.slice(inicio, inicio + this.pagination.PageSize);
  }

  /**
   * Cierra el diálogo.
   *
   * @param {boolean} [returnValue=false] - Valor de retorno opcional. Por defecto es `false`.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }
}
