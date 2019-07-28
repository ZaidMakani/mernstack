import React, { Component } from 'react';
import logo from './logo.svg';
import innovation4 from './Innovation4.jpg';
import './App.css';
import Customers from './components/customers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={innovation4} alt="innovation4" />
          <h1 className="App-title">MERN stack App</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;