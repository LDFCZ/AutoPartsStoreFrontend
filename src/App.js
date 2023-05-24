
import './App.css';
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductComponent from "./components/ProductComponent"
import ClientComponent from './components/ClientComponent';
import ClientOrderComponent from './components/ClientOrderComponent';
import DefectComponent from './components/DefectComponent';
import OfferComponent from './components/OfferComponent';
import ProductTypeComponent from './components/ProductTypeComponent';
import ShopOrderComponent from './components/ShopOrderComponent';
import SupplierComponent from './components/SupplierComponent';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {

      };
  }



  render() {
      const {  } = this.state;

      return (
          <div className="container">
              <header className="header">
                <nav bg="light" expand="lg" >
                <ul class="nav nav-tabs">
                    <Link to={"/"} className="nav-link">
                      Home
                    </Link>
                    <Link to={"/product-types"} className="nav-link">
                        Product types
                    </Link>
                    <Link to={"/products"} className="nav-link">
                        Products
                    </Link>
                    <Link to={"/clients"} className="nav-link">
                        Clients
                    </Link>
                    <Link to={"/client-orders"} className="nav-link">
                        Client orders
                    </Link>
                    <Link to={"/defects"} className="nav-link">
                        Defects
                    </Link>
                    <Link to={"/offers"} className="nav-link">
                        Offers
                    </Link>
                    <Link to={"/shop-orders"} className="nav-link">
                        Shop orders
                    </Link>
                    <Link to={"/suppliers"} className="nav-link">
                        Suppliers
                    </Link>
                  </ul>
                </nav>
              </header>
              <main className='main'>
                <section className="container-fluid mt-5">
                  Крутой проект по БД. Выполнил Лопаткин Василий гр.20207 НГУ ФИТ ❤
                  <Routes>
                      <Route path="/products" element={<ProductComponent/>} />
                      <Route path="/clients" element={<ClientComponent/>} />
                      <Route path="/client-orders" element={<ClientOrderComponent/>} />
                      <Route path="/defects" element={<DefectComponent/>} />
                      <Route path="/offers" element={<OfferComponent/>} />
                      <Route path="/product-types" element={<ProductTypeComponent/>} />
                      <Route path="/shop-orders" element={<ShopOrderComponent/>} />
                      <Route path="/suppliers" element={<SupplierComponent/>} />
                  </Routes>
                </section>
              </main>
          </div>
      );
  }
}


export default App;
