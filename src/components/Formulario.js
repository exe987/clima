import React, { useState } from "react";
import Error from './Error';
import PropTypes from "prop-types";

const Formulario = ({busqueda, saveBusqueda, saveConsultar}) => {

  
  //STATE ERROR
  const [error, saveError] = useState(false);

  //EXTRAER CIUDAD Y PAIS
  const {ciudad, pais} = busqueda;

  //FUNCION QUE COLOCA LOS ELEMENTOS EN EL STATE
  const handleChange = e => {
    //ACTUALIZA EL STATE
    saveBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };
  
  //VALIDACION DE FORMULARIO
  const handleSubmit = e => {
    e.preventDefault();
    //VALIDACION EN SI
    if(ciudad.trim()===''||pais.trim()===''){
      saveError(true);
      return;
    }
    saveError(false);
    //PARA QUE SOLO HAGA LA CONSULTA CUANDO ESTE EL NOMBRE COMPLETO DE CIUDAD Y SELECCIONADO EL PAIS 
    //Y SE LE DE SUBMIT
    saveConsultar(true);
  };


  return (
    <form
    onSubmit={handleSubmit}
    >
    {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
      <div className="input-field col s12">
        <input 
        type="text" 
        name="ciudad" 
        id="ciudad"
        value={ciudad}
        onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select 
        name="pais" 
        id="pais"
        value={pais}
        onChange={handleChange}
        >
          <option value="">---Seleccione un pais---</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
          <option value="CL">Chile</option>
        </select>
        <label 
        htmlFor="pais">Pais: </label>
      </div>
      <div className='input-field col s12'>
        <button
        type="submit"
        className="waves-effect waves-light btn-large btn-block yellow accent-4"
        >Buscar Clima</button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  saveBusqueda: PropTypes.func.isRequired,
  saveConsultar: PropTypes.func.isRequired
};

export default Formulario;
