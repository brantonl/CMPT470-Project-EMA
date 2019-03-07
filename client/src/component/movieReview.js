import React, { Component } from "react";
import { List, Avatar, Icon, Button, Rate } from 'antd';
import storage from "../utils/Storage";
import 'antd/dist/antd.css';

const IconText = ({ type, text }) => (
  <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
      </span>
);
class Review extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.reviews,
        };
    }

    componentWillReceiveProps(newProps) {
      this.setState({
          data: newProps.reviews,
      });
      this.forceUpdate();
    }

    handleDelete(review_id){
        this.props.onDelete(review_id);
    }

    render() {
        return (
          <div className="reviews-container">
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                pageSize: 4,
              }}
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <span><Rate disabled={true} value={item.rate}/> {item.rate} stars</span>
                  ]}
                  extra={<Button type="danger" style={ {display: item.btnShow}} onClick={this.handleDelete.bind(this, item.id)}>Delete</Button>}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <div>
                        <p><strong style={{textDecoration: "underline", fontWeight: "bold", fontSize: 16}}>{item.userName}</strong> {'  '}|{'  '}  
                          <strong >Title: {item.title}</strong>
                        </p>
                        <hr/>
                      </div>
                    }
                  />
                  {<p style={{fontSize: 14}}>{item.content}</p>}
                </List.Item>
              )}
            />
          </div>
        );
      }
}

export default Review;