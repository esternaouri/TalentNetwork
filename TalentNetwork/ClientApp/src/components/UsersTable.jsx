import { Component } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
const { REACT_APP_API_URL } = process.env;

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
            isOkMessage: false,
            isFilterd: false,
            filterdArr: [],
            filterByName:"",
            filterById:0,
        };
        
    }
           //--------------------------------------FOR Delete DATA-----------------------------------------------------//

    async del(id) {
        try {
            let res = await axios.delete(`${REACT_APP_API_URL}/Users/` + id);

            alert('success');
            this.populateProductsData();


        } catch (e) {
            alert(e.message);
        }
    }


       //--------------------------------------FOR EDIT DATA-----------------------------------------------------//
    async handleEditClick(id, name, password, isadmin) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.setState({ edit: !this.state.edit });
        this.setState({ newIsAdmin: isadmin });
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

        axios.put(`${REACT_APP_API_URL}/Users/` + this.state.id, post)
            .then(response => {

                if (response) {
                    alert("Done");
                    this.setState({ edit: false });
                    this.populateProductsData();
                }
                throw new Error('PUT request failed');
            })
            .then(data => {

                
            })
            .catch(error => {
                console.error(error);
            });
    }
 
   //-----------------------------------FOR FOLTERING DATA-----------------------------------------------------//

    handleFilterName = (e) =>
    {
        this.setState({ filterByName: e.target.value, isFilterd: true });
        const filterdArr = this.state.items.filter(item =>
            item.userName.toLowerCase().includes(e.target.value.toLowerCase()) 


        );
        this.setState({ filterdArr });

    }
    handleFilterId = (e) => {
        this.setState({ filterById: e.target.value });
        const filter = this.state.items.filter(item =>
            item.userId == e.target.value

        );
        if (e.target.value == 0) {
            this.setState({ filterdArr: this.state.items })
        }
        else {
            this.setState({ filterdArr: filter });

        }

    }

    //--------------------------------------------------------------------------------------------------------//
    componentDidMount() {
        this.populateProductsData();
    }
    //----------------------------------------------------------------------------------------------------------//
    render() {
        let {  loading, filterdArr } = this.state
        if (loading)
            return (<div>no users</div>);
        let rows = filterdArr.map((p, i) => {
            return (<tr key={"f_tr_"+i }>
                <td >{p.userId}</td>
                <td >{p.userName}</td>
                <td >{p.email}</td>

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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin:"3%"
                }}>
                <input className="form-control" type="text" placeholder="Find By Name🔎" onChange={this.handleFilterName} /> <hr></hr>
                    <input type="text" className="form-control" placeholder="Find By Id🔎" onChange={this.handleFilterId} /> <br></br>
                </div>
                <hr></hr>
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
                        <button className="btn btn-info" type="submit" onClick={() => this.setState({ edit: false })}> cancel!</button>


                    </form>
                }

                <div style={{
                    width: "100 %",
                    height: "1050px",
                    overflow: "auto",
                    position: "relative"
                }}>
                    <table className=" table table table-striped ">

                        <thead style={{
                            position: "sticky",
                            top: 0
                        }} className="table table-secondary">
                            <tr>
                                <th >User id</th>
                                <th >user name</th>
                                <th >Email</th>
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
        fetch(`${REACT_APP_API_URL}/users`).then(res => res.json()).
            then(json => this.setState({ items: json, loading: false, filterdArr :json})).
            catch(err => console.error(err));
    }
}