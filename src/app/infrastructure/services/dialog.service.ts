import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogParams } from "src/app/core/models/dialogParams.model";
import { MatConfirmBtnDialogComponent } from "src/app/shared/mat-confirm-btn-dialog/mat-confirm-btn-dialog.component";
import { MatErrorsDialogComponent } from "src/app/shared/mat-errors-dialog/mat-errors-dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {

  constructor(private dialog: MatDialog) {

  }

  /**
 * Abre un diálogo de errores.
 *
 * @param params Los parámetros para el diálogo.
 * @returns Una referencia al diálogo abierto.
 */
  openErrorsDialog(params: DialogParams) {
    return this.dialog.open(MatErrorsDialogComponent, {
      width: '624px',
      panelClass: 'dialog-popup-code',
      data: params
    });
  }


  /**
   * Abre un diálogo de confirmación.
   *
   * @param params Los parámetros del diálogo.
   * @returns Una referencia al diálogo abierto.
   */
  openConfimDialog(params: DialogParams) {
    return this.dialog.open(MatConfirmBtnDialogComponent, {
      width: '624px',
      panelClass: 'dialog-popup-code',
      data: params
    });
  }


}
