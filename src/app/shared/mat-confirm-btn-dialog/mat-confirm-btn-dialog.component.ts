import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';


@Component({
  selector: 'app-mat-confirm-btn-dialog',
  templateUrl: './mat-confirm-btn-dialog.component.html',
  styleUrls: ['./mat-confirm-btn-dialog.component.scss']
})
export class MatConfirmBtnDialogComponent {

  dialogService = inject(DialogService);

  dialogIcon = "";
  confirmText = "";
  title = '';
  btn1_message = '';
  btn2_message = '';
  isBtn = false
  redirect!: string;
  textData!: string;
  idImgAward!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmBtnDialogComponent>,
    private router: Router,
  ) {
    this.confirmText = data.confirmText;
    this.title = data.title;
    this.dialogIcon = data.success ? "../../../assets/check_ok.svg" : "../../../assets/alert.png";
    this.dialogIcon = data.error ? "../../../assets/error.svg" : data.success ? "../../../assets/check_ok.svg" : "../../../assets/alert.png";
    this.btn1_message = data.buttonNavigationText;
    this.btn2_message = data.buttonSecondNavigationText;
    this.isBtn = data.isbutton;
    this.redirect = data.navigation;
    this.textData = data.parameterText;
    this.idImgAward = data.settlementId;
  }

  /**
   * Cierra el diálogo y realiza una acción opcional de redireccionamiento.
   *
   * @param {boolean} redirect - Indica si se debe realizar una redirección después de cerrar el diálogo.
   * @returns {void}
   */
  closeDialog() {
    this.dialogRef.close(false);
    if (this.redirect) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.redirect]);
      });
    }
  }

}
