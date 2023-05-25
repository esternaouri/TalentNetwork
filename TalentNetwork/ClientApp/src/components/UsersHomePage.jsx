import { Component } from "react";
import { NavLink } from "react-router-dom";


export class UsersHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true};
    }
    async del(id) {
        // alert(id);
        try {
            let res = await fetch('talentUsers/' + id, { method: 'DELETE' });
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
            return (<div>no home page data</div>);

        let rows = items.map((p, i) => {
            let editTo = "/users/edit-user/" + p.UserId;
            return (<tr>
                <td>{p.userId}</td>
                <td>{p.userName}</td>
                <td>{p.talent}</td>
                <td>{p.city}</td>
                <td>{p.contactPhone}</td>

                <td><NavLink to={editTo} >Edit</NavLink> |
                    <button onClick={(e) => this.del(p.id)} className=" btn btn-primary">Del</button>
                </td>

            </tr>);
        });
        console.log(items);
        // console.log(rows);
        return (
            <>
                <h1>Hello User num : {this.props.id}! </h1>
                <hr />
                <NavLink to="create-user">create user</NavLink>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Talent</th>
                            <th>City</th>
                            <th>Phone Number</th>

                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/talentUsers').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false })).
            catch(err => console.error(err));
    }
}