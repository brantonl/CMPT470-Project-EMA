import React, { Component } from "react";
import TransactionStatement from '../component/transactionStatement';
import 'antd/dist/antd.css';

class Title extends Component {
  render()  {
    const title = "Expense Management";

    return (<h1 style={{color: '#203954'}}>{title}</h1>);
  }
}

class Expense extends Component {

  render() {
    
    return (
      <div> 
        <div> <Title /> </div>
        <div> <TransactionStatement /> </div>
      </div>
    );
  }

}

export default Expense;
