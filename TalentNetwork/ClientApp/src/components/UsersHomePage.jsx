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
            imageUrl:null,
        };
    }
    //
    toggleDetails = (id,i) => {
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


        fetch('https://localhost:7116/TalentUsers/Image/' + id)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the image data
                const url = URL.createObjectURL(blob);
                this.setState({ imageUrl: url, currentItem:i })
            });

        // Clean up the URL when the component unmounts
        return () => URL.revokeObjectURL(this.state.imageUrl);
    
    };
    //
    componentDidMount() {
        this.populateProductsData();
        this.setState({ currentUser : this.props.id})
    }
    //
   
    render() {
        let { items, loading, clickForMoreDetails, moreDetailsProj, moreDetailsFaqs, imageUrl } = this.state
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
                {this.state.currentItem==i && < td > <img style={{ height: "100px" }} src={imageUrl} alt="Image" /></td>}
                <td><button onClick={() => this.toggleDetails(p.userId,i)}>More Information</button>

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
                <h1>Hello {this.props.name}  </h1>
                <hr />
                <NavLink to="manage-user">Mange Your Profile</NavLink > 
                {this.props.admin == 2 && <div>Admin Only: <></><NavLink to="admin-home-page">Mange Users</NavLink ></div> }
             
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