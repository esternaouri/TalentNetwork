import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Navigate } from "../../../../node_modules/react-router-dom/dist/index";
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';



export class UsersHomePage extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            items: [],
            loading: true,
            clickForMoreDetails:false,
            moreDetailsProj: [],
            moreDetailsFaqs: [],
            currentItem: 0,

        };
    }
    //
    toggleDetails = (id) => {
        this.setState(prevState => ({
            clickForMoreDetails: !prevState.clickForMoreDetails
        }));
        fetch('https://localhost:7116/ProjectsForTalents/' + id).then(res => res.json()).
            then(json => this.setState({ moreDetailsProj: json})).
            catch(err => console.error(err));
        console.log(JSON.stringify(this.state.moreDetailsProj));

        fetch('https://localhost:7116/Faqs/' + id).then(res => res.json()).
            then(json => this.setState({ moreDetailsFaqs: json })).
            catch(err => console.error(err));
            console.log(JSON.stringify(this.state.moreDetailsFaqs));
    };
    //
    componentDidMount() {
        this.populateProductsData();
        this.setState({ currentUser : this.props.id})
    }
    //
   
    render() {
        let { items, loading, clickForMoreDetails, moreDetailsProj, moreDetailsFaqs } = this.state
        if (loading)
        return (<div>no home page data</div>);
        //
        let rows = items.map((p, i) => {
            return (<tr className="card">
                <td>user id: {p.userId}</td>
                <td> 👤 {p.userName}</td>
                <td>  🔨 {p.talent}</td>
                <td>  🌐{p.city}</td>
                <td> 📞{p.contactPhone}</td>
                <td><button onClick={() => this.toggleDetails(p.userId)}>More Information</button>

                </td>

            </tr>);
        });
        //
        let rowsMore = moreDetailsProj.map((p, i) => {
            return (<ul>
                <li>🆎 PROJECT: {p.projectName}
                    💳| PRICE: {p.projectPrice}</li>
            </ul>);
        });
        //
        let rowsMoreFaq = moreDetailsFaqs.map((p, i) => {
            return (<ul>
                <li>🆎 Q: {p.question}
                    💳| A: {p.answer}</li>
            </ul>);
        });
        //

        return (
            <>
                <h1>Hello User num : {this.props.id}  </h1>
                <hr />
                <NavLink to="manage-user">Mange Your Profile</NavLink >
                <table className="table">
                    {clickForMoreDetails && <div className="alert alert-info">
                        Projects|
                        <ul>{rowsMore}</ul>
                        Q.A|
                        <ul>{rowsMoreFaq}</ul>
                    </div>}      
                    <thead className="table">
                        <tr>   
                        </tr>
                    </thead>
                    <tbody className= "card-body">{rows}</tbody>
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