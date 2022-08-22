import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STUDENT_DEP_URL, STUDENT_URL } from '../app.constants';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudentiZaDepartman(idDepartmana: number): Observable<any>
  {
    return this.httpClient.get(`${STUDENT_DEP_URL}/${idDepartmana}`);
  }

  public addStudent(student: Student): Observable<any>
  {
    student.id = 100000;
    return this.httpClient.post(`${STUDENT_URL}`, student)
  }

  public updateStudent(student: Student): Observable<any> {
    return this.httpClient.put(`${STUDENT_URL}`, student);
  }
  public deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete(`${STUDENT_URL}/${id}`);
  }

  




}
