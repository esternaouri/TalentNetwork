import { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Row from "../../../../node_modules/react-bootstrap/esm/Row";
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

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
            id: 0,
            isOkMessage:false
        };

    }
    async del(id) {
        try {
            let res = await axios.delete('https://localhost:7116/Users/' + id);
            
                alert('success');
                this.populateProductsData();

            
        } catch (e) {
            alert(e.message);
        }
    }
    
    async handleEditClick(id,name, password, isadmin) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.setState({ edit: !this.state.edit });
        this.setState({ newIsAdmin: isadmin});
        this.setState({ id: id });
        this.setState({ newPassword: "1111" });
        this.setState({ newUserName: name });
       
    }

    async onSubEdit(e) {
        e.preventDefault();

        const post = {
            UserId: this.state.id,
            UserName: this.state.newUserName,
            Password: this.state.newPassword,
            IsAdmin: this.state.newIsAdmin

        }

        axios.put('https://localhost:7116/Users/' + this.state.id, post)
            .then(response => {

                if (response) {
                    alert("Done");
                    this.setState({ edit: false });
                    this.populateProductsData();
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
        let { items, loading, isOkMessage } = this.state
        if (loading)
            return (<div>no users</div>);
      

        let rows = items.map((p,i) => {
            return (<tr>
                <td >{p.userId}</td>
                <td >{p.userName}</td>
                <td >{p.isAdmin}</td>

                <td scope="row"> <button className="btn btn-info" onClick={(e) => this.handleEditClick(p.userId, p.userName, p.password, p.isAdmin)}> 🖊️</button> <><br></br></>

                </td>
                <td>
                    <button className="btn btn-info" onClick={(e) => this.del(p.userId)} >🗑️</button>

                </td>

            </tr>);
        }); 
     
        return (
            <>
                <h1>Users List</h1>
               
                <hr />
                {this.state.edit &&
                    <form onSubmit={(e) => { this.onSubEdit(e) }} >
                        <label>
                            line to edit :{this.state.id}
                            </label>
                    <label>
                            User Name:
                            <input className="form-control" type="text" value={this.state.newUserName} onChange={(e) => this.setState({ newUserName: e.target.value })} />
                        </label>
                        <label>
                            Password:
                            <input className="form-control" type="text" value={this.state.newPassword} onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        </label> <label>
                            Is Admin:
                            <input type="number" className="form-control" value={this.state.newIsAdmin} onChange={(e) => this.setState({ newIsAdmin: e.target.value })} />
                        </label>
                        <button className="btn btn-info" type="submit"> edit!</button>
                        <button className="btn btn-info" type="submit" onClick={() => this.setState({edit:false})}> cancel!</button>


                    </form>
                }
                <div className="container">
                    <table className=" table table table-striped ">
                    
                    <thead className="table table-dark">
                            <tr>
                                <th >User id</th>
                                <th >user name</th>
                                <th >is admin</th>
                                <th >Edit</th>
                                <th >Delete</th>
                           
                        </tr>
                        </thead>
                        <tbody className="table table-striped ">{rows}</tbody>
                    </table>
                    </div>
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/users').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false })).
            catch(err => console.error(err));
    }
}