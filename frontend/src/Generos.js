import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setData(res.data.data);
    });
  }, []);

  const editarGenero = id => {};

  const deleteGenero = id => {
    console.log(id);
    axios.delete("/api/genres/" + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    });
  };

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link to={`/generos/${record.id}`} className="btn btn-warning">
            Editar
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteGenero(record.id)}
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Generos</h1>
        <div>
          <Link to="/generos/novo" className="btn btn-primary">
            Novo Gênero
          </Link>
        </div>
        <div className="alert alert-warning" role="alert">
          Você não possui gêneros criados.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Gêneros</h1>
      <div>
        <Link to="/generos/novo" className="btn btn-primary">
          Novo Gênero
        </Link>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderizaLinha)}</tbody>
      </table>
    </div>
  );
};

export default Generos;
