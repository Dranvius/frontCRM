//REACT HOOK CONTEXT
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Constante de contexto de la lista
import { ListsContext } from "../context/ListsContext";
//Axios
import axios from "../lib/axios";
//Sweet Alert
import Swal from "sweetalert2";
//Importar al usuario que use el login
import { useAuthStore } from "../storage/globalStorage";

export function CrearPDF(props) {
  const profile = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  // crea un nuevo objeto `Date`

  var today = new Date();

  // obtener la fecha de hoy en formato `MM/DD/YYYY`

  var now = today.toLocaleDateString("en-US");
  console.log(now);

  //USE STATE

  const [cliente, setCliente] = useState([]);
  const [producto, setProducto] = useState([]);
  const [conteo, setConteo] = useState(1);

  //USE CONTEXT

  const ContextoObjetos = useContext(ListsContext);

  //USE EFFECT

  console.log(ContextoObjetos);

  useEffect(() => {
    async function fetchData() {
      try {
        const dats = await ContextoObjetos.datosClienteOrden();
        const datsProduct = await ContextoObjetos.datosProductos();

        setCliente(dats);
        setProducto(datsProduct);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const ToastValidate = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const ToastNegative = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const cotizacionBTN = async () => {
    /* inputOptions can be an object or Promise */
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          true: "Si",
          false: "No",
        });
      }, 1000);
    });

    const { value: opcion } = await Swal.fire({
      icon: "question",
      iconColor: "blue",
      title: "Desea Crear una cotización",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas escoger un valor!";
        }
      },
    });

    if (opcion === "true") {
      console.log(cliente);

      const clientes = [];

      for (let i = 0; i < cliente.length; i++) {
        clientes.push(cliente[i].firstname + " " + cliente[i].lastname);
      }
      const { value: indice } = await Swal.fire({
        title: "Selecionar Cliente",
        input: "select",
        inputOptions: {
          clientes,
        },
        inputPlaceholder: "Seleccione cliente a realizar cotización",
        showCancelButton: true,
        inputValidator: async (value) => {
          return new Promise(async (resolve) => {
            if (value) {
              const peticion = clientes[value];
              const peticionCliente = await axios.post("/cotizacionStart", {
                informacion: peticion,
              });

              const datosUsarioSeleccionado = peticionCliente.data;

              //                  resolve();

              if (datosUsarioSeleccionado) {
                console.log(datosUsarioSeleccionado);
                const { value: informacionCliente } = await Swal.fire({
                  title: "Datos del cliente para la cotización son :",
                  html:
                    '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value=' +
                    datosUsarioSeleccionado[0].firstname +
                    ">" +
                    '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value=' +
                    datosUsarioSeleccionado[0].lastname +
                    ">" +
                    '<input id="swal-input3" class="swal2-input" placeholder="Apellido" value=' +
                    datosUsarioSeleccionado[0].cc +
                    ">" +
                    '<input id="swal-input4" class="swal2-input" placeholder="Apellido" value=' +
                    datosUsarioSeleccionado[0].mail +
                    ">" +
                    '<input id="swal-input5" class="swal2-input" placeholder="Apellido" value=' +
                    datosUsarioSeleccionado[0].numbercelphone +
                    ">",
                  focusConfirm: false,
                  preConfirm: async () => {
                    return [
                      document.getElementById("swal-input1").value,
                      document.getElementById("swal-input2").value,
                      document.getElementById("swal-input3").value,
                      document.getElementById("swal-input4").value,
                      document.getElementById("swal-input5").value,
                      datosUsarioSeleccionado[0].id_client
                    ];
                  },
                });

                if (informacionCliente) {
                  Swal.fire(JSON.stringify(informacionCliente));

                  let html = "";

                  producto.map((objeto, key) => {
                    html =
                      html +
                      `<div className="productoCard" style="padding: 6px;" key=` +
                      key +
                      `>
                    <div class="card" style="">
                    <div class="number">
                    <button type="button" class="btn btn-outline-primary" onClick={document.getElementById('valor` +
                      key +
                      `').value=parseInt(document.getElementById('valor` +
                      key +
                      `').value)+1}>▲</button>
                    <input type="text" class="inputCount" value=0 id="valor` +
                      key +
                      `" />
                    <button type="button" class="btn btn-outline-primary" onClick={document.getElementById('valor` +
                      key +
                      `').value=document.getElementById('valor` +
                      key +
                      `').value-1}>▼</button>
                  </div>
                    <img class="card-img-top" src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">` +
                      objeto.nameproduct +
                      `</h5>
                      <p class="card-text">` +
                      objeto.description +
                      `</p>
                      <p class="card-text">Precio :` +
                      objeto.price +
                      `</p>
                      <p class="card-text">Descuento :` +
                      objeto.discount +
                      `</p>
                      <div class="form-check">
                      <p>Checkear producto</p>
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate` +
                      key +
                      `">
                      </div>
                      </div>
                  </div>
                  </div>`;
                  });

                  console.log(producto);

                  const { value: productosEscogidos } = await Swal.fire({
                    title: "Seleccione los productos : ",
                    html: html,
                    focusConfirm: false,
                    inputValidator: (value) => {
                      console.log("Estoy adentro");

                      if (!value) {
                        return "Necesitas escoger un valor!";
                      }
                    },
                    preConfirm: () => {
                      let check = [];
                      let nulos = [];

                      producto.map((valor, key) => {
                        check.push(
                          document.getElementById(
                            "flexCheckIndeterminate" + key
                          ).checked
                        );

                        nulos.push(
                          document.getElementById("valor" + key).value
                        );

                        console.table(check);
                        console.table(nulos);
                      });

                      console.log(!check.some((valor) => valor === true));

                      if (!check.some((valor) => valor === true)) {
                        console.log("no hay productos seleccionados");
                        Swal.close();
                        ToastNegative.fire({
                          icon: "warning",
                          title:
                            "Error en el proceso\nDebes checkear por lo menos un producto",
                        });
                      } else if (!nulos.some((valor) => valor > 0)) {
                        console.log("no hay numeros positivos");
                        Swal.close();
                        ToastNegative.fire({
                          icon: "warning",
                          title:
                            "Error en el proceso\nNo pueden existir cantidades negativos o 0!",
                        });
                      } else {
                        let ProductosSeleccionados = [];

                        producto.map((value, key) => {
                          if (
                            document.getElementById(
                              "flexCheckIndeterminate" + key
                            ).checked === true &&
                            document.getElementById("valor" + key).value > 0
                          ) {
                            value.cantidad = document.getElementById(
                              "valor" + key
                            ).value;
                            ProductosSeleccionados.push(value);
                          }
                        });

                        ToastValidate.fire({
                          icon: "success",
                          title: "Proceso finalizado",
                        });

                        return ProductosSeleccionados;
                      }
                    },
                  });

                  console.log(productosEscogidos);

                  const peticionPdf = await axios.post("/construccionPDF", {
                    cliente: informacionCliente,
                    productos: productosEscogidos,
                    usuarioCreador: profile,
                  });

                  console.log(peticionPdf);
                }
              }
            } else {
              resolve("Selecciona un cliente !");
            }
          });
        },
      });
    }
  };

  return (
    <>
      <a
        type="button"
        className="btn btn-success"
        onClick={() => {
          cotizacionBTN();
        }}
      >
        Crear cotización
      </a>
    </>
  );
}
