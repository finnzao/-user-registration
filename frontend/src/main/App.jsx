import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import "./App.css"
import React from "react";

import { BrowserRouter } from 'react-router-dom'

import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Routers from "./Routers";
import Footer from '../components/template/Footer';


export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo></Logo>
            <Nav></Nav>
            <Routers></Routers>
            <Footer></Footer>
        </div>
    </BrowserRouter>
