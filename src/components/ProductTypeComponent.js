import React, { Component } from 'react';
import ProductTypeService from '../services/ProductTypeService';


class ProductTypeComponent extends Component {

    constructor(props) {
        super(props)

            
        this.onNameChange = this.onNameChange.bind(this)
        this.getProductTypes = this.getProductTypes.bind(this)
        this.createProductType = this.createProductType.bind(this)

        this.state = {
            productTypes: [],
            createProductType: null,
            currentId: -1,

            creating: false,
            onError: false,
            errorBody: [],

            editingProductType: {
                productTypeName: ""
            }
        }
    }

    componentDidMount() {
        this.getProductTypes()
    }

    getProductTypes() {
        ProductTypeService.getProductTypess().then(res => {
            console.log(res.data)
            this.setState({
                productTypes: res.data,
                onError: false,
                errorBody: []
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    setCreateProductType() {
        this.setState({
            creating: true
        });
    }

    cancelCreateProductType() {
        this.setState({
            creating: false,
            onError: false,
            errorBody: [],
            editingProductType: {
                productTypeName: ""
            }
        });
    }

    onNameChange(e) {
        const name = e.target.value;

        this.setState(res => ({
                editingProductType: {
                    ...res.editingProductType,
                    productTypeName: name
                }
            }))
    }

    createProductType() {
        ProductTypeService.createProductType(this.state.editingProductType)
        .then(res => {
            console.log(res)
            this.setState({
                creating: false,
                editingProductType: {
                    productTypeName: ""
                }
            })
            this.getProductTypes()
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
        const {productTypes, createProductType, currentId, creating, onError, errorBody, editingProductType} = this.state;
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {productTypes && productTypes.map((productType, _index) => (
                        <tr>
                            <th>{productType.id}</th>
                            <th>{productType.productTypeName}</th>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><input
                                        type="text"
                                        name="name"
                                        placeholder="Enter product type name"
                                        onChange={this.onNameChange}
                                        /></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-success" onClick={() => this.createProductType(editingProductType)}>Save</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.cancelCreateProductType()}>Cancel</button>
                </div>
            ) : (
                <button type="button" class="btn btn-primary" onClick={() => this.setCreateProductType()}>Create new Product Type</button>
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

export default ProductTypeComponent