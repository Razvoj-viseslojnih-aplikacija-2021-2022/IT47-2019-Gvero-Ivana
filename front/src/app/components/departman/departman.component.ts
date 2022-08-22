import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { DepartmanDialogComponent } from '../dialogs/departman-dialog/departman-dialog.component';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource: MatTableDataSource<Departman>;
  selectedDepartman: Departman;
  subscription: Subscription; 
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  

  constructor(private departmanService: DepartmanService,
       private dialog: MatDialog) { }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
       
      }

  ngOnInit(): void {
    this.loadData();
  }

  selectRow(row: any)
  {
 this.selectedDepartman = row;
 console.log(this.selectedDepartman);
  }


  loadData()
  {
   this.subscription = this.departmanService.getAllDepartmani().subscribe(data => {
    this.dataSource =  new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }),
  
 (error: Error) => 
 {
   console.log(error.name + ' ' + error.message);
 }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?:Fakultet): void{
    const dialogRef= this.dialog.open(DepartmanDialogComponent, {data: {id, naziv, oznaka, fakultet}} );
  
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
  
      if(res==1)
      {
        this.loadData();
      }
    })
  }

  public applyFilter(filter:any){
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }





}
