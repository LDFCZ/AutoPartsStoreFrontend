import React, { Component } from 'react';
import SupplierService from '../services/SupplierService';

class SupplierComponent extends Component {

    constructor(props) {
        super(props)

        this.onNameChange = this.onNameChange.bind(this)
        this.onAddressChange = this.onAddressChange.bind(this)
        this.getSuppliers = this.getSuppliers.bind(this)
        this.createSupplier = this.createSupplier.bind(this)

        this.state = {
            suppliers: [],
            createSupplier: null,
            currentId: -1,

            creating: false,
            onError: false,
            errorBody: [],

            editingSupplier: {
                name: "",
                address: ""
            }
        }
    }

    componentDidMount() {
        this.getSuppliers()
    }

    getSuppliers() {
        SupplierService.getSuppliers().then(res => {
            console.log(res.data)
            this.setState({
                suppliers: res.data,
                onError: false,
                errorBody: []
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    setCreateSupplier() {
        this.setState({
            creating: true
        });
    }

    cancelCreateSupplier() {
        this.setState({
            creating: false,
            onError: false,
            errorBody: [],
            editingSupplier: {
                name: "",
                address: ""
            }
        });
    }

    onNameChange(e) {
        const name = e.target.value;

        this.setState(res => ({
                editingSupplier: {
                    ...res.editingSupplier,
                    name: name
                }
            }))
    }

    onAddressChange(e) {
        const address = e.target.value;

        this.setState(res => ({
                editingSupplier: {
                    ...res.editingSupplier,
                    address: address
                }
            }))
    }

    createSupplier() {
        SupplierService.createSupplier(this.state.editingSupplier)
        .then(res => {
            console.log(res)
            this.setState({
                creating: false,
                editingSupplier: {
                    name: "",
                    address: ""
                }
            })
            this.getSuppliers()
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
        const {suppliers, createSupplier, currentId, creating, onError, errorBody, editingSupplier} = this.state;
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>adderss</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers && suppliers.map((supplier, _index) => (
                        <tr>
                            <th>{supplier.id}</th>
                            <th>{supplier.name}</th>
                            <th>{supplier.address}</th>
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
                                <th>adderss</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><input
                                        type="text"
                                        name="name"
                                        placeholder="Enter supplier name"
                                        onChange={this.onNameChange}
                                        /></th>
                                <th><input
                                        type="text"
                                        name="address"
                                        placeholder="Enter supplier address"
                                        onChange={this.onAddressChange}
                                        /></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-success" onClick={() => this.createSupplier(editingSupplier)}>Save</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.cancelCreateSupplier()}>Cancel creating new Supplier</button>
                </div>
            ) : (
                <button type="button" class="btn btn-primary" onClick={() => this.setCreateSupplier()}>Create new Supplier</button>
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

export default SupplierComponent