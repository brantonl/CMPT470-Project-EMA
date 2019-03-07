import React, { Component } from "react";
import { } from 'antd';
import 'antd/dist/antd.css';
import { TagCloud } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';

class TransactionTagCloud extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tagCloudData: props.tagCloudData
        }
    }

    componentWillReceiveProps(newProps) {

        var beforeProcessData = [];

        for(var i = 0; i < newProps.tagCloudData.length; i++) {
            beforeProcessData.push({
                name: `##${newProps.tagCloudData[i].name}##`,
                value: newProps.tagCloudData[i].value + i*0.000000001
            });
        }

        console.log(beforeProcessData)

        this.setState({
            tagCloudData: beforeProcessData
        });

        this.forceUpdate();
    }

    render() {

        const tags = [];
            for (let i = 0; i < 3; i += 1) {
            tags.push({
                name: `TagClout-Title-${i}`,
                value: Math.floor((Math.random() * 50)) + 20,
            });
        }

        return (
            <div>
                <TagCloud
                    data={this.state.tagCloudData}
                    height={500}
                />
            </div>
        );
    }
}

export default TransactionTagCloud;
