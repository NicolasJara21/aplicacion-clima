import { useState } from 'react'
import './style/style.css'

export const App = () => {

  const urlBase = "https://api.weatherapi.com/v1/current.json?key=";
  const keyApi = "269fe7133cdc4df69e8213943240912";

  const [ciudad , setCiudad] = useState('');
  const [data , setData] = useState(null);

  const fetchData = async () =>{
    try{
        const response = await fetch(`${urlBase}${keyApi}&q=${ciudad}`);
        if (!response.ok) throw new Error("Error al obtener datos");
        const resul = await response.json();
        setData(resul);
    }catch(error){
      console.error("ocurrio un error ",error);
    }
  }

  const handleChange = (event) =>{
        setCiudad(event.target.value);

  }
  const handleSubmit = (event) =>{
        event.preventDefault()
        fetchData();
  }


  return (

    <div className='container'>
          <h1>Aplicacion del Clima</h1>
          <form onSubmit={handleSubmit}>
            <input
            type='text'
            placeholder='ingrese una ciudad'
            value={ciudad}
            onChange={handleChange}
            ></input>
            <button className='submit'>Enviar</button>
          </form>
          {
            data && (
              <div>
                <h1>ciudad : {data.location.name}</h1>
                <p>: {data.current.temp_c} °c</p>
                <img src={`https:${data.current.condition.icon}`} ></img>
                <p>Hora/Dia : {data.current.last_updated}</p>
              </div>
            )
          }
    </div>
  )
}
