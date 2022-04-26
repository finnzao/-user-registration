import React from "react";
import Main from "../template/Main";

export default props =>
    <Main icon="home" title="Início" subtitle="Cadastro">
        <div className="display-4">Bem vindo ao cadastro de usuários.</div>
        <hr />
        <p className="mb-0">Clique na aba de usuários para ver a lista de adicionados.</p>
    </Main>