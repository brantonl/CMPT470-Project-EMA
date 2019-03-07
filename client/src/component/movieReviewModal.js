import React, { Component } from "react";
import { Input, Modal, Rate } from "antd";
import MovieReview from "./movieReview";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            target:[],
            overall_rate: 0
        };
    }

    componentWillReceiveProps(newProps) {
        let newList = [];
        let tmp_overall = 0;
        for(let i =0; i < newProps.reviews.length; i++){
            tmp_overall += newProps.reviews[i].rate;
            if(newProps.reviews[i].userId === newProps.userID || this.props.permission){
                newList.push({
                    id: newProps.reviews[i].id,
                    title: newProps.reviews[i].reviewTitle,
                    content: newProps.reviews[i].reviewContent,
                    userName: newProps.reviews[i].username,
                    rate: newProps.reviews[i].rate,
                    avatar: newProps.reviews[i].avatarUrl,
                    btnShow: 'block'
                });
            }
            else{
                newList.push({
                    id: newProps.reviews[i].id,
                    title: newProps.reviews[i].reviewTitle,
                    content: newProps.reviews[i].reviewContent,
                    userName: newProps.reviews[i].username,
                    rate: newProps.reviews[i].rate,
                    avatar: newProps.reviews[i].avatarUrl,
                    btnShow: 'none'
                });
            }
        }
        if(newProps.reviews.length > 0){
            tmp_overall = parseFloat(Number(tmp_overall / newProps.reviews.length).toFixed(1));
        }
        this.setState({
            visible: newProps.visible,
            target: newList,
            overall_rate: tmp_overall
        });
        this.forceUpdate();
    }

    render(){
        return(
            <div>
                <Modal
                    title="Movie Reviews"
                    visible = {this.state.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                <hr/>
                <span>Overall rating for this movie is:  <Rate disabled={true} allowHalf={true} value={this.state.overall_rate}/></span>
                <hr/>
                    <MovieReview 
                        reviews={this.state.target}
                        onDelete={this.props.onDelete}
                    />
                    <label><strong>Add Review</strong></label><br/><br/>

                    <label>Title</label>
                    <Input
                        value={this.props.title}  
                        onChange={this.props.onTitleChange}                  
                    /><br/><br/>
                
                    <label>Review</label>
                    <TextArea rows={6}
                        value={this.props.content}
                        onChange={this.props.onContentChange}  
                    /><br/><br/>
                    <span><Rate allowClear={false} onChange={this.props.onRateChange} value={this.props.rateVal}/> {this.props.rateVal} stars</span>
                </Modal>
            </div>
        );
    }
}

export default ReviewModal;