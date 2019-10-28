import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const EditarGenero = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/api/genres/${match.params.id}`).then(res => {
      console.log(res.data);
      setName(res.data.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  const onChange = event => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .put(`/api/genres/${match.params.id}`, {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/generos" />;
  }

  return (
    <div>
      <h1>Editar Gênero</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            placeholder="Nome do gênero"
          />
          <button type="button" onClick={save} className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarGenero;
