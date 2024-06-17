import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import HeaderLT1 from "../../components/header/headerLT1";
import SidebarLT1 from "../../components/aside/sidebarLT1";
import TableDetalle from "../../components/Tables/table";
import useInput from "../../components/hooks/useInput";

export default function Client_list() {
  const [accessToken, setAccessToken] = useState("");
  const [operation, setOperation] = useState([1]);
  const [idToEdit, setidToEdit] = useState(null);
  const selectedKeys = ["id", "client", "estado"];
  const [data, setData] = useState([]);
  const link = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const idClient = useInput({ defaultValue: "", validate: /^[1-4]+$/ });
  const url = "http://localhost/API-EVA/clientController/Clients";

  const client = useInput({ defaultValue: "", validate: /^[A-Za-z ]*$/ });
  const logo = useInput({ defaultValue: "", validate: "" });
  const estado = useInput({ defaultValue: "", validate: /^[0-1]+$/ });
  useEffect(() => {
   
    fetchData();
  }, []); // Se pasa un arreglo vacío como dependencia para que el efecto se ejecute solo una vez
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const openModalCont = (clientData) => {
    console.log("Client Data", clientData);
    client.handleChange(clientData?.client || "");
    client.handleChange(clientData?.client || "");
    estado.handleChange(clientData?.estado || "");
    logo.handleChange(clientData?.logo || "");
  };
  const smallAlertDelete = Swal.mixin({
    toast: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      container: "small-alert-container",
      title: "small-alert-title",
      content: "medium-alert-content",
      actions: "small-alert-actions",
      confirmButton: "small-alert-confirm-button2",
      cancelButton: "small-alert-cancel-button",
    },
    buttonsStyling: true, // Para aplicar estilos personalizados
    width: "400px", // Ajusta el ancho de la alerta
    padding: "1em", // Reduce el padding para que sea menos invasiva
    display: "flex",
    backdrop: false,
    position: "center",
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const activation=(clientData)=> { 
    const url=`http://localhost/API-EVA/clientController/patchClient/`
    const id =clientData.id
    const name=clientData.client
    console.log(name)
    const parametros={
      estado:1,
    };
    smallAlertDelete
      .fire({
        text: `El cliente ${name} se activara.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros);
            
            Toast.fire({
              icon: "success",
              title: `El cliente ${clientData.client} se ha activado exitosamente`,
            });
           
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `El cliente ${clientData.client} no ha sido activado`,
            });
            console.error(error);
          }
        }
        fetchData();
      });        
  };
  const deactivation=(clientData)=> {  
    const url = `http://localhost/API-EVA/clientController/patchClient/`;
    const id = clientData.id;
    const name = clientData.client;
    const parametros = {
      estado: 0,
    };
    smallAlertDelete
      .fire({
        text: `El cliente ${name} se desactivará de forma permantente.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.patch(`${url}/${id}`, parametros);
            Toast.fire({
              icon: "success",
              title: `El cliente ${clientData.client} se ha desactivado exitosamente`,
            });
            fetchData();
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: `El cliente ${clientData.client} no ha sido desactivado`,
            });
            console.error(error);
          }
        }
        fetchData();
      });
   };
  return (
    <div className="App">
      <div id="body">
        <HeaderLT1 />
        <section
          style={{ alignItems: "stretch", flexWrap: "nowrap", padding: 0 }}
        >
          <SidebarLT1 />
          <div className="container mt-0">
            {data.length > 0 && (
              <TableDetalle
                header={selectedKeys}
                data={data}
                // onCreate={() => openModal(1)}
                onRemove={(item) => deactivation(item)}
                // modalId={"modalAdmin"}
                modalId2={"modalViewClient"}
                // onUpdate={(payload) => openModal(2, payload)}
                onView={(payload) => openModalCont(payload)}
                onActive={(payload)=> activation(payload)}
              />
            )}
          </div>
        </section>
      </div>

      <div id="modalViewClient" className="modal fade" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div
              className="modal-header mb-0 pb-0 text-center"
              style={{ borderBottom: "none" }}
            >
              <label className="fw-bold fs-5"></label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div>
              {" "}
              <p
                style={{
                  marginLeft: "15px",
                  marginBottom: 0,
                  padding: 0,
                  color: "gray",
                  fontSize: "small",
                }}
              >
                Información detallada del cliente.
              </p>
            </div>

            <div className="modal-body">
              <div className="row text-center"></div>
              <div className="row">
                <div className="col m-2">
                  <div className="col m-2 text-center">
                    <img src={`clientes/${logo.input}`} alt="Logo" />
                  </div>
                </div>
                <div className="col  m-2 ">
                  <div className="m-1 p-1 text-center">
                    <p className="fw-semibold fs-5">{client.input}</p>
                    <p className="text-secondary">
                      {" "}
                      <span>{`${
                        estado.input === 1 ? "Activo" : "Inactivo"
                      }`}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
