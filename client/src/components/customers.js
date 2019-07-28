import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    /*fetch('/api/customers')
      .then(res => res.json())
      .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));*/

      fetch('/api/items')
      .then(res => res.json())
      .then(items => this.setState({customers:items}, () => console.log('Customers fetched...', items)));
  }

  render() {
    return (
      <div>
        <h2>Team Members</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
