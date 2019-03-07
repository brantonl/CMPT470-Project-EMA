import React, { Component } from "react";
import { Input , Modal } from "antd";

class MovieTransaction extends Component{
    constructor(props){
        super(props);
        this.state=({
            visible: false
        });
    }

    componentWillReceiveProps(newProps){
        this.setState({
            visible: newProps.visible
        });
    }

    render(){
        return(
            <div>
                <Modal
                    title="Add new Transaction for ticket purchase"
                    visible = {this.state.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >  
                    <label>Please enter the ticket price for {this.props.movieTitle}</label>
                    <Input
                        value={this.props.value}
                        onChange={this.props.onTransValChange}
                    />
                </Modal>
            </div>
        );
    }
}

export default MovieTransaction;