import React, { Component } from "react";
import { MiniArea, ChartCard } from 'ant-design-pro/lib/Charts';

class LineChart extends Component
{
    constructor(props) {
        super();
        this.state = {
            graph: props.data,
            title: props.title,
            total: props.total,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            graph: newProps.data,
            title: newProps.title,
            total: newProps.total,
        });
        this.forceUpdate();
    }

    render() {
        return <ChartCard
                title={this.state.title}
                total={this.state.total}
                style={{margin: '30px', padding: '30px'}}
            >
            <MiniArea
                line
                color="#cceafe"
                height={130}
                data={this.state.graph}
            />
        </ChartCard>
    }
}

export default LineChart;
