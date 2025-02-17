import { useState,useEffect,useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from 'axios'
import "../../assets/css/tabla.css";

const TableSurvey = ({
  header,
  data,
  onCreate,
  onRemove,
  onUpdate,
  onView,
  modalId,
  modalId2,
  onActive
}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [userClients,setUserClients]=useState([])
  const {userId,accessToken}=useContext(UserContext)


  useEffect(()=>{
    getUserClients(userId)
    filteredData
  },[])


  const getUserClients = async (id) => {
    try {
      const response = await axios.get(`http://localhost/API-EVA/UserController/ClientsxUser/${id}`,config);
      setUserClients(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const config = {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 on new search
  };

  const handleRecordsPerPageChange = (records) => {
    setRecordsPerPage(records);
    setCurrentPage(1); // Reset page to 1 on new records per page
  };

  const capitalize = (text) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const filteredData = data.filter((item) =>
    userClients.some(client => client.id  ==  item.idClient) &&
    Object.values(item).some(
      (val) =>
        typeof val  ==  "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  return (
    <div className="table-container">
      <div className="row d-flex mb-3">
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <input
            className="w-50 inp-search"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="d-grid col-6 col-sm-6 col-md-6 col-lg-6 justify-content-end">
          <button
            className="btn btn-block btn-sm btn-default btn-flat fw-bold acces-tabla m-2"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
            onClick={() => onCreate()}
          >
            <i className="fa fa-plus"></i> Encuesta
          </button>
        </div>
      </div>
      <table className="table table-hover" id="tableDefault">
        <thead>
          <tr className="table-light tr-table">
            {header.map((item, i) => (
              <th key={i} className="col text-center">
                {capitalize(item)}
              </th>
            ))}
            <th className="col text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, idx) => (
            <tr key={idx}>
              {header.map((col, i) => (
                <td key={i}>
                  {col == "state"?(item.state == 1? "Activo":"Inactivo"):(item[col.toLowerCase()] || item[col])}
                </td>
              ))}
             
                {item.state == 1?( <td>  <button
                  className="btn btn-rect"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                  onClick={() => onUpdate(item)}
                >
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button className="btn btn-rect" onClick={() => onRemove(item)}>
                  <i className="fa-solid fa-power-off"></i>
                </button>
                <a href={`./view_survey`}>
                  <button
                    className="btn btn-rect"
                  >
                    <i className="fa-solid fa-circle-question"></i>
                  </button>
                </a>
                <button
                  className="btn btn-rect"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId2}`}
                  onClick={() => onView(item)}
                >
                  <i className="fa-solid fa-envelopes-bulk"></i>
                </button>
              </td>):( <td>
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-rect"
                          onClick={() => onActive(item)}
                        >
                         <i className="fa-solid fa-power-off"></i>
                        </button>
                      
                        <button
                          className="btn btn-rect"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalId2}`}
                          onClick={() => onView(item)}
                        >
                          <i className="fa-solid fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </td>)}
                  
               
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row d-flex ps-5 pe-5 mt-3">
        <div className="col-6 col-sm-6 col-md-6 col-lg-6">
          <label>
            Mostrar
            <button
              className="dropdown-toggle inp-search"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {recordsPerPage}
            </button>
            <ul className="dropdown-menu">
              {[10, 25, 50].map((num) => (
                <li key={num}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleRecordsPerPageChange(num)}
                  >
                    {num}
                  </a>
                </li>
              ))}
            </ul>
            registros
          </label>
        </div>
        <div className="d-grid col-6 col-sm-6 col-md-6 col-lg-6 justify-content-end">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>
            <label className="btn" htmlFor="btncheck2">
              {currentPage}
            </label>
            <button
              type="button"
              className="btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableSurvey;
