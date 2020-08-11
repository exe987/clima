import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //STATE DEL FORMULARIO
  const [busqueda, saveBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, saveConsultar] = useState(false);

  const [resultado, saveResultado] = useState({});

  const [error, guardarError] = useState(false);
  //EXTRAER CIUDAD Y PAIS
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = "7e74f1a64c7140431b3d1a8c1083bd6e";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const response = await fetch(url);
        const resultado = await response.json();
        saveResultado(resultado);
        saveConsultar(false);

        //POR SI LA CIUDAD O PAIS INTRODUCIDO NO ESTA DISPONIBLE
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarApi();
    // eslint-disable-next-line
  }, [consultar]);

  let component;
  if (error) {
    component = <Error mensaje="La busqueda no arrojó resultados" />;
  } else {
    component = <Clima resultado={resultado} />;
  }
  return (
    <Fragment>
      <Header titulo="Clima App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                saveBusqueda={saveBusqueda}
                saveConsultar={saveConsultar}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
