import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contacto } from 'src/app/services/contacto';

@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  contacts: Contacto[] = [];
  switch: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((d: any) => {
      const { data } = d;
      data.forEach((contact: any) => {
        this.contacts.push(contact);
      });
    });

    this.contactService.contactValues$.subscribe({
      next: (data: any) => {
        const { contact } = data;
        console.log(data);
        if (data.operation === 'new' && contact.id !== undefined) {
          this.contacts.push(contact);
        } else if (data.operation === 'edit') {
          const index = this.contacts.indexOf(this.getContactById(contact.id));

          if (index) {
            this.contacts[index] = contact;
          }
        }
      },
    });
  }

  editar(id: number) {
    this.contactService.setContactValues(this.getContactById(id), 'edit');
    this.switch = true;
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar este contacto?')) {
      this.contactService.HardDeleteContact(id).subscribe({
        next: (d: any) => {
          this.contacts.splice(
            this.contacts.indexOf(this.getContactById(id)),
            1
          );
        },
      });
    }
  }

  newContact() {
    this.contactService.setContactValues({} as Contacto, 'new');
    this.switch = !this.switch;
  }

  getContactById(id: number) {
    return this.contacts.filter((contact) => contact.id === id)[0];
  }
}
