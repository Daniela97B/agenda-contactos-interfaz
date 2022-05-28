import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/services/contacto';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  form: FormGroup;
  contact: Contacto = {
    id: 0,
    nombre: '',
    telefono: '',
    correo: '',
    fecha_nacimiento: '',
  };

  operation: string = 'new';

  constructor(private contactService: ContactService) {
    this.form = new FormGroup({
      nombre: new FormControl(this.contact.nombre, Validators.required),
      telefono: new FormControl(this.contact.telefono, [
        Validators.pattern('[0-9]*'),
        Validators.required,
      ]),
      correo: new FormControl(this.contact.correo, Validators.email),
      fecha_nacimiento: new FormControl(this.contact.fecha_nacimiento),
    });
  }

  onSubmit() {
    if (this.operation === 'edit' && this.form.valid) {
      const contact = { ...this.form.value, id: this.contact.id };

      this.contactService.updateContact(contact).subscribe({
        next: () => {
          this.contactService.setContactValues(this.contact, 'edit');
          this.cleanForm();
        },
      });
    }

    if (this.form.valid && this.operation === 'new') {
      this.contactService.newContact(this.form.value).subscribe({
        next: (response: any) => {
          const { data } = response;
          this.contactService.setContactValues(data, 'new');
          this.cleanForm();
        },
      });
    }
  }

  fillForm() {
    if (this.contact) {
      this.form.patchValue({
        nombre: this.contact.nombre,
      });

      this.form.patchValue({
        telefono: this.contact.telefono,
      });

      this.form.patchValue({
        correo: this.contact.correo,
      });

      this.form.patchValue({
        fecha_nacimiento: this.contact.fecha_nacimiento,
      });
    }
  }

  cleanForm() {
    this.form.reset();
  }

  ngOnInit(): void {
    this.contactService.contactValues$.subscribe({
      next: (data: any) => {
        const { contact: tmp } = data;
        this.contact = tmp;
        this.operation = data.operation;
        this.fillForm();
      },
    });
  }
}
