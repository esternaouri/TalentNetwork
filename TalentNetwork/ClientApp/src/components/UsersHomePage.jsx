import { Component } from "react";
import { NavLink } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;



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
            filterByName: "",
            filterById: "",
            filterdArr: [],
            clickForAnswer: false,
            postsPerPage: 3,
            currentPage: 1,
            isFilterd:false

        };
    }

    //open details for row
    toggleDetails = (id,i) => {
        this.setState(prevState => ({
            clickForMoreDetails: !prevState.clickForMoreDetails
        }));
        fetch(`${REACT_APP_API_URL}/ProjectsForTalents/` + id).then(res => res.json()).
            then(json => this.setState({ moreDetailsProj: json})).
            catch(err => console.error(err));

        fetch(`${REACT_APP_API_URL}/Faqs/` + id).then(res => res.json()).
            then(json => this.setState({ moreDetailsFaqs: json })).
            catch(err => console.error(err));


        fetch(`${REACT_APP_API_URL}/TalentUsers/Image/` + id)
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the image data
                const url = URL.createObjectURL(blob);
                this.setState({ imageUrl: url, currentItem:i })
            });

        // Clean up the URL when the component unmounts
        return () => URL.revokeObjectURL(this.state.imageUrl);
    
    };
    //open answer in details of a row
    toggleAnswer = (i) =>
    {
        this.setState(prevState => ({
            clickForAnswer: !prevState.clickForAnswer
        }));
        this.setState({ currentFaq: i });
    }
    // fetch home table
    componentDidMount() {
        this.populateTableData();
        this.setState({ currentUser : this.props.id})
    }
    // filtering by city 
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
    //filtering by proffesion
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
 
    // rendering filterd array of data
    filterdArr = () => {
        const { filterByCity, filterBySub } = this.state;
        const filterdArr = this.state.items.filter(item =>
            item.city.toLowerCase().includes(filterByCity.toLowerCase()) &&
            item.talent.toLowerCase().includes(filterBySub.toLowerCase()) 
         

        );
        this.setState({ filterdArr });
    };
    //
    watsup = (phone) =>
    {
        const url = `https://wa.me/${phone}`;

        window.open(url, '_blank');
    }

    // data of the main table rendering by pagination or filterring
    showData = () => {

        const { postsPerPage, currentPage, items } = this.state;
        const indexOfLastPage = currentPage * postsPerPage;
        const indexOfFirstPage = indexOfLastPage - postsPerPage;
        const currentPosts = items.slice(indexOfFirstPage, indexOfLastPage)
        let rowsMore = this.state.moreDetailsProj.map((p, i) => {
            return (<span key={"proj_"+i}>
                <span>{p.projectName}</span>
                <span> {p.projectPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}</span><hr></hr>
            </span>);
        });
        //
        let rowsMoreFaq = this.state.moreDetailsFaqs.map((p, i) => {
            return (<span key={"faq_"+i}>
                <li key={"faq_li" + i}>🆎 Q: {p.question}
                    <button className=" btn btn-light" onClick={() => this.toggleAnswer(p.faqId)}>answer</button><br></br>
                    {this.state.clickForAnswer && this.state.currentFaq == p.faqId && <> {p.answer}</>}
                </li>
                <hr></hr>
            </span>);
        });

        try {
            if (!this.state.isFilterd)

                return currentPosts.map((item, index) => {
                    return (
                        
                        < tbody key={"_body1_"+index }>
                            < tr key={"f_tr_"+index} style={{
                                    width: "300px", height: "200px", border: " 2px solid #000", borderRadius: "20px", padding: " 10px",
                                    "boxshadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
                                }}>
                                <td key={"f_td"+index }>{postsPerPage * (currentPage - 1) + index + 1}</td>
                                <td key={"f_td"+12 }>{item.userId}</td>
                                <td key={"f_td" + 13 }>{item.userName}</td>
                                <td key={"f_td" + 14}>{item.talent}</td>
                                <td key={"f_td" + 15}>{item.city}</td>
                                <td key={"f_td" + 16}>{item.email}</td>
                                <td key={"f_td" + 17}>{item.contactPhone}</td>
                                <td key={"f_td" + 18}> <button className="btn btn-success" onClick={() => this.watsup(item.contactPhone)}>Whatsaap💬</button></td>
                                <td key={"f_td" + 19}><button className="btn btn-secondary" onClick={() => this.toggleDetails(item.userId, index)}>More </button>
                                    {this.state.currentItem == index && this.state.clickForMoreDetails && < span style={{ display: "flex", justifyContent:"center" }}>
                                        <span> <img style={{ borderRadius: "50%", width: "150px", height: "120px" }} src={this.state.imageUrl} alt="Image" /> </span>
                                        <span>{rowsMore}</span>

                                            <span>{rowsMoreFaq}</span>

                                        </span>}

                                    </td>
                                </tr>
                            </tbody >
                    )
                })

            else {

                return this.state.filterdArr.map((item, index) => {
                    return (

                        < tbody key={"_body2" + 2}>
                            < tr key={ "tr_"+index} style={{
                                    width: "300px", height: "200px", border: " 2px solid #000", borderRadius: "20px", padding: " 10px",
                                    "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)"
                                }}>
                                <td key={"_td" + 1}>{postsPerPage * (currentPage - 1) + index + 1}</td>
                                <td key={"_td" + 10}>{item.userId}</td>
                                <td key={"_td" + 12}>{item.userName}</td>
                                <td key={"_td" + 11}>{item.talent}</td>
                                <td key={"_td" + 17}>{item.city}</td>
                                <td key={"_td" + 12}>{item.email}</td>
                                <td key={"_td" + 14}>{item.contactPhone} <button className ="btn btn-success" onClick={() => this.watsup(item.contactPhone)}>Whatsaap💬</button></td>
                                <td key={"_td" + 15}><button className="btn btn-secondary" onClick={() => this.toggleDetails(item.userId, index)}>More </button>
                                        {this.state.currentItem == index && this.state.clickForMoreDetails && < td style={{ display: "flex", justifyContent: "center" }}>
                                            <td> <img style={{ borderRadius: "50%", width: "150px", height: "120px" }} src={this.state.imageUrl} alt="Image" /> </td>
                                            <td>{rowsMore}</td>

                                            <td>{rowsMoreFaq}</td>

                                        </td>}

                                    </td>
                                </tr>
                            </tbody >
                    )
                })
            }



        } catch (e) {
            alert(e.message)
        }
    }
    //mange pagination
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
                        <li key={ "pagination_"+number} className={this.state.currentPage === number ? 'page-item active' : 'page-item'}>
                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                        </li>
                    ) )}
                </ul>
            </nav>
        )


    }

    // log out 
    handleRefresh = () => {
        window.location.reload();
    };
    render() {
        let {  loading } = this.state
        if (loading)
        return (<div>no home page data</div>);
        //
     
        return (
            < div>

                <h1 style={{ color: "#20B2AA", textShadow:" 2px ", textAlign: "center" }}>Hello {this.props.name} </h1>

                <hr />
                <div className="d-flex justify-content-end">
                    <img src="BEAR green.png" style={{ width: "5%", height: "5%" }} />

                    <button className="btn btn-lg  btn-info" onClick={this.handleRefresh}>Log Out</button>
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
               

                <div style={{
                    width: "100 %", 
                    height: "600px",
                    overflow: "auto",
                    whiteSpace: "nowrap"
                }}>
                    <table  className="table align-items-center justify-content-center mb-0">
                        <thead style={{
                            position: "sticky",
                            top: 0
                        }} className = "table table-secondary">
                            <tr >
                                <th key="header0" >num</th>
                                <th key="header1" >User Id</th>
                                <th key="header2" >User Name</th>
                                <th key="header3">Talent</th>
                                <th key="header4" >City</th>
                                <th key="header5">Email</th>
                                <th key="header6" >contact Phone</th>
                                <th key="header7"></th>
                                <th key="header8"></th>

                            </tr>
                        </thead>
                        { this.showData()}
                    </table>                  

                </div>
                <div style={{ float: 'right' }}>
                    {!this.state.isFilterd && this.showPagination()}
                </div>
                <hr></hr>
                <h5 style={{color:"blue"} }>Post Per Page:</h5>
                <select className="form-select " aria-label="Post Per Page" value={this.state.postsPerPage} onChange={(e) => { this.setState({ postsPerPage: e.target.value }) }}>
                    <option defaultValue>Post Per Page</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>

                </select>
            </div>
        );
    }
    //populate table data
    populateTableData() {
        fetch(`${REACT_APP_API_URL}/talentUsers`).then(res => res.json()).
            then(json => this.setState({ items: json, loading: false, filterdArr: json })).
            catch(err => console.error(err));
    }
 
 


}