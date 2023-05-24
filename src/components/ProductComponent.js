import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import ProductTypeService from '../services/ProductTypeService';
import SupplierService from '../services/SupplierService';

class ProductComponent extends Component {

    constructor(props) {
        super(props)

        this.onPoductNameChange = this.onPoductNameChange.bind(this)
        this.onProductTypeChange = this.onProductTypeChange.bind(this)
        this.onProductSizeChange = this.onProductSizeChange.bind(this)
        this.onSupplierChange = this.onSupplierChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onDiscountChange = this.onDiscountChange.bind(this)
        this.onIsGuranteeChange = this.onIsGuranteeChange.bind(this)
        this.onCustomsPriceChange = this.onCustomsPriceChange.bind(this)
        this.onFinalPriceChange = this.onFinalPriceChange.bind(this)
        this.onDiscountChange = this.onDiscountChange.bind(this)

        this.getProducts = this.getProducts.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.setCreateProduct = this.setCreateProduct.bind(this)
        this.setEditProduct = this.setEditProduct.bind(this)
        this.setActiveProduct = this.setActiveProduct.bind(this)

        this.state = {
            products: [],
            suppliers: [],
            productTypes: [],
            currentProduct: null,
            currentId: -1,

            creating: false,
            editing: false,
            onError: false,
            errorBody: [],

            editingProduct: {
                productName: "",
                productType: null,
                productSize: 0,
                supplier: null,
                price: 0,
                discount: 0,
                isGuarantee: false,
                customsPrice: 0,
                finalPrice: 0,
                finalDiscount: 0
            }
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts() {
        ProductService.getProducts().then(res => {
            console.log(res.data)
            this.setState({
                products: res.data,
                onError: false,
                errorBody: []
            })
        })
        .catch(e => {
            console.log(e);
        })

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

    setCreateProduct() {
        this.setState({
            editing: false,
            creating: true
        });
    }

    setEditProduct(editProduct) {
        const product = editProduct
        this.setState(res => ({
            editing: true,
            creating: false,
            editingProduct: {
                ...product
            }
        }));
    }

    setActiveProduct(product, index) {
        console.log(product)
        this.setState({
            currentProduct: product,
            currentId: index,
            editing: false,
            creating: false
        });
    }

    cancelEditingProduct() {
        this.setState({
            creating: false,
            editing: false,
            onError: false,
            errorBody: [],
            editingProduct: {
                productName: "",
                productType: null,
                productSize: 0,
                supplier: null,
                price: 0,
                discount: 0,
                isGuarantee: false,
                customsPrice: 0,
                finalPrice: 0,
                finalDiscount: 0
            }
        });
    }

    createProduct() {
        ProductService.createProduct(this.state.editingProduct)
        .then(res => {
            console.log(res)
            this.setState({
                creating: false,
                editingProduct: {
                    productName: "",
                    productType: null,
                    productSize: 0,
                    supplier: null,
                    price: 0,
                    discount: 0,
                    isGuarantee: false,
                    customsPrice: 0,
                    finalPrice: 0,
                    finalDiscount: 0
                }
            })
            this.getProducts()
        })
        .catch(e => {
            this.errorHandle(e)
        })
    }

    updateProduct() {
        ProductService.updateProduct(this.state.editingProduct)
        .then(res => {
            console.log(res)
            this.setState({
                editing: false,
                editingProduct: {
                    productName: "",
                    productType: null,
                    productSize: 0,
                    supplier: null,
                    price: 0,
                    discount: 0,
                    isGuarantee: false,
                    customsPrice: 0,
                    finalPrice: 0,
                    finalDiscount: 0
                }
            })
            this.getProducts()
        })
        .catch(e => {
            this.errorHandle(e)
        })
    }

    deleteProduct(id) {
        ProductService.deleteProduct(id)
        .then(() => {
            this.setState({
                currentProduct: null,
                currentId: -1
            })
            this.getProducts()
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


    onPoductNameChange(e) {
        const productName = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    productName: productName
                }
            }))
    }

    onProductTypeChange(e) {
        const productType = JSON.parse(e.target.value);

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    productType: productType
                }
            }))
    }

    onProductSizeChange(e) {
        const productSize = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    productSize: productSize
                }
            }))
    }

    onSupplierChange(e) {
        console.log(e.target.value)
        const supplier = JSON.parse(e.target.value);

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    supplier: supplier
                }
            }))
    }

    onPriceChange(e) {
        const price = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    price: price
                }
            }))
    }

    onDiscountChange(e) {
        const discount = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    discount: discount
                }
            }))
    }

    onIsGuranteeChange(e) {
        const isGuarantee = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    isGuarantee: isGuarantee
                }
            }))
    }

    onCustomsPriceChange(e) {
        const customsPrice = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    customsPrice: customsPrice
                }
            }))
    }

    onFinalPriceChange(e) {
        const finalPrice = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    finalPrice: finalPrice
                }
            }))
    }

    onFinalDiscountChange(e) {
        const finalDiscount = e.target.value;

        this.setState(res => ({
                editingProduct: {
                    ...res.editingProduct,
                    finalDiscount: finalDiscount
                }
            }))
    }

    render() {
        const {products, suppliers, productTypes,  currentProduct, currentId, creating, editing, onError, errorBody, editingProduct} = this.state;
        return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>product type</th>
                        <th>size</th>
                        <th>supplier</th>
                        <th>price</th>
                        <th>discount</th>
                        <th>is gursntee</th>
                        <th>customs price</th>
                        <th>final price</th>
                        <th>final discount</th>
                        <th></th> 
                        <th></th>               
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, _index) => (
                        <tr>
                            <th>{product.id}</th>
                            <th>{product.productName}</th>
                            <th>{product.productType.productTypeName}</th>
                            <th>{product.productSize}</th>
                            <th>{product.supplier.name}</th>
                            <th>{product.price}</th>
                            <th>{product.discount}</th>
                            <th>{product.isGuarantee ? (<>yes</>) : (<>no</>)}</th>
                            <th>{product.customsPrice}</th>
                            <th>{product.finalPrice}</th>
                            <th>{product.finalDiscount}</th>
                            <th><button type="button" class="btn btn-success" onClick={() => this.setEditProduct(product)}>Edit</button></th> 
                            <th><button type="button" class="btn btn-danger" onClick={() => this.deleteProduct(product.id)}>Delete</button></th> 
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
                                <th>product type</th>
                                <th>size</th>
                                <th>supplier</th>
                                <th>price</th>
                                <th>discount</th>
                                <th>is gursntee</th>
                                <th>customs price</th>
                                <th>final price</th>
                                <th>final discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><input
                                        type="text"
                                        name="productName"
                                        placeholder="Enter product name"
                                        onChange={this.onPoductNameChange}
                                        /></th>
                                <th><select id="productType" onChange={this.onProductTypeChange}>
                                        {productTypes && productTypes.map((productType, _index) => (
                                            <option value={JSON.stringify(productType)}>{productType.productTypeName}</option>
                                        ))}
                                    </select></th>
                                <th><input
                                        type="number"
                                        name="size"
                                        placeholder="Enter product size"
                                        onChange={this.onProductSizeChange}
                                        /></th>
                                <th><select id="supplier" onChange={this.onSupplierChange}>
                                        {suppliers && suppliers.map((supplier, _index) => (
                                            <option value={JSON.stringify(supplier)}>{supplier.name}</option>
                                        ))}
                                    </select></th>
                                <th><input
                                    type="number"
                                    name="price"
                                    placeholder="Enter product price"
                                    onChange={this.onPriceChange}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="discount"
                                    placeholder="Enter product discount"
                                    onChange={this.onDiscountChange}
                                    /></th>
                                <th><select id="guarantee" onChange={this.onIsGuranteeChange} value={false}>
                                        <option value={true}>yes</option>
                                        <option value={false}>no</option>
                                    </select></th>
                                <th><input
                                    type="number"
                                    name="customs price"
                                    placeholder="Enter product customs price"
                                    onChange={this.onCustomsPriceChange}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="final price"
                                    placeholder="Enter product final price"
                                    onChange={this.onFinalPriceChange}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="final discount"
                                    placeholder="Enter product final discount"
                                    onChange={this.onDiscountChange}
                                    /></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-success" onClick={() => this.createProduct(editingProduct)}>Save</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.cancelEditingProduct()}>Cancel</button>
                </div>
            ) : (<></>)}

            { editing ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>product type</th>
                                <th>size</th>
                                <th>supplier</th>
                                <th>price</th>
                                <th>discount</th>
                                <th>is gursntee</th>
                                <th>customs price</th>
                                <th>final price</th>
                                <th>final discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><input
                                        type="text"
                                        name="productName"
                                        placeholder="Enter product name"
                                        onChange={this.onPoductNameChange}
                                        value={this.state.editingProduct.productName}
                                        /></th>
                                <th><select id="productType" onChange={this.onProductTypeChange} value={JSON.stringify(this.state.editingProduct.productType)}>
                                        {productTypes && productTypes.map((productType, _index) => (
                                            <option value={JSON.stringify(productType)}>{productType.productTypeName}</option>
                                        ))}
                                    </select></th>
                                <th><input
                                        type="number"
                                        name="size"
                                        placeholder="Enter product size"
                                        onChange={this.onProductSizeChange}
                                        value={this.state.editingProduct.productSize}
                                        /></th>
                                <th><select id="supplier" onChange={this.onSupplierChange} value={JSON.stringify(this.state.editingProduct.supplier)}>
                                        {suppliers && suppliers.map((supplier, _index) => (
                                            <option value={JSON.stringify(supplier)}>{supplier.name}</option>
                                        ))}
                                    </select></th>
                                <th><input
                                    type="number"
                                    name="price"
                                    placeholder="Enter product price"
                                    onChange={this.onPriceChange}
                                    value={this.state.editingProduct.price}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="discount"
                                    placeholder="Enter product discount"
                                    onChange={this.onDiscountChange}
                                    value={this.state.editingProduct.discount}
                                    /></th>
                                <th><select id="guarantee" onChange={this.onIsGuranteeChange} value={this.state.editingProduct.isGuarantee ? true : false}>
                                        <option value={true}>yes</option>
                                        <option value={false}>no</option>
                                    </select></th>
                                <th><input
                                    type="number"
                                    name="customs price"
                                    placeholder="Enter product customs price"
                                    onChange={this.onCustomsPriceChange}
                                    value={this.state.editingProduct.customsPrice}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="final price"
                                    placeholder="Enter product final price"
                                    onChange={this.onFinalPriceChange}
                                    value={this.state.editingProduct.finalPrice}
                                    /></th>
                                <th><input
                                    type="number"
                                    name="final discount"
                                    placeholder="Enter product final discount"
                                    value={this.state.editingProduct.finalDiscount}
                                    onChange={this.onDiscountChange}
                                    /></th>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-success" onClick={() => this.updateProduct(editingProduct)}>Save</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.cancelEditingProduct()}>Cancel</button>
                </div>) : (<></>)}
            { (!editing && !creating) ? (<button type="button" class="btn btn-primary" onClick={() => this.setCreateProduct()}>Create new Product</button>) : (<></>)}
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

export default ProductComponent