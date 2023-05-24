import React, { Component } from 'react';
import ClientService from '../services/ClientService';


class ClientComponent extends Component {

    constructor(props) {
        super(props)

        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.getClients = this.getClients.bind(this)
        this.createClient = this.createClient.bind(this)

        this.state = {
            clients: [],
            createClient: null,
            currentId: -1,

            creating: false,
            onError: false,
            errorBody: [],

            editingClient: {
                name: "",
                email: ""
            }
        }
    }

    componentDidMount() {
        this.getClients()
    }

    getClients() {
        ClientService.getClients().then(res => {
            console.log(res.data)
            this.setState({
                clients: res.data,
                onError: false,
                errorBody: []
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    setCreateClient() {
        this.setState({
            creating: true
        });
    }

    cancelCreateClient() {
        this.setState({
            creating: false,
            onError: false,
            errorBody: [],
            editingClient: {
                name: "",
                address: ""
            }
        });
    }

    onNameChange(e) {
        const name = e.target.value;

        this.setState(res => ({
                editingClient: {
                    ...res.editingClient,
                    name: name
                }
            }))
    }

    onEmailChange(e) {
        const email = e.target.value;

        this.setState(res => ({
                editingClient: {
                    ...res.editingClient,
                    email: email
                }
            }))
    }

    createClient() {
        ClientService.createClient(this.state.editingClient)
        .then(res => {
            console.log(res)
            this.setState({
                creating: false,
                editingClient: {
                    name: "",
                    email: ""
                }
            })
            this.getClients()
        })
        .catch(e => {
            this.errorHandle(e)
        })
    }

    errorHandle(e) {
        this.setState({
            onError: true
        })
        if (e.response && e.response.data) {
            this.setState({
                errorBody : e.response.data.violations
            })}
        setTimeout(()=>
            this.setState({
                onError:false,
                errorBody:[]
            }), 3000)
    }

    render() {
        const {clients, createClient, currentId, creating, onError, errorBody, editingClient} = this.state;
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.map((client, _index) => (
                        <tr>
                            <th>{client.id}</th>
                            <th>{client.name}</th>
                            <th>{client.email}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            { creating ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><input
                                        type="text"
                                        name="name"
                                        placeholder="Enter client name"
                                        onChange={this.onNameChange}
                                        /></th>
                                <th><input
                                        type="email"
                                        name="email"
                                        placeholder="Enter client email"
                                        onChange={this.onEmailChange}
                                        /></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-success" onClick={() => this.createClient(editingClient)}>Save</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.cancelCreateClient()}>Cancel creating new Client</button>
                </div>
            ) : (
                <button type="button" class="btn btn-primary" onClick={() => this.setCreateClient()}>Create new Client</button>
                )}
            <div className = {"container d-" + (this.state.onError ? "block" : "none")} role="alert">
                        <br/>
                        {errorBody && errorBody.map((error) => (
                            <div key={error.name} className="alert alert-danger">
                                {error.message}
                            </div>
                        ))}
                    </div>
        </div>);
    }
}

export default ClientComponent