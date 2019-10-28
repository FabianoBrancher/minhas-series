import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const NovaSerie = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const onChange = event => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .post("/api/series", {
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
      <h1>Nova Série</h1>
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

export default NovaSerie;
