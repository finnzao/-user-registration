import React from "react";
import { Link } from "react-router-dom";
export default props =>
    <Link to={props.href}>
        <i className={props.className}></i>{props.nome}
    </Link>
