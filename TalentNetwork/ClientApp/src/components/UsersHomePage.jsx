import { Component } from "react";
import { NavLink } from "react-router-dom";



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
            postsPerPage: 3,
            currentPage: 1,
            isFilterd:false

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
    handleFilterCity = (event) => {
        const filterByCity = event.target.value;
        this.setState({ isFilterd: true });
        this.setState({ filterByCity }, this.filterdArr);
        if (filterByCity != "")
        {
            this.setState({ isFilterd: true });

        }
        if (filterByCity == "") {
            this.setState({ isFilterd: false });

        }
    };
    //
    handleFilterSub = (event) => {
        const filterBySub = event.target.value;
        this.setState({ filterBySub }, this.filterdArr);
        if (filterBySub != "") {
            this.setState({ isFilterd: true });

        }
        if (filterBySub == "") {
            this.setState({ isFilterd: false });

        }
        
    };
    //
    filterdArr = () => {
        const { filterByCity, filterBySub } = this.state;
        const filterdArr = this.state.items.filter(item =>
            item.city.toLowerCase().includes(filterByCity.toLowerCase()) &&
            item.talent.toLowerCase().includes(filterBySub.toLowerCase())
        );
        this.setState({ filterdArr });
    };


    showData = () => {

        const { postsPerPage, currentPage, items } = this.state;
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentPosts = items.slice(indexOfFirstPage, indexOfLastPage)
        let rowsMore = this.state.moreDetailsProj.map((p, i) => {
            return (<ul>
                <li className>🆎 PROJECT: {p.projectName}
                    PRICE: {p.projectPrice}</li>
                <hr></hr> 
            </ul>);
        });
        //
        let rowsMoreFaq = this.state.moreDetailsFaqs.map((p, i) => {
            return (<ul>
                <li>🆎 Q: {p.question}
                    <button className=" btn btn-light" onClick={() => this.toggleAnswer(p.faqId)}>answer</button><br></br>
                    {this.state.clickForAnswer && this.state.currentFaq == p.faqId && <> {p.answer}</>}
                </li>
                <hr></hr>
            </ul>);
        });

        try {
            if (!this.state.isFilterd)

                return currentPosts.map((item, index) => {
                    return (
                        <tbody>
                            < tr style={{
                                width: "300px", height: "200px", border: " 2px solid #000", borderRadius: "20px", padding: " 10px",
                                "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
                            }}>
                                <td>{postsPerPage * (currentPage - 1) + index + 1}</td>
                                <td>{item.userId}</td>
                                <td>{item.userName}</td>
                                <td>{item.talent}</td>
                                <td>{item.city}</td>

                                <td>{item.contactPhone}</td>
                                <td><button className="btn btn-secondary" onClick={() => this.toggleDetails(item.userId, index)}>More Information</button>
                                    {this.state.currentItem == index && this.state.clickForMoreDetails && < div className="d-flex justify-content-center" > <img style={{ borderRadius: "50%", width: "150px", height: "120px" }} src={this.state.imageUrl} alt="Image" /><br></br>
                                        <h5>Projects</h5>
                                        <ul style={{
                                            boxAlign: "center"
                                        }}>{rowsMore}</ul>
                                        <h5> Q.A</h5>
                                        <ul>{rowsMoreFaq}</ul>

                                    </div>}

                                </td>
                            </tr>
                        </tbody>
                    )
                })

            else {

                return this.state.filterdArr.map((item, index) => {
                    return (
                        <tbody>
                            <tr style={{
                                width: "300px", height: "200px", border: " 2px solid #000", borderRadius: "20px", padding: " 10px",
                                "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
                                }}>
                                <td>{item.userId}</td>
                                <td>{item.userName}</td>
                                <td>{item.talent}</td>
                                <td>{item.city}</td>

                                <td>{item.contactPhone}</td>
                                <td><button className="btn btn-dark" onClick={() => this.toggleDetails(item.userId, index)}>More Information</button>
                                    {this.state.currentItem == index && this.state.clickForMoreDetails && < div className="  d-flex justify-content-center " > <img style={{ borderRadius: "50%", width: "150px", height: "120px" }} src={this.state.imageUrl} alt="Image" /><br></br>
                                        <h5>Projects</h5>
                                        <ul style={{
                                            boxAlign: "center"
                                        }}>{rowsMore}</ul>
                                        <hr></hr>
                                        <h5> Q.A</h5>
                                        <ul>{rowsMoreFaq}</ul>

                                    </div>}

                                </td>
                            </tr>
                        </tbody>
                    )
                })
            }



        } catch (e) {
            alert(e.message)
        }
    }
    showPagination = () => {
        const { postsPerPage, filterdArr } = this.state;
        const pageNumbers = [];
        const totalPosts = filterdArr.length;

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i)
        }

        const pagination = (pageNumbers) => {
            this.setState({ currentPage: pageNumbers })
        }

        return (
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className={this.state.currentPage === number ? 'page-item active' : 'page-item'}>
                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                        </li>
                    ))}
                </ul>
            </nav>
        )


    }


    handleRefresh = () => {
        window.location.reload();
    };
    render() {
        let {  loading } = this.state
        if (loading)
        return (<div>no home page data</div>);
        //
     
        return (
            <>
                <h1 style={{ color: "red", textAlign: "center" }}>Hello {this.props.name} </h1>
                <hr />
                <div className="d-flex justify-content-end">
                <button className="btn btn-info" onClick={this.handleRefresh}>Log Out</button>
                    </div>
                <NavLink to="manage-user" style={{ fontSize: "20px",
                fontWeight: "bold"
                 } } >Mange Your Profile</NavLink > 
                {this.props.admin == 2 && <div>Admin Only: <></><NavLink to="admin-home-page" style={{
                    fontSize: "18px",
                    fontWeight: "bold"
                }}>Mange Users</NavLink ></div>}
               

                <input className="form-control" type="text" placeholder="Find By City🔎" onChange={this.handleFilterCity} /> <></><br></br>
                <input type="text" className="form-control" placeholder="Find By Profession🔎" onChange={this.handleFilterSub} /> <br></br>
                <div className="container">
                    <table className="table align-items-center justify-content-center mb-0">
                        <thead className= "table table-secondary">
                            <tr>
                                <th>num</th>
                                <th>User Id</th>
                                <th>User Name</th>
                                <th>Talent</th>
                                <td>City</td>
                                <th>contact Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        { this.showData()}
                    </table>

                    <div style={{ float: 'right' }}>
                        {!this.state.isFilterd&&this.showPagination()}
                    </div>
                    

                </div>
               
            </>
        );
    }
    populateProductsData() {
        fetch('https://localhost:7116/talentUsers').then(res => res.json()).
            then(json => this.setState({ items: json, loading: false, filterdArr: json })).
            catch(err => console.error(err));
    }
 
 


}