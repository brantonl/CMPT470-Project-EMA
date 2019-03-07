import React, { Component } from "react";
import { } from 'antd';
import 'antd/dist/antd.css';
import { MiniArea } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';

class TransactionLineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineChartData: props.lineChartData
        }
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            lineChartData: newProps.lineChartData
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div style={{width: '70%', margin: '0 auto'}}>
                <MiniArea
                    line
                    color="#cceafe"
                    height={300}
                    data={this.state.lineChartData}
                />
            </div>
        );
    };


}

export default TransactionLineChart;
