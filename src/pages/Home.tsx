import React from "react";
import PeopleSearch from "../assets/images/people_search.svg";

import "../styles/login.scss";
const Home = () => {
  return (
    <div className="home">
      <div>
        <div className="text">
          <h2 className="h2 fw-bold">Chega mais Dev!</h2>
          <p className="h6">
            Vem verificar essa super ferramenta de pesquisa de usuários no
            GitHub, que utiliza React.js, Bootstrap, SASS e TypeScript.
          </p>
          <p className="h6">
            Clica em <a>"Entrar com GitHub"</a> e aproveite
          </p>
        </div>
        <div>
          <img src={PeopleSearch} alt="PeopleSearch" width={600} />
        </div>
      </div>
    </div>
  );
};

export default Home;
