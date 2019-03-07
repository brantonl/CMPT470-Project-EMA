import React, { Component } from "react";
import LineChart from '../../component/admin/LineChart';
import StatServer from '../../server/stats';

class AppAnalysis extends Component {
    constructor() {
        super();
        this.state = {
            newUserStats: [],
            activityStats: [],
            newUserTotal: 0,
            activityTotal: 0,
        };
        StatServer.getStats().then(data => {
            this.setState({
                newUserStats: data.newUserStats,
                activityStats: data.activityStats,
                newUserTotal: data.newUserTotal,
                activityTotal: data.activityTotal,
            });
            this.forceUpdate();
        });
    }

    render() {
        return (<div style={{padding: '30px'}}>
            <h1>App Analysis</h1>
            <LineChart data={this.state.newUserStats} title="New users" total={this.state.newUserTotal}/>
            <LineChart data={this.state.activityStats} title="User activity" total={this.state.activityTotal}/>
        </div>);
    }
}

export default AppAnalysis;
