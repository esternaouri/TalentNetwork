import React, { Component } from 'react';

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
                <button className="btn btn-primary"> Go To Users Page </button> 

            </div>
        );
    }
}
