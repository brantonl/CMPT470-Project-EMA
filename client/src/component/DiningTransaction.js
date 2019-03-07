import React, { Component } from "react";
import { Input, Modal } from "antd";

class DiningTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      visible: false
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      visible: newProps.visible
    });
  }

  render() {
    return (
      <div>
        <Modal
          title='Add new Transaction for dining'
          visible={this.state.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
          <label>Please enter the amount spent at {this.props.restaurantTitle}</label>
          <Input
            value={this.props.value}
            onChange={this.props.onTransValChange}
          />
        </Modal>
      </div>
    );
  }
}

export default DiningTransaction;