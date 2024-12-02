import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ITransaction } from '../../models/transaction.interface'
import { CommonModule, TitleCasePipe } from '@angular/common'
import { CurrencyPipe } from '../../pipes/currencyFormat.pipe'
import { MatButtonModule } from '@angular/material/button'
import { DateFormatPipe } from '../../pipes/dateFormat.pipe'
import { COLUMNS } from '../../models/transaction.const'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TitleCasePipe,
    CommonModule,
    CurrencyPipe,
    DateFormatPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, AfterViewInit, OnChanges {
  public displayedColumns: string[] = COLUMNS;
  public dataSource!: MatTableDataSource<ITransaction>

  @Input() items: ITransaction[] = []
  @Output() updateValue = new EventEmitter<ITransaction>()
  @Output() deleteValue = new EventEmitter<number>()

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.dataSource = new MatTableDataSource(this.items)
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }
      if (this.sort) {
        this.dataSource.sort = this.sort
      }
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  public updateData(data: ITransaction) {
    this.updateValue.emit(data)
  }

  public deleteData(id: number) {
    this.deleteValue.emit(id)
  }

  public applyFilter(event: Event | any) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
