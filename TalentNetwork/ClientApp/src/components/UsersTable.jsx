import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

export class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            items: [],
            loading: true,
            edit: false,
            newUserName: "",
            newPassword: "",
            newIsAdmin: 0,
            id:0
        };

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
    
    async handleEditClick(id) {

        this.setState({ edit: true });
        this.setState({ id: id });
       
    }

    async onSubEdit()
    {
        const post = {
            UserId: this.state.id,
            UserName: this.state.newUserName,
            Password: this.state.newPassword,
            IsAdmin: this.state.newIsAdmin

        }

        axios.put('https://localhost:7116/Users/' + this.state.id, post)
            .then(response => {
                if (response.ok) {
                    alert("ok");
                }
                throw new Error('PUT request failed');
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.populateProductsData();
    }
    render() {
        let { items, loading } = this.state
        if (loading)
            return (<div>no users</div>);

        let rows = items.map((p,i) => {
            return (<tr>
                <td>{p.userId}</td>
                <td>{p.userName}</td>
                <td>{p.password}</td>
                <td>{p.isAdmin}</td>
                <td>{p.phoneNumber}</td>

                <td><button onClick={(e) => this.handleEditClick(p.userId)}> Edit</button> |
                    <button onClick={(e) => this.del(p.userId)} className=" btn btn-primary">Del</button>
                </td>

            </tr>);
        }); 
        // console.log(items);
        console.log(this.state.newUserName);
        return (
            <>
                <h1>Users List</h1>
                <hr />
                {this.state.edit &&
                    <form onSubmit={this.onSubEdit() }>
                        <label>
                            User Name:
                            <input type="text" onChange={(e) => this.setState({ newUserName: e.target.value })} />
                        </label>
                        <label>
                            Password:
                            <input type="text" onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        </label> <label>
                            Is Admin:
                            <input type="number" onChange={(e) => this.setState({ newIsAdmin: e.target.value })} />
                        </label>

                        <button type="submit"> edit!</button>

                    </form>
                }

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