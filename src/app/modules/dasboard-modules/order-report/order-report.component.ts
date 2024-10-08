import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { DialogParams } from 'src/app/core/models/dialogParams.model';
import { DaumModel, PaginationRuleModel, ReportsResponseModel } from 'src/app/core/models/reportsResponse.model';
import { ResponseBase } from 'src/app/core/models/responseBase.model';
import { ReportsRepository } from 'src/app/core/repositories/reportsCash.respository';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelect } from '@angular/material/select';
import { Observable, ReplaySubject } from 'rxjs';
import { UploadFileResponseModel, UploadtypeOfCashRequestModel } from 'src/app/core/models/uploadTypeOfCash.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DownloadFormatResponseModel } from 'src/app/core/models/downloadFormat.model';
import { getSession } from 'src/app/utils/storage';
import { TypeModelRequestModel } from 'src/app/core/models/typeCashRequest.model';
import { GTMSelectContent } from 'src/app/core/models/gtmSelectContent.model';
import { GtmDispatchEventsRepository } from 'src/app/core/repositories/gtmDispatchEvent.repository';
import { LoginResponseModel } from 'src/app/core/models/loginResponse.model';





@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {

  processesData: DaumModel[] = [];
  processesDataFiltered: DaumModel[] = [];
  pagination: PaginationRuleModel = {
    PageSize: 10,
    PageNumber: 0,
    TotalElements: 0,
    TotalPages: 0
  };
  selectedValue: number | null = null;
  fileName: string = 'Sube un archivo con los pedidos';
  fileExtension!: string;
  base64Output!: string;
  @ViewChild('selectRef') selectRef!: MatSelect;
  @ViewChild('inputFile') inputFile!: ElementRef;
  selected: boolean = false;
  typecash!: number;
  programId: number = Number(getSession('programId')) as number;
  alerTextError: boolean = false;

  constructor(
    private reportsRepository: ReportsRepository,
    private dialogService: DialogService,
    private paginator: MatPaginatorIntl,
    private toastrService: ToastrService,
    private gtmEventRepository: GtmDispatchEventsRepository
  ) {
  }

  ngOnInit(): void {
    this.paginator.itemsPerPageLabel = "Ítems por página:";
  }

  /**
   * Actualiza el valor seleccionado.
   *
   * @param value - El nuevo valor seleccionado.
   */
  onSelectionChange(value: number): void {
    this.selectedValue = value;
  }


  /**
   * Descarga una plantilla de formato.
   *
   * @param event - El evento que desencadenó la descarga de la plantilla.
   * @returns Nada.
   */
  downloadTemplate(event: any) {
    const ProgramId = this.programId;
    const ConceptId = event;
    this.sendGtmDashboard(ConceptId == 297 ? 'Tipo Cash-Descargar formato' : 'Tipo Cash-Generar reporte');
    this.reportsRepository.downloadFormat(ProgramId, ConceptId).subscribe({
      next: (response: ResponseBase<DownloadFormatResponseModel>) => {
        window.open(response.data.ParametersList[0].ParameterValue, '_blank');
      },
      error: (error: HttpErrorResponse) => {
        this.toastrService.error(error.message, undefined, {
          timeOut: 9000,
          progressBar: true,
          progressAnimation: 'increasing',
          tapToDismiss: false,
          positionClass: 'toast-top-center',
          closeButton: true,
        });
        return;
      },
    });
  }

  /**
   * Abre un cuadro de diálogo de errores.
   *
   * @param RedemptionProcessId - El ID del proceso de redención.
   */
  openErrorPopUp(RedemptionProcessId: number) {
    let params: DialogParams = {
      success: false,
      confirmText: "",
      settlementId: RedemptionProcessId,
    };
    this.dialogService.openErrorsDialog(params);
  }


  /**
   * Procesa la acción de subir un archivo de pedidos.
   *
   * @remarks
   * Este método se utiliza para procesar la acción de subir un archivo de pedidos. Verifica si se ha seleccionado un archivo válido y lo envía al servidor para su procesamiento.
   * Si el archivo no es válido, se muestra un diálogo de confirmación con un mensaje de error.
   *
   * @param fileName - El nombre del archivo seleccionado.
   * @param typecash - El tipo de efectivo seleccionado.
   * @param fileExtension - La extensión del archivo seleccionado.
   * @param base64Output - El contenido del archivo seleccionado en formato base64.
   *
   * @returns No devuelve ningún valor.
   */
  goProcessing() {
    if (this.fileName === 'Sube un archivo con los pedidos') {
      let params: DialogParams = {
        success: true,
        error: true,
        isbutton: true,
        buttonNavigationText: "Aceptar",
        confirmText: "Debes subir un archivo con los pedidos."
      };

      this.dialogService.openConfimDialog(params).afterClosed().subscribe((resp)=>{
        this.sendGtmDashboard('Tipo Cash-Aceptar')

      });
      return;
    }
    this.sendGtmDashboard('Tipo Cash-Procesar');
    let request: UploadtypeOfCashRequestModel = {
      TypeOfCash: +this.typecash,
      File: {
        Name: this.fileName,
        Extension: this.fileExtension,
        Data: this.base64Output
      }
    }

    this.reportsRepository.uploadTypeOfCash(request).subscribe({
      next: (res: ResponseBase<UploadFileResponseModel>) => {

        let params: DialogParams = {
          isbutton: false,
          success: true,
          navigation: 'main/dashboard/order-report',
          confirmText: "Tu archivo está siendo procesado y tardará un momento en finalizar. Consulta el estado en la tabla de carga de pedidos.",
        };
        this.dialogService.openConfimDialog(params);

        this.fileName = '';
        this.inputFile.nativeElement.value = "";
        this.selected = false;

      },

      error: (error: HttpErrorResponse): void => {
        let message = error.error?.errorMessag || 'Ocurrió un error desconocido';
        let params: DialogParams = {
          success: true,
          confirmText: message,
          error: true,
          isbutton: false,
        }
        this.dialogService.openConfimDialog(params);
      }
    });
  }


  /**
   * Obtiene el tipo de caso.
   *
   * @param value - El valor del tipo de caso.
   * @param pageNumber - El número de página.
   * @param pageSize - El tamaño de página.
   */
  getTypeCase(value: number, pageNumber: number, pageSize: number): void {
    this.selectedValue = value;
    this.typecash = value;

    let data: TypeModelRequestModel = {
      RedemptionProcessId: value,
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    this.reportsRepository.getTypeCash(data).subscribe({
      next: (response: ResponseBase<ReportsResponseModel>): void => {
        this.processesData = response.data.Processes.Data;
        this.pagination = response.data.Processes.Pagination;

        const inicio = (pageNumber - 1) * pageSize;
        this.processesDataFiltered = this.processesData.slice(inicio, inicio + pageSize);
      },
      error: (error: HttpErrorResponse): void => {
        let message = error.error?.errorMessag || 'Ocurrió un error desconocido';
        let params: DialogParams = {
          success: true,
          confirmText: message,
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
   * @param event.pageIndex - El índice de la página actual.
   * @param event.pageSize - El tamaño de página actual.
   * @returns void
   */
  onPageChange(event: PageEvent): void {
    this.pagination.PageNumber = event.pageIndex + 1;
    this.pagination.PageSize = event.pageSize;

    if (this.selectedValue !== null) {
      this.getTypeCase(this.selectedValue, this.pagination.PageNumber, this.pagination.PageSize);
    } else {
      this.updatePagination();
    }
  }

  /**
   * Actualiza la paginación de los datos filtrados.
   *
   * @param {void} - No recibe ningún parámetro.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  updatePagination(): void {
    const inicio = (this.pagination.PageNumber - 1) * this.pagination.PageSize;
    this.processesDataFiltered = this.processesData.slice(inicio, inicio + this.pagination.PageSize);
  }


  /**
   * Maneja el evento de selección de archivo.
   *
   * @param event - El evento de selección de archivo.
   * @returns void
   */
  onFileSelected(event: any) {
    this.sendGtmDashboard('Tipo Cash-Subir archivo');
    const file: File = event.target.files[0];
    if (!this.isExcelFile(file)) {
      this.alerTextError = true;
      this.toastrService.error('Error al subir archivo', undefined, {
        timeOut: 9000,
        progressBar: true,
        disableTimeOut: 'extendedTimeOut',
        progressAnimation: 'increasing',
        tapToDismiss: false,
        positionClass: 'toast-top-center',
        closeButton: true,
      });
      return;
    }
    this.alerTextError = false;
    this.fileName = this.getFileNameWithoutExtension(file.name);
    this.fileExtension = this.getFileExtension(file.name);
    this.convertFile(file).subscribe(base64 => {
      if (this.selectRef && this.selectRef.value) {
        this.selected = true;
      }

      this.base64Output = base64;
      this.toastrService.success('Archivo subido con éxito', undefined, {
        timeOut: 9000,
        progressBar: true,
        disableTimeOut: 'extendedTimeOut',
        progressAnimation: 'increasing',
        tapToDismiss: false,
        positionClass: 'toast-top-center',
        closeButton: true,
      });
    });
  }


  /**
   * Convierte un archivo a una cadena base64.
   *
   * @param file - El archivo a convertir.
   * @returns Una cadena Observable que representa el archivo convertido en base64.
   */
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      if (event && event.target && event.target.result) {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binaryString += String.fromCharCode(uint8Array[i]);
        }
        const base64String = btoa(binaryString);
        result.next(base64String);
      }
    };
    return result;
  }

  /**
   * Obtiene el nombre de archivo sin la extensión.
   *
   * @param filename - El nombre del archivo con extensión.
   * @returns El nombre del archivo sin la extensión.
   */
  getFileNameWithoutExtension(filename: string): string {
    return filename.split('.').slice(0, -1).join('.');
  }

  /**
   * Obtiene la extensión de un archivo.
   *
   * @param filename - El nombre del archivo del cual se desea obtener la extensión.
   * @returns La extensión del archivo, incluyendo el punto (.) inicial, o una cadena vacía si no tiene extensión.
   */
  getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? '.' + parts[parts.length - 1] : '';
  }

  /**
   * Comprueba si el archivo es un archivo de Excel.
   *
   * @param file - El archivo a comprobar.
   * @returns Devuelve true si el archivo es un archivo de Excel (extensión .xlsx), de lo contrario devuelve false.
   */
  isExcelFile(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension === 'xlsx';
  }


  /**
   * Envía un evento de GTM para el panel de control.
   *
   * @param text - El texto asociado al evento.
   */
  sendGtmDashboard(text: string) {
    const loginUser: LoginResponseModel = getSession<LoginResponseModel>('userLoginData')!;
    let tagData: GTMSelectContent = {
      event: "Select_content",
      ParameterTarget: "Home",
      ParameterType: 'button',
      ParameterLocation: 'Cabecera',
      ParameterCategory: 'Home - Pedidos Tipo Cash',
      IDAccount: '',
      IDProgram: loginUser.programId,
      IDPerson: loginUser.personId,
      UserName: loginUser.userName,
      ParameterText: text,
      ParameterItemID: "0",
    };
    this.gtmEventRepository.sendEvent(tagData);
  }

}
