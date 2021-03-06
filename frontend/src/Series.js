import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteGenero = id => {
    console.log(id);
    axios.delete("/api/series/" + id).then(res => {
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
          <Link to={`/series/${record.id}`} className="btn btn-warning">
            Info
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
        <h1>Séries</h1>
        <div>
          <Link to="/series/novo" className="btn btn-primary">
            Nova Série
          </Link>
        </div>
        <div className="alert alert-warning" role="alert">
          Você não possui séries criadas.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Séries</h1>
      <div>
        <Link to="/series/novo" className="btn btn-primary">
          Nova Séries
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

export default Series;
