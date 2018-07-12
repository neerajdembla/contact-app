import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddContact from './components/AddContact/AddContact';
import ContactList from './containers/ContactList/ContactList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList />
      </div>
    );
  }
}

export default App;
