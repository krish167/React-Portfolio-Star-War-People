import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App  extends Component {
  constructor(props) {
    super(props);
    this.renderProfList = this.renderProfList.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.state = {
      profileList: [],
      activeIndex: null,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      loading: true
    };
  }

  componentWillMount() {
    this.getProfileData();
  }

  getProfileData() {
    let url = 'https://swapi.co/api/people/?page=';
    let pageNo = this.state.currentPage;
    fetch(url+pageNo)
      .then((response) =>  response.json())
      .then(myJSON => {
          this.setState({
              profileList: myJSON.results,
              activeIndex: myJSON.results.length ? 0 : null,
              nextPage: myJSON.next,
              prevPage: myJSON.previous,
              loading: false
          });
      })
  }

  clickProfile(index) {
    this.setState({
      activeIndex: index,
    });
  }

  renderProfList() {
    const profileName = Object.keys(this.state.profileList).map((value, index) => {
      let status = '';
      if (index === this.state.activeIndex) {
        status = 'active';
      }
      return (
        <li className={[status, "list-group-item"].join(' ')}
          onClick={this.clickProfile.bind(this, index)}
          key={index}>
          {this.state.profileList[value].name}
        </li>
      )
    });
    return profileName;
  }


  increment = ()=>{
    if(this.state.nextPage!=null){
      this.setState({
          currentPage: this.state.currentPage+1,
          loading: true
      }, function(){
        this.getProfileData();
        this.setState.loading = false;
      })
    } else {
      return false;
    }
  }
  
  decrement() {
    if (this.state.prevPage!=null) {
      this.setState({
          currentPage: this.state.currentPage-1,
          loading: true
      }, function(){
        this.getProfileData();
        this.setState.loading = false;
      })
    } else{
      return false;
    }
  }

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Star War</h1>
          </header>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="listStyle01">
                  {this.state.loading.toString() === 'true' && (
                    <div className="loadingStyle01">loading...</div>
                  )} 
                  {this.state.loading.toString() !== 'true' && (
                    <ul className="list-group">
                      {this.renderProfList()}
                    </ul>
                  )} 
                </div>
                <nav aria-label="Page navigation" className="paginationStyle01">
                  <div className="actionBtn">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" aria-label="Previous" onClick={this.decrement.bind(this)} disabled={!this.state.prevPage || this.state.loading.toString() === 'true'} value="prev">
                          <span>Prev</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" aria-label="Next" onClick={this.increment.bind(this)} disabled={!this.state.nextPage || this.state.loading.toString() === 'true'} value="next">
                          <span>Next</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="pagnInfo">
                    You are in page no: <strong>{this.state.currentPage}</strong>
                  </div>
                </nav>
              </div>
              <div className="col-md-8">
                <div>
                     <div className="profileDetails"> 
                        {!this.state.profileList.length === 0 && (
                          <span>No data found</span>
                        )}
                        {this.state.loading.toString() === 'true' && (
                          <div className="loadingStyle01">loading...</div>
                        )} 

                        {this.state.profileList.length > 0 && this.state.loading.toString() !== 'true' && (
                          <div>
                             <div className="row">
                              <div className="profilePic"> 
                                <img src={require('./images/profile.png')} alt={this.state.profileList[this.state.activeIndex].name} width="256" height="256" />
                              </div>
                              <div className="profPrimaryInfo">
                                <h4> {this.state.profileList[this.state.activeIndex].name} </h4>
                                <h6> Gender: {this.state.profileList[this.state.activeIndex].gender} </h6>
                                <h6> Height: {this.state.profileList[this.state.activeIndex].height} cm </h6>
                                <h6> Weight: {this.state.profileList[this.state.activeIndex].mass} kg </h6>
                                <h6> Year of birth: {this.state.profileList[this.state.activeIndex].birth_year}  </h6>
                                <h6> Hair color: {this.state.profileList[this.state.activeIndex].hair_color}  </h6>
                                <h6> Skin color: {this.state.profileList[this.state.activeIndex].skin_color}  </h6>
                                <h6> Eye color: {this.state.profileList[this.state.activeIndex].eye_color}  </h6>
                              </div>
                              </div>
                               <div className="row rowSytlw01">
                                 <p>profile short description profile short description profile short description profile short description profile short description profile short description profile short description ...</p>
                               </div>
                            </div> 
                          )}
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
     }
}


export default App;
