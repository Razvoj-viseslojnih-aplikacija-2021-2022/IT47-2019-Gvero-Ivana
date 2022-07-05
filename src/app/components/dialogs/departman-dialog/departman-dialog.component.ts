import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

   public flag: number;
   fakulteti: Fakultet[];


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Departman,
    public departmanService: DepartmanService,
    public fakultetService: FakultetService) { }

  ngOnInit(): void {
   this.fakultetService.getAllFakultets().subscribe(
    data => 
    {
      this.fakulteti = data;
    }

   );
  }
   public compare(a:any, b:any)
  {
    return a.id == b.id;
  }
  public addDepartman(): void {
    this.departmanService.addDepartman(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat departman: ' + this.data.id, 'OK', {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske ' , 'Zatvori', {
          duration: 2500
        })
      }
     })
  }

  public updateDepartman(): void {
    this.departmanService.updateDepartman(this.data).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen departman: ' + this.data.id, 'OK', {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske ' , 'Zatvori', {
          duration: 2500
        })
      }
     })
  }

  public deleteDepartman(): void {
    this.departmanService.deleteDepartman(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno izbrisan departman: ' + this.data.naziv, 'OK', {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske ' , 'Zatvori', {
          duration: 2500
        })
      }
     })
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste ', 'Zatvori', {
      duration: 1500
    })
  }

  



}
