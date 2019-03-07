import React, { Component } from "react";
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';
  
class TransactionPieChart extends Component {
  
    constructor(props) {
        super(props);
  
        this.state = {
            pieChartData: props.pieChartData
        }
    }
  
    componentWillReceiveProps(newProps) {
        
        this.setState({
            pieChartData: newProps.pieChartData
        });
  
        this.forceUpdate();
    }
  
    render() {

        return (
            <div style={{width: '70%', margin: '0 auto'}}>
                <Pie
                    hasLegend
                    total={() => (
                        <span> Your Pie !</span> 
                    )}
                    valueFormat={val => <span> </span>}
                    title="Your Spending Distribution"
                    subTitle="Your Spending Distribution"
                    data={this.state.pieChartData}
                    height={500}
                />
                <p style={{color: 'gray'}}> Hover your mouse to see detail </p>
            </div>
        );
    }
  
}

export default TransactionPieChart;
