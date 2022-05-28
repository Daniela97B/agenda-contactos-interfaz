import { Contacto } from './contacto';

export interface Response {
  error: boolean;
  message: string;
  data: Contacto[];
}

// "data": [
//   {
//     "id": 1,
//     "nombre": "Delilah",
//     "correo": "Evaleen.Ax@yopmail.com",
//     "telefono": "3072530421",
//     "fecha_nacimiento": "1980-01-06",
//     "deleted_at": "2023-09-04"
//   }
