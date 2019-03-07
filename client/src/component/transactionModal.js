import React, { Component } from "react";
import moment from "moment";
import { Modal, DatePicker, Input, Icon, Form} from 'antd';
import 'antd/dist/antd.css';

class TransactionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            transactionTimestamp: this.props.transactionTimestamp,
            transactionAmount: this.props.transactionAmount,
            transactionDescription: this.props.transactionDescription,
            error: this.props.error,
            modalTitle: this.props.modalTitle,
            transactionTag: this.props.transactionTag
        }


    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visible: newProps.visible,
            transactionTimestamp: newProps.transactionTimestamp,
            transactionAmount: newProps.transactionAmount,
            transactionDescription: newProps.transactionDescription,
            transactionTag: newProps.transactionTag,
            transactionTagString: newProps.transactionTagString,
            modalTitle: newProps.modalTitle,
            error: newProps.error
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div>

              <Modal
                title={this.state.modalTitle}
                visible={this.state.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}>
 
                <DatePicker 
                    value={moment(this.state.transactionTimestamp)}
                    defaultValue={moment(this.state.transactionTimestamp)}
                    onChange={this.props.onDateChange}
                /> <br/><br/>

                <Input
                    prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    value={this.state.transactionAmount}
                    onChange={this.props.onAmountChange}
                /> <br/><br/>

                <Input
                    prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    value={this.state.transactionDescription}
                    onChange={this.props.onDescriptionChange}
                /> <br/><br/>

                <Input 
                    prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="please enter tags here"
                    value={this.state.transactionTagString}
                    onChange={this.props.onTagChange}
                /> <br/> <br/>

                <div id="error" style={{color: 'red'}}> {this.state.error} </div>

              </Modal>

            </div>
          );
    }
    

}

export default TransactionModal;
