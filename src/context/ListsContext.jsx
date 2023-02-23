import { createContext } from "react";
import img from '../img/logo.png'
import { useState, useEffect } from "react";
import Axios from '../lib/axios'
//!Exportaciones


export const ListsContext = createContext();


//!Punto de referencia

async function datosListUsuario (){

  try {
      const peticion = await Axios.get('/userdats');

      return peticion.data;
  } catch (error) {
      console.error(error)
  }
}

async function datosListCliente (){

  try {
      const peticion = await Axios.get('/clientdats'); //SELECTS

      return peticion.data;
  } catch (error) {
      console.error(error)
  }
}

async function datosListProducto (){

  try {
      const peticion = await Axios.get('/productsdats'); //SELECTS

      return peticion.data;
  } catch (error) {
      console.error(error)
  }
}

async function datosListCotizacion (){

  try {
      const peticion = await Axios.get('/quotationDats'); //SELECTS

      console.log(peticion);

      return peticion.data;
  } catch (error) {
      console.error(error)
  }
}

//!Traer datos de clientes solo el nombre y datos importantes

async function datosClienteOrden() {
  try {
    const peticion = await Axios.get("/clientesorden");

    return peticion.data;
  } catch (error) {
    console.error(error);
  }
}

async function datosProductos() {
  try {
    const peticion = await Axios.get("/datosproductos");
    return peticion.data;
  } catch (error) {
    console.log("Error en la peticion en base de datos");
    console.error(error);
  }
}

  
const envio = {
  datosListUsuario,
  datosListCliente,
  datosListProducto,
  datosListCotizacion,
  datosClienteOrden,
  datosProductos,
}



export function ListsContextProvider(props) {


  return (
    <ListsContext.Provider value={
      envio
    }>
      {props.children}
    </ListsContext.Provider>
  );
}
