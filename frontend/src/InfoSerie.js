import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Badge } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: "",
    comments: ""
  });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("EDIT");
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    axios.get("/api/series/" + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  };

  const onChangeGenre = event => {
    setGenreId(event.target.value);
  };

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  const save = () => {
    axios
      .put("/api/series/" + match.params.id, {
        ...form,
        genre_id: genreId
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
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0, .7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbbail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === "ASSISTIDO" ? (
                    <Badge color="success">Assistido</Badge>
                  ) : (
                    <Badge color="warning">Para assistir</Badge>
                  )}
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <button className="btn btn-primary" onClick={() => setMode("EDIT")}>
          Editar
        </button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar Série</h1>
          <button className="btn btn-primary" onClick={() => setMode("INFO")}>
            Cancelar Edição
          </button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                value={form.name}
                onChange={onChange("name")}
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome da Série"
              />
              <label htmlFor="comments">Comentários</label>
              <input
                value={form.comments}
                onChange={onChange("comments")}
                type="text"
                className="form-control"
                id="comments"
                placeholder="Comentários"
              />
              <div className="form-group">
                <label htmlFor="genres">Gêneros</label>
                <select
                  className="form-control"
                  onChange={onChangeGenre}
                  value={genreId}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="assistido"
                  value="ASSISTIDO"
                  onChange={seleciona("ASSISTIDO")}
                  checked={form.status === "ASSISTIDO"}
                />
                <label className="form-check-label" htmlFor="assistido">
                  Assistido
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="paraAssistir"
                  value="PARA_ASSISTIR"
                  checked={form.status === "PARA_ASSISTIR"}
                  onChange={seleciona("PARA_ASSISTIR")}
                />
                <label className="form-check-label" htmlFor="paraAssistir">
                  Para Assistir
                </label>
              </div>

              <button type="button" onClick={save} className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
