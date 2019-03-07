import React, { Component } from "react";
import { } from 'antd';
import 'antd/dist/antd.css';
import { Chart, Tooltip, Geom, Guide } from 'bizcharts';

const { Text } = Guide;

const scale = {
    value: {
      min: 0,
      max: 100,
    },
};

class TransactionLineChart extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            waterwaveData: this.props.waterwaveData,
            waterwaveColor: this.props.waterwaveColor
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps.waterwaveData);
        this.setState({
            waterwaveData: newProps.waterwaveData,
            waterwaveColor: newProps.waterwaveColor
        });

        this.forceUpdate();
    }

    render() {
        const tooltipContent = '';

        return (
            <div>
                <Chart height={400} data={this.state.waterwaveData} scale={scale}>
                    <Tooltip 
                        itemTpl = {tooltipContent}
                    />
                    <Geom
                    type="interval"
                    position="gender*value"
                    color={this.state.waterwaveColor}
                    shape="liquid-fill-gauge"
                    style={{
                        lineWidth: 10,
                        opacity: 0.75,
                    }}
                    />
                    <Guide>
                        {
                        this.state.waterwaveData.map(
                        row => (<Text
                            content={`${row.value}%`}
                            top
                            position={{
                            gender: row.gender,
                            value: 50,
                            }}
                            style={{
                            opacity: 0.75,
                            fontSize: window.innerWidth / 15,
                            textAlign: 'center',
                            }}
                        />))
                    }
                    </Guide>
                </Chart>
            </div>
        );
    }

}

export default TransactionLineChart;
