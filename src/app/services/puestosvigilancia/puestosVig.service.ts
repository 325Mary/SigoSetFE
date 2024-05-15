import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuestosVigilanciaService {

  private baseUrl = environment.apiUrl; 

  constructor(private httpClient: HttpClient) { }

  obtenerPuestos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}optenertodospuestosvig`);
  }

  obtenerPuestoPorId(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}obtenerpuestovigporid/${id}`);
  }

  crearPuesto(puestoData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}crearpuestovig`, puestoData);
  }

  editarPuesto(id: number, nuevoPuestoData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}editarpuestovig/${id}`, nuevoPuestoData);
  }

  eliminarPuesto(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}eliminarpuestovig/${id}`);
  }

  calcularT
  calcularTotal(tarifa: number, ays: number): number {
      const iva = tarifa * 0.19;
      const total = tarifa + iva + ays;
      return total;
    }
    


}
// const PuestoVigilancia = require('../models/model');

// exports.getPuestos = async function(req, res) {
//     try {
//         const puestos = await PuestoVigilancia.findAll();
//         return res.json(puestos);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error al obtener los puestos' });
//     }
// };

// exports.createPuesto = async function(req, res) {
//     try {
//         const puestoData = req.body;
//         const result = await PuestoVigilancia.create(puestoData);
//         return res.json(result);
//     } catch (error) {
//         return res.status(400).json({ error: 'Error al crear el puesto' });
//     }
// };

// exports.editPuesto = async function(req, res) {
//     try {
//         const { id } = req.params;
//         const nuevoPuestoData = req.body;
//         const result = await PuestoVigilancia.update(id, nuevoPuestoData);
//         return res.json(result);
//     } catch (error) {
//         return res.status(400).json({ error: 'Error al editar el puesto' });
//     }
// };

// exports.deletePuesto = async function(req, res) {
//     try {
//         const { id } = req.params;
//         const result = await PuestoVigilancia.deleteById(id);
//         return res.json(result);
//     } catch (error) {
//         return res.status(400).json({ error: 'Error al eliminar el puesto' });
//     }
// };

