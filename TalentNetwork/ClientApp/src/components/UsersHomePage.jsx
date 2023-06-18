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
            currentFaq: 0,
            imageUrl: null,
            currentPage: 1,
            filterByCity: "",
            filterBySub: "",
            filterdArr: [],
            clickForAnswer: false,

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
    toggleAnswer = (i) =>
    {
        this.setState(prevState => ({
            clickForAnswer: !prevState.clickForAnswer
        }));
        this.setState({ currentFaq: i });
    }
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
                    <button className=" btn btn-light" onClick={() => this.toggleAnswer(p.faqId)}>answer</button><br></br>
                    {this.state.clickForAnswer && this.state.currentFaq == p.faqId && <> { p.answer }</>}
                </li>
            </ul>);
        });
        //
        let rows = filterdArr.map((p, i) => {
            return (<tr >
                <td>user id: {p.userId}</td>
                <td> 👤 {p.userName}</td>
                <td>  🔨 {p.talent}</td>
                <td>  🌐{p.city}</td>
                <td> 📞{p.contactPhone}</td>
                {this.state.currentItem == i && this.state.clickForMoreDetails && < div className="card bg-light mb-3"> <img style={{ height: "100px" }} src={imageUrl} alt="Image" /><br></br>
                    <h5>Projects</h5>
                    <ul style={{ boxAlign: "center",
                    
                      } }>{rowsMore}</ul>
                    <h5> Q.A</h5>
                        <ul>{rowsMoreFaq}</ul>
                    
                </div>}
                <td><button className="btn btn-dark" onClick={() => this.toggleDetails(p.userId,i)}>More Information</button>

                </td>
                <br></br>
            </tr>);
        });
        //
      

        return (
            <>
                <h1 style={{ color: "red", textAlign: "center" }}>Hello {this.props.name} </h1>
                <hr />
                <NavLink to="manage-user" style={{ fontSize: "20px",
                fontWeight: "bold"
                 } } >Mange Your Profile</NavLink > 
                {this.props.admin == 2 && <div>Admin Only: <></><NavLink to="admin-home-page" style={{
                    fontSize: "18px",
                    fontWeight: "bold"
                }}>Mange Users</NavLink ></div>}
               

                <input className="form-control" type="text" placeholder="Find By City🔎" onChange={this.handleFilterCity} /> <></><br></br>
                <input type="text" className="form-control" placeholder="Find By Profession🔎" onChange={this.handleFilterSub} /> <br></br>
                <table className="table">
              
                    <thead className="table">
                        <tr>   
                        </tr>
                    </thead>
                    <tbody className="card-body">{rows}</tbody>

                </table>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li className="page-item"><a class="page-link" href="#">1</a></li>
                        <li className="page-item active">
                            <a className="page-link" href="#">2 <span class="sr-only"></span></a>
                        </li>
                        <li className="page-item"><a class="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/talentUsers').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false, filterdArr: json })).
            catch(err => console.error(err));
    }
 
 


}