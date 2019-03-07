import React, { Component } from "react";
import Activity from '../component/activity';

const userLogUrl = '/api/v1/logs';
const userType = 'admin';

class AllUserActivity extends Component {

    render() {
        return (
            <div>
                <Activity url={userLogUrl} userType={userType}> </Activity>
            </div>
        );
    }
}

export default AllUserActivity;