import React, { Component } from 'react';
import { Link, useNavigate } from "react-router-dom";

export class AdminHomePage extends Component {

    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <div>
                <h1>Hello Admin</h1>
                <p>How Do You Feel Today?</p>

                <Link to="/users-home-page">Go to User Home Page</Link><br></br>
                OR
                <br></br>
                <Link to="/users">Go to User Mangment</Link>

            </div>
        );
    }
}
