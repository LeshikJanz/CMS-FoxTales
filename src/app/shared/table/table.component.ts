import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ICol } from './col.interface';
import { ITableAction } from './action.interface';

@Component({
  selector: 'data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./styles/style.scss']
})
export class TableComponent implements OnInit {
  /**
   * Table rows
   *
   * @type {any[]}
   */
  @Input()
  public rows: any[];

  /**
   * Table columns
   *
   * @type {ICol[]}
   */
  @Input()
  public cols: ICol[];

  /**
   * Total rows
   *
   * @type {number}
   */
  @Input()
  public rowsCount: number = 0;

  /**
   * Row actions
   *
   * @type {ITableAction[]}
   */
  @Input()
  public actions: ITableAction[];

  /**
   * Row click event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public rowClicked: EventEmitter<any> = new EventEmitter();

  /**
   * Sort changed event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public sortChanged: EventEmitter<ICol> = new EventEmitter();

  /**
   * Limit changed event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public limitChanged: EventEmitter<number> = new EventEmitter();

  /**
   * Search changed event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public searchChanged: EventEmitter<any> = new EventEmitter();

  /**
   * Page changed event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public pageChanged: EventEmitter<number> = new EventEmitter();

  /**
   * Action event emitter
   *
   * @type {EventEmitter}
   */
  @Output()
  public actionChanged: EventEmitter<any> = new EventEmitter();

  /**
   * Search query
   *
   * @type {Object}
   */
  public searchQuery: {
    [index: string]: Subject<string>;
  } = {};

  /**
   * Search fields
   *
   * @type {Object}
   */
  public searchFields: {
    [index: string]: string;
  } = {};

  /**
   * Page number
   *
   * @type {number}
   */
  public page: number = 1;

  /**
   * Limits
   *
   * @type {number[]}
   */
  public limits: number[] = [ 10, 25, 50, 100 ];

  /**
   * Limit per page
   *
   * @type {number}
   */
  public limit: number = 10;

  /**
   * Start offset
   *
   * @type {number}
   */
  public startOffset: number = 1;

  /**
   * End offset
   *
   * @type {number}
   */
  public endOffset: number = 10;

  /**
   * Sort direction
   *
   * true - ASC
   * false - DESC
   *
   * @type {boolean}
   */
  public sort: boolean = true;

  /**
   * Current action
   *
   * @type {ITableAction}
   */
  public currentAction: ITableAction;

  /**
   * On directive init
   *
   * @returns {void}
   */
  public ngOnInit(): void {
    this.buildSearch();
  }

  /**
   * Emit open search field
   *
   * @param {ICol} col
   * @returns {void}
   */
  public openSearch(col: ICol): void {
    col.isSearchOpen = !col.isSearchOpen;
  }

  /**
   * Build search form
   *
   * @returns {void}
   */
  public buildSearch(): void {
    this.cols.forEach((col: ICol) => {
      if (!col.searchable) {
        return;
      }

      this.searchQuery[col.id] = new Subject<string>();
      this.searchQuery[col.id]
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe((query: string) => {
          if (query) {
            this.searchFields[col.id] = query;
          } else {
            delete this.searchFields[col.id];
          }

          this.searchChanged.emit(this.searchFields);
        });
    });
  }

  /**
   * Emit row clicked event
   *
   * @param {any} row
   * @returns {void}
   */
  public clickRow(row: any): void {
    this.rowClicked.emit(row);
  }

  /**
   * Emit sort changed event
   *
   * @param {ICol} sortCol
   * @returns {void}
   */
  public changeSort(sortCol: ICol): void {
    this.cols.forEach((col: ICol) => {
      if (col.id !== sortCol.id && col.sort) {
        col.sort = true;
      }
    });

    sortCol.sort = !sortCol.sort;

    this.sortChanged.emit(sortCol);
  }

  /**
   * Emit limit changed event
   *
   * @param {number} limit
   * @returns {void}
   */
  public changeLimit(limit: number): void {
    this.page = 1;
    this.changePage();

    this.limitChanged.emit(limit);
  }

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public changePage(): void {
    this.startOffset = (this.page - 1) * this.limit + 1;
    this.endOffset = (this.rowsCount < this.page * this.limit)
      ? this.rowsCount
      : this.page * this.limit;

    this.pageChanged.emit(this.page);
  }

  /**
   * Action changed event
   *
   * @returns {void}
   */
  public changeAction(id: number, event ): void {
    event.id = id;
    this.actionChanged.emit(event);
  }

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public prevPage(): void {
    if (this.isPrevPage()) {
      this.page--;
    }

    this.changePage();
  }

  /**
   * Emit page changed event
   *
   * @returns {void}
   */
  public nextPage(): void {
    if (this.isNextPage()) {
      this.page++;
    }

    this.changePage();
  }

  /**
   * Is prev page active?
   *
   * @returns {boolean}
   */
  public isPrevPage(): boolean {
    return this.page > 1;
  }

  /**
   * Is next page active?
   *
   * @returns {boolean}
   */
  public isNextPage(): boolean {
    return this.page < Math.ceil(this.rowsCount / this.limit);
  }
}
