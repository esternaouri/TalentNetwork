import { Component } from "react";
import { NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';


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
            imageUrl: null,
            currentPage: 1,
            filterByCity: "",
            filterBySub: "",
            filterdArr :[]
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
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    //
    handleFilterCity = (event) => {
        const filterByCity = event.target.value;
        this.setState({ filterByCity }, this.filterdArr);
    };

    handleFilterSub = (event) => {
        const filterBySub = event.target.value;
        this.setState({ filterBySub }, this.filterdArr);
    };
    filterdArr = () => {
        const { filterByCity, filterBySub } = this.state;
        const filterdArr = this.state.items.filter(item =>
            item.city.toLowerCase().includes(filterByCity.toLowerCase()) &&
            item.talent.toLowerCase().includes(filterBySub.toLowerCase())
        );
        this.setState({ filterdArr });
    };
    render() {
        let { items, loading, clickForMoreDetails, moreDetailsProj, moreDetailsFaqs, imageUrl, filterdArr } = this.state
        if (loading)
        return (<div>no home page data</div>);
        //
        let rows = filterdArr.map((p, i) => {
            return (<tr className="card">
                <td>user id: {p.userId}</td>
                <td> 👤 {p.userName}</td>
                <td>  🔨 {p.talent}</td>
                <td>  🌐{p.city}</td>
                <td> 📞{p.contactPhone}</td>
                {this.state.currentItem==i && < td > <img style={{ height: "100px" }} src={imageUrl} alt="Image" /></td>}
                <td><button className="btn btn-dark" onClick={() => this.toggleDetails(p.userId,i)}>More Information</button>

                </td>
                <br></br>
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
                <h1 style={{ color: "red", textAlign: "center" }}>Hello {this.props.name} 🌖 </h1>
                <hr />
                <NavLink to="manage-user" style={{ fontSize: "20px",
                fontWeight: "bold"
                 } } >Mange Your Profile</NavLink > 
                {this.props.admin == 2 && <div>Admin Only: <></><NavLink to="admin-home-page" style={{
                    fontSize: "18px",
                    fontWeight: "bold"
                }}>Mange Users</NavLink ></div>}
               

                <input className="form-control" type="text" placeholder="Find By City🔎" onChange={this.handleFilterCity} /> <></><br></br>
                <input type="text" className="form-control" placeholder="Find By Subject🔎" onChange={this.handleFilterSub} /> <br></br>
                <table className="table">
                    {clickForMoreDetails && <div


                        style={{ boxShadow: "20%" }}>

                        Projects|
                        <Modal.Body>
                        <ul>{rowsMore}</ul>
                        Q.A|
                            <ul>{rowsMoreFaq}</ul>
                            </Modal.Body>
                    </div>} 




                    <thead className="table">
                        <tr>   
                        </tr>
                    </thead>
                    <tbody className="card-body">{rows}</tbody>

                </table>
           
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/talentUsers').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false, filterdArr: json })).
            catch(err => console.error(err));
    }
 
 


}