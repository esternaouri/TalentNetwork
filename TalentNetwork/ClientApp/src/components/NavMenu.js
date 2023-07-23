import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        logout:"logIn/Out"
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (

        <header>

        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom boxShadow mb-3" container light>
                <NavbarBrand tag={Link} to="/login" style={{ color: "red", fontWeight: "900", fontSize: "24px" }}> 🟥</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink style={{color:"red"}} tag={Link} className="text-dark" to="/">About</NavLink>
                        </NavItem>
                    
                        <NavItem>
                            <NavLink style={{ color: "red" }}  tag={Link} className="text-dark" to="/login">Home</NavLink>
                        </NavItem>
                        <NavItem>
                        </NavItem>
                    </ul>

          </Collapse>
        </Navbar>
            </header>

    );
  }
}
