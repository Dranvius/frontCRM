import {NavbarLinks} from '../components/NavbarLinks';
import {TableList} from '../components/TableList.jsx';
import { useAuthStore } from "../storage/globalStorage.js"; 
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "../lib/axios";

export function ListProducts (props){

    const profile = useAuthStore((state) => state.user);


    console.log(props)
    //crear nuevo cliente//
    const CrearUsu = async () => {
      const { value: formValues } = await Swal.fire({
        titleText: "Crear nuevo Producto  :\n",
        iconColor: "blue",
        icon: "info",
        color: "blue",
        width: "35%",
        confirmButtonColor: "green",
        confirmButtonAriaLabel: "Agregar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        background: "white",
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Producto">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Nuevo Precio">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Nueva Descripcion">'+
          '<input id="swal-input4" class="swal2-input" placeholder="Nuevo Descuento">'+
          '<input id="swal-input5" class="swal2-input" placeholder="Nuevo Status">',
         
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value,
            document.getElementById("swal-input4").value,
            document.getElementById("swal-input5").value,
            
          ];
        },
      });
  
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
  
        const resultado = await axios.post("/newProduct", {
          datos: formValues,
          creador:profile.id,
        });
  
        console.log(resultado);
      }
    }
  
      return (
        <>
          <NavbarLinks />
  
          <div id="search" className="pt-4">
            <form className="form-inline justify-content-end">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    🔎
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cédula"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </form>
          </div>
  
          <div id="container-users">
            <div id="list-users">
              <TableList ente="producto"/>
            </div>
  
            <div id="downPartUserList">
              <div id="smallMenu">
                <BsFillChatSquareFill />
  
                <BsBookFill />
              </div>
              <a
                type="button"
                className="btn btn-success"
                onClick={() => {
                  CrearUsu();
                }}
              >
                Crear Producto
              </a>
  
              <nav aria-label="Page navigation align-self-center ">
                <ul className="pagination  ">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      );

}