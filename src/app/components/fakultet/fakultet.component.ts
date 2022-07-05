import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';
import { FakultetDialogComponent } from '../dialogs/fakultet-dialog/fakultet-dialog.component';

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html',
  styleUrls: ['./fakultet.component.css']
})
export class FakultetComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'naziv', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Fakultet>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor( private fakultetService: FakultetService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   
  }
 
  ngOnInit(): void {

    this.loadData();
  }

  public loadData()
{
 this.subscription = this.fakultetService.getAllFakultets().subscribe(
   data => {
     this.dataSource =  new MatTableDataSource(data);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   }
   
 ),
 (error: Error) => 
 {
   console.log(error.name + ' ' + error.message);
 }


}
public openDialog(flag: number, id?: number, naziv?: string, sediste?: string): void{
  const dialogRef= this.dialog.open(FakultetDialogComponent, {data: {id, naziv, sediste}} );

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
