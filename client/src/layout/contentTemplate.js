import React, { Component } from "react";
import "../App.css";
import { Col } from "antd";

// the min width of the web app is set to be 720px
const minWid = "720px";

export class SideBar extends Component {
  render() {
    return (
      <div className="SideBar" style={{ minWidth: minWid }}>
        <Col span={4}>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              marginRight: "10px",
              marginTop: "25px",
              borderRadius: "10px",
              minWidth: "210px",
              maxWidth: "300px",
              marginLeft: "auto"
            }}
          >
            {this.props.children}
          </div>
        </Col>
      </div>
    );
  }
}

export class SideContent extends Component {
  state = {};

  render() {
    return (
      <div className="SideContent" style={{ minWidth: minWid }}>
        <Col span={17}>
          <div
            style={{
              backgroundColor: "#ffffff",
              marginLeft: "5px",
              marginTop: "25px",
              padding: "15px",
              borderRadius: "10px",
              minWidth: "505px",
              maxWidth: "800px",
              marginBottom: "30px",
              marginRight: "auto"
            }}
          >
            {this.props.children}
          </div>
        </Col>
      </div>
    );
  }
}

export class SingleContent extends Component {
  state = {
    maxW: "1000px"
  };

  componentDidMount() {
    if (this.props.size) {
      if (this.props.size === "s") {
        this.setState({ maxW: "600px" });
      }
      if (this.props.size === "m") {
        this.setState({ maxW: "800px" });
      }
      if (this.props.size === "l") {
        this.setState({ maxW: "1000px" });
      }
    }
  }
  render() {
    return (
      <div className="SingleContent">
        <div
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            margin: "0 auto",
            padding: "15px",
            borderRadius: "10px",
            minWidth: minWid,
            maxWidth: this.state.maxW,
            marginBottom: "30px",
            marginTop: "25px"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class MessagePanel extends Component {
  render() {
    return (
      <div className="MessagePanel" style={{ minWidth: minWid }}>
        <Col span={3}>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              marginRight: "auto",
              marginTop: "25px",
              borderRadius: "10px",
              minWidth: "210px",
              maxWidth: "300px",
              marginLeft: "auto"
            }}
          >
            {this.props.children}
          </div>
        </Col>
      </div>
    );
  }
}
