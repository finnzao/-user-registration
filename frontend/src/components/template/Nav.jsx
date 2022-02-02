import "./Nav.css"
import React from "react"
import Navitem from "./Nav-item"

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Navitem href="/" className="fa fa-home" nome="Inicio"></Navitem>
            <Navitem href="/users" className="fa fa-users " nome="Usuarios"></Navitem>
        </nav>
    </aside>