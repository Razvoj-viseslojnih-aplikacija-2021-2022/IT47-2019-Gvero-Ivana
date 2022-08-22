import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
import { Student } from 'src/app/models/student';
import { StatusService } from 'src/app/services/status.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
   
  statusi: Status[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService,
    public statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getAllStatuses().subscribe(
      statusi => 
      {
        this.statusi = statusi;
      }
  
     ),
     (error: Error) =>
      {
        console.log(error.name + ' ' +  error.message);
      }
  }
   public compare(a: any,b: any)
  {
    return a.id==b.id;
  }

  public addStudent() {
    this.studentService.addStudent(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali studenta: " + data.ime, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }
  

  public updateStudent(): void {
    this.studentService.updateStudent(this.data).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen student: ' + this.data.id, 'OK', {
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

  public deleteStudent(): void {
    this.studentService.deleteStudent(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno izbrisan student: ' + this.data.id, 'OK', {
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
