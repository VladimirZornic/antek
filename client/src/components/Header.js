import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
class Header extends Component {
    render(){
        return (
            <nav>
                <ul>
                    <li><NavLink activeClassName="selected-link" exact to="/">PhoneBook</NavLink></li>
                    <li><NavLink activeClassName="selected-link" to="/add">Add New Number</NavLink></li>
                </ul>
                <p className="nav-logo">PhoneBookMe</p>
            </nav>
        )
    }
}
export default Header;