import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contacto } from './contacto';
import { Response } from './response';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  private contactValues = new BehaviorSubject<{}>({});
  public contactValues$ = this.contactValues.asObservable();

  setContactValues(contact: Contacto, operation: string) {
    this.contactValues.next({ contact, operation });
  }

  urlBase = 'http://localhost:8080/api/contacts';

  getContacts() {
    return this.http.get<Response>(this.urlBase);
  }

  newContact(contact: Contacto) {
    return this.http.post<Response>(this.urlBase + '/new', contact);
  }

  updateContact(contact: any) {
    return this.http.put<Response>(this.urlBase + '/update', contact);
  }

  SoftDeleteContact(contacto: any) {
    return this.http.patch(this.urlBase + '/delete/' + 'soft', contacto);
  }

  HardDeleteContact(id: any) {
    return this.http.delete(this.urlBase + '/delete/' + id);
  }
}
