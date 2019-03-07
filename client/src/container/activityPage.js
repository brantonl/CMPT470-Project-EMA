import React, { Component } from "react";
import Activity from '../component/activity';

const userLogUrl = '/api/v1/logs';

class ActivityPage extends Component {

    render() {

        return (
            <div>
                <Activity url={userLogUrl} userType={''}> </Activity>
            </div>
        );
    }
}

export default ActivityPage;
