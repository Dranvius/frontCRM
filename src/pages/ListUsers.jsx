import { NavbarLinks } from "../components/NavbarLinks";
import  axios  from "../lib/axios";

//Botones toaster
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComment } from "@fortawesome/free-solid-svg-icons";

import { FaBeer } from "react-icons/fa";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsBookFill } from "react-icons/bs";

const element = <FontAwesomeIcon icon={faComment} />;

import { TableList } from "../components/TableList";

export function ListUsers(props) {
  


  console.log(props)

  const CrearUsu = async () => {
    const { value: formValues } = await Swal.fire({
      titleText: "Crear nuevo Usuario :\n",
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
      footer:
        "<center><b>¡¡RECUERDA!!</b><br>EL NOMBRE PUEDE AFECTAR EN EL LOGIN</center>",

      html:
        '<input id="swal-input1" className="swal2-input" placeholder="Nuevo Nombre">' +
        '<input id="swal-input2" className="swal2-input" placeholder="Nuevo Apellido">' +
        '<input id="swal-input3" className="swal2-input" placeholder="Nuevo Cedula">' +
        '<input id="swal-input4" className="swal2-input" placeholder="Nuevo Celular">' +
        '<input id="swal-input5" className="swal2-input" placeholder="Nuevo Correo Electronico">' +
        '<input id="swal-input6" className="swal2-input" placeholder="Nuevo Contraseña">' +
        '<input id="swal-input7" className="swal2-input" placeholder="Nuevo Tipo">' +
        '<input id="swal-input8" className="swal2-input" placeholder="Nuevo Estatus">',

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input6").value,
          document.getElementById("swal-input7").value,
          document.getElementById("swal-input8").value,
        ];
      },
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));


        //peticion al back-end//
      const resultado = await axios.post("/CrearUsu", {
        datos: formValues,
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
            <TableList ente="usuario"/>
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
              Crear Usuario
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
