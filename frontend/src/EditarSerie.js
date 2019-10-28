import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const EditarSerie = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setName(res.data.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  const onChange = event => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .put(`/api/series/${match.params.id}`, {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <h1>Editar Série</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            placeholder="Nome da Série"
          />
          <button type="button" onClick={save} className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarSerie;
