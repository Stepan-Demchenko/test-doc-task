import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PictureDocument } from '../models/picture-document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly http: HttpClient) { }

  getDocuments(): Observable<PictureDocument[]> {
    return this.http.get<PictureDocument[]>('/assets/data/mockup.json');
  }
}
