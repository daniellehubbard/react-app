import React from 'react';
import './App.css';
import classNames from 'classnames';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasGiftcard: false,
      giftCard: '',
      controlCode: '',
      valid: true,
      savedCard: ''
    }
    this.handleGiftcardChange = this.handleGiftcardChange.bind(this);
    this.handleControlCodeChange = this.handleControlCodeChange.bind(this);
  }

  checkGiftcard() {
    this.setState({hasGiftcard: !this.state.hasGiftcard});
  }

  handleGiftcardChange(event) {
    this.setState({
      giftCard: event.target.value.replace(/\D/g, '')
    });    
  }

  handleControlCodeChange(event) {
    this.setState({
      controlCode: event.target.value.replace(/\D/g, '')
    });
  }

  applyGiftcard() {
    if (!this.state.giftCard || !this.state.controlCode || this.state.giftCard.length < 4) {
      this.setState({
        valid: false
      });
      return;
    }
    axios.post('http://localhost:3001/giftcard/validate')
      .then(result => {
        if (result.data) {
          const saved = this.state.giftCard.slice(this.state.giftCard.length-3);
          const savedCard = '*'.repeat(this.state.giftCard.length-3) + saved;
          this.setState({
            valid: result.data.valid,
            amount: result.data.amount,
            savedCard: savedCard,
            giftCard: '',
            controlCode: ''
          })
        }
      });
  }

  render() {
    var formClass = classNames({
      'hide-form': !this.state.hasGiftcard
    });
    var savedCardClass = classNames({
      'show-saved': !this.state.savedCard,
      'saved-card': true
    });
    var inputsClass = classNames({
      'gc-inputs': true,
      'error': !this.state.valid
    });
    return (
      <div className="App">
        <h2>Gift cards</h2>
        <div className="gift-card-form">
          <label>Do you have a gift card?</label>
          <input type="checkbox" className="gift-card-check" onClick={() => this.checkGiftcard()}></input>
        </div>              
        <div className={formClass}>
          <p>
            Please enter the 19-digit number and code from your gift card below.
          </p>  
          <div className={savedCardClass}>
            <label>Gift Card</label>
            <div className="gc-inputs">
              <span>{this.state.savedCard}</span>
              <span className="amount">-€{this.state.amount}</span>
            </div>
          </div>
          <div className={inputsClass}>
            <input type="text" value={this.state.giftCard} placeholder="Gift Card Number" onChange={this.handleGiftcardChange}></input>
            <input type="text" value={this.state.controlCode} placeholder="Control Code" onChange={this.handleControlCodeChange}></input>
            <button onClick={() => this.applyGiftcard()}>Apply</button>
          </div>          
        </div>
      </div>
    );
  }
}

export default App;
