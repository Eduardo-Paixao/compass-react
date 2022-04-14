import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/Button";
import Spiner from "../components/Spiner";
import { toastError } from "../components/Toasts";
import { AuthContext } from "../contexts/AuthContext";
import { apiUsers } from "../services/api";
import { getRepoUser, getStarredUser } from "../utils/Functions";
import { IParamsName, IRepos, ISearchUser } from "../utils/Interfaces";

// import { Container } from './styles';

const SearchProfile = () => {
  const history = useHistory();
  const { name } = useParams<IParamsName>();
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState<ISearchUser>();

  useEffect(() => {
    const getSearchUser = async () => {
      try {
        const { data } = await apiUsers.get(`${name}`);
        setSearchUser(data);
      } catch (error: any) {
        toastError(error?.response?.data.message);
      }
    };
    getSearchUser();
  }, []);

  return (
    <>
      <Spiner loading={isLoading} message="Carregando..." />
      <div className="col-12 container-sm mx-auto my-3">
        <Button
          className="btn-text"
          onClick={() => {
            history.push("/profile");
          }}
        >
          <AiOutlineArrowLeft size={22} className="me-2" /> Voltar
        </Button>
      </div>
      <div className="profile container-sm mx-auto">
        <div className="mb-3">
          <div className="row align-items-center">
            <img
              src={searchUser?.avatar_url}
              className="img-fluid rounded-circle col-2"
              alt="Imagem de Usuário"
            />

            <div className="col-10">
              <a
                className="fw-bold fs-2 text-start btn-text"
                href={searchUser?.html_url}
              >
                {searchUser?.name}
              </a>
            </div>
          </div>
          <div className="d-flex gap-5 col-12 m-3 fs-4">
            <strong>
              {searchUser?.public_repos} <p>Repositórios</p>
            </strong>
            <strong>
              {searchUser?.followers} <p>Seguidores</p>
            </strong>
            <strong>
              {searchUser?.following} <p>Seguindo</p>
            </strong>
          </div>
        </div>

        <div className="d-flex gap-3 mx-auto">
          <Button
            className="btn-warning"
            onClick={() => {
              getRepoUser(name, setRepos, setIsLoading);
            }}
          >
            <AiOutlineUser className="me-2" /> Repositórios do usuário
          </Button>
          <Button
            className="btn-warning"
            onClick={() => {
              getStarredUser(name, setRepos, setIsLoading);
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
    </>
  );
};

export default SearchProfile;
