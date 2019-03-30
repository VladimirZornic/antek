import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import axios from 'axios';

// style
import './css/style.css'
// components
import Loading from './components/Loading'
import Header from './components/Header'
import PhoneBook from './components/PhoneBook'
import Add from './components/Add'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      hasData: false,
      hasError: true
    }
    this.forceUpdate = this.forceUpdate.bind(this);
  }
  componentDidMount() {
    this.init();
  }
  init(){
    axios.get('http://localhost:3000/get')
      .then(data => 
        {
          this.setState({ data: data, hasData: true, hasError: false })
      }, 
        error => {
          
        }
      )
  }
  componentWillUnmount(){
    this.setState ({
      data: null,
      hasData: false,
      hasError: true
    })
  }
  forceUpdate(){
   this.init();
  }
  render() {
    const { hasData, data, hasError } = this.state;
    return (
      <Router>
        <div>
          <Header />
        <div className="container">
          {
            hasData ?

              <div>
                <Route exact path="/" component={() => <PhoneBook data={data} />} />

                <Route path="/add" component={() => <Add update={this.forceUpdate} />} />
                
              </div>
              :
              hasError ? 
                <p className="error-messsage">Something went wrong, please try later.</p>
              :
                <Loading />
          }
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
