import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {

  @Input() paginate: any = {};

  @Output() pageCurrent = new EventEmitter<number>();

  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 0;
  rangeInit: number = 0;
  rangeEnd: number = 0;
  currentPage: number = 1;
  itemsCurrentForPage: number = 0;

  constructor() {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginate'].currentValue) {
      this.totalElements = changes['paginate'].currentValue.totalElements;
      this.totalPages = changes['paginate'].currentValue.totalPages;
      this.pageSize = changes['paginate'].currentValue.pageSize;
      this.currentPage = changes['paginate'].currentValue.currentPage;
      this.itemsCurrentForPage = changes['paginate'].currentValue.itemsCurrentForPage;
      this.getPaginate();
    }
  }

  /**
   * Obtiene la paginación de los elementos.
   *
   * @returns {void}
   */
  getPaginate() {
    if (this.currentPage === 1) {
      this.rangeEnd = this.itemsCurrentForPage;
      this.rangeInit = this.currentPage;
    } else {
      this.rangeInit = (this.currentPage * this.pageSize - (this.pageSize - 1));
      this.rangeEnd = Math.min(this.rangeInit + this.pageSize - 1, this.totalElements);
    }
  }

  /**
 * Obtiene la última página.
 *
 * Si el número total de páginas es diferente de cero y la página actual es menor que el número total de páginas,
 * establece la página actual como la última página y emite el evento `pageCurrent` con el valor de la página actual.
 *
 * @returns {void}
 */
  getLastPage() {
    if (this.totalPages !== 0 && this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.pageCurrent.emit(this.currentPage);
    }
  }

  /**
    * Obtiene la primera página.
    *
    * Si el número total de páginas es diferente de cero y la página actual no es la primera,
    * establece la página actual como la primera página y emite el evento `pageCurrent`.
    *
    * @returns {void}
    */
  getFirstPage() {
    if (this.totalPages !== 0 && this.currentPage !== 1) {
      this.currentPage = 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }



  /**
   * Obtiene la siguiente página.
   *
   * @returns {void}
   * @description Incrementa el valor de la página actual y emite el evento `pageCurrent` con el nuevo valor de la página actual.
   */
  getNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }

  /**
   * Obtiene la página anterior.
   *
   * @returns {void} No devuelve ningún valor.
   * @description Este método disminuye el valor de la página actual en 1 y emite el evento `pageCurrent` con el nuevo valor de la página actual.
   */
  getPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.pageCurrent.emit(this.currentPage);
    }
  }


}
