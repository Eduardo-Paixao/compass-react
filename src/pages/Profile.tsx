import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Spiner from "../components/Spiner";
import { toastError } from "../components/Toasts";
import { AuthContext } from "../contexts/AuthContext";
import { apiUsers } from "../services/api";
import "../styles/profile.scss";
import { getRepoUser, getStarredUser } from "../utils/Functions";
import { IRepos } from "../utils/Interfaces";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSearchUser = async () => {
    try {
      setIsLoading(true);
      await apiUsers.get(`${searchUser}`);
      history.push(`/profile-search/${searchUser}`);
    } catch (error:any) {
      setIsLoading(false);
      toastError(`
      Usuário "${searchUser}" não existe no GitHub
      `);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="profile container-sm mx-auto mt-5">
      <Spiner loading={isLoading} message="Carregando..." />
      <div className="mb-3">
        <div className="row align-items-center">
          <img
            src={user?.profile.avatar_url ? user?.profile.avatar_url : ""}
            className="img-fluid rounded-circle col-2"
            alt="Imagem de Usuário"
          />
          <div className="col-10">
            <a
              className="fw-bold fs-2 text-start btn-text"
              href={user?.profile.html_url}
            >
              {user?.profile.name}
            </a>
          </div>
        </div>
        <div className="d-flex gap-5 col-12 m-3 fs-4">
          <strong>
            {user?.profile.public_repos} <p>Repositórios</p>
          </strong>
          <strong>
            {user?.profile.followers} <p>Seguidores</p>
          </strong>
          <strong>
            {user?.profile.following} <p>Seguindo</p>
          </strong>
        </div>
      </div>
      <div className="input-group mb-4">
        <Input
          placeholder="Busca por usuário"
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
        <Button
          className="btn-warning"
          onClick={() => {
            getSearchUser();
          }}
        >
          <AiOutlineSearch className="me-2" /> Pesquisar
        </Button>
      </div>
      <div className="d-flex gap-3 mx-auto">
        <Button
          className="btn-warning"
          onClick={() => {
            getRepoUser(
              user?.username,
              setRepos,
              setIsLoading
            );
          }}
        >
          <AiOutlineUser className="me-2" /> Repositórios do usuário
        </Button>
        <Button
          className="btn-warning"
          onClick={() => {
            getStarredUser(
              user?.username,
              setRepos,
              setIsLoading
            );
          }}
        >
          <AiOutlineStar className="me-2" />
          Repositórios marcados
        </Button>
      </div>
      <div className="d-flex gap-3 mt-4 scroll">
        <table className="table table-dark table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Qntd. Estrelas</th>
              <th scope="col">Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr className="table-light">
                <td>{repo.name}</td>
                <td>{repo.stargazers_count}</td>
                <td>{moment(repo.created_at).format("DD/MM/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
