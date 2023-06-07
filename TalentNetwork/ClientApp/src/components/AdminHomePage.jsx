import React, { Component } from 'react';
import { Link, useNavigate } from "react-router-dom";

export class AdminHomePage extends Component {

    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <div>
                <h1>Hello Admine</h1>

                <p>This is a simple example of a React component.</p>

                <button className="btn btn-primary"> Manage Users </button> 
                ||
                <Link to="/users">Go to User Mangment</Link>

            </div>
        );
    }
}
