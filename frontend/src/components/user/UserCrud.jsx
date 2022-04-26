import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import api from "../../services/api";

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Cadastro de usuários: Incluir,Listar ,Alterar e Excluir!"

}


const baseUrl = "http://localhost:3001/users"

const initialState = {
    user: { name: '', email: '' },
    list: []
}


export default class UserCrud extends Component {

    state = { ...initialState }//estado inicial

    componentWillMount() {
        axios.get(baseUrl)
            .then(res => {
                const persons = res.data;
                this.setState({ list: persons });
            })
    }


    // componentWillMount() {
    //     axios(baseUrl).then(resp => {
    //         this.setState({ list: resp.status })
    //     })
    // }



    //limpar a função
    clear() {
        this.setState({ user: initialState.user })//selecionando o user e recebendo um paramentro vazio do inialstate
    }


    //salvar e alterar usarios
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'//se o user (!!0=false) estiver setado se faz um post(alterar),caso contrario faz um put(adicionar)
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl //put para adicionar o id de cada usario na url 
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }


    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)//removendo o usario,mas adicionando na primeira posição
        list.unshift(user)
        return list
    }


    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value//mudando o target.name(email e nome) para o evento que estiver dentro do campo de input
        this.setState({ user })//setado o user (a variavel fora do escopo dessa função)
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name" value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className=" col-12 col-md-6">
                        <div className="form-group">
                            <label> Email</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o email..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">

                        <button className="btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>


                    </div>
                </div>
            </div>
        )
    };


    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }


    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => { this.load(user) }}>
                            <i className="fa fa-pencil"> </i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => { this.remove(user) }}>
                            <i className="fa fa-trash"> </i>
                        </button>

                    </td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}