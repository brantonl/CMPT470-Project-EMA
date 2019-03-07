import React, { Component } from "react";
import { Card, Tag, Icon } from 'antd';
import 'antd/dist/antd.css';

class TransactionMaxMin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maxTransaction: props.maxTransaction,
            minTransaction: props.minTransaction
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            maxTransaction: newProps.maxTransaction,
            minTransaction: newProps.minTransaction
        });

        this.forceUpdate();
    }

    render() {

        var maxResult = [];
        var minResult = [];

        if(this.state.maxTransaction !== null &&  this.state.minTransaction !== null) {

            for(var i = 0; i < this.state.maxTransaction.tags.length; i++) {
    
                maxResult.push(<Tag color={this.state.maxTransaction.tags[i].color}>
                {this.state.maxTransaction.tags[i].name}
                </Tag>);
            }

            for(var i = 0; i < this.state.minTransaction.tags.length; i++) {
    
                minResult.push(<Tag color={this.state.minTransaction.tags[i].color}>
                {this.state.minTransaction.tags[i].name}
                </Tag>);
            }
        }

        return (
            <div>
                <div style={{width: "40%", display: "inline-block", margin: "22pt"}}>
                <Card>
                    <h2> Max Transaction</h2> <br/>
                    <div style={{textAlign: 'left', fontSize: '18pt', margin: '0 10%'}}>
                        <p> <Icon type="dollar" style={{margin: '0 10pt'}}/> {this.state.maxTransaction.amount} </p>
                        <p> <Icon type="calendar" style={{margin: '0 10pt'}}/> {this.state.maxTransaction.timestamp} </p>
                        <p> <Icon type="tags" style={{margin: '0 10pt'}}/> {maxResult} </p>
                    </div>
                </Card>
                </div>
                <div style={{width: "40%", display: "inline-block", margin: "22pt"}}>
                <Card>
                    <h2> Min Transaction</h2> <br/>
                    <div style={{textAlign: 'left', fontSize: '18pt', margin: '0 10%'}}>
                        <p> <Icon type="dollar" style={{margin: '0 10pt'}}/> {this.state.minTransaction.amount} </p>
                        <p> <Icon type="calendar" style={{margin: '0 10pt'}}/> {this.state.maxTransaction.timestamp} </p>
                        <p> <Icon type="tags" style={{margin: '0 10pt'}}/> {minResult} </p>
                    </div>
                </Card>
                </div>
            </div>
        );
    }
}

export default TransactionMaxMin;
