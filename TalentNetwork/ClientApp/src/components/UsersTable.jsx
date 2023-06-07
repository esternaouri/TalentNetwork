import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

export class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };
    }
    async del(id) {
        try {
            let res = await axios.delete('https://localhost:7116/Users/' + id);
            if (res.ok) {
                this.populateProductsData();
            }
        } catch (e) {
            alert(e.message);
        }


    }
    componentDidMount() {
        this.populateProductsData();
    }
    render() {
        let { items, loading } = this.state
        if (loading)
            return (<div>no users</div>);

        let rows = items.map((p,i) => {
            let editTo = "/users/edit-user/" + p.UserId;
            return (<tr>
                <td>{p.userId}</td>
                <td>{p.userName}</td>
                <td>{p.password}</td>
                <td>{p.isAdmin}</td>
                <td>{p.phoneNumber}</td>

                <td><NavLink to={editTo} >Edit</NavLink> |
                    <button onClick={(e) => this.del(p.userId)} className=" btn btn-primary">Del</button>
                </td>

            </tr>);
        });
           console.log(items);
       // console.log(rows);
        return (
            <>
                <h1>Users List</h1>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>User id</th>
                            <th>user name</th>
                            <th>Password Hash</th>
                            <th>is admin</th>
                            <th>Phone</th>
                           

                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/users').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false })).
            catch(err => console.error(err));
    }
}