import React, { Component } from "react";
import { Table, Input, Icon } from "antd";
import UserServer from '../../server/users';
import UserTableService from './UserTableService';

let idleTime;
const INPUT_IDLE_TIMEOUT = 200;

class UserTable extends Component {
    constructor() {
        super();

        UserServer.getAllUsers().then(users => {
            this.setState({
                dataSource: UserTableService.formatUsers(users),
            });
        });

        this.state = {
            dataSource: [],
            searchIcon: <Icon type="search" />,
        };
    }

    search = (e) => {
        clearTimeout(idleTime);
        const input = e.target.value || '';

        this.setState({
            searchIcon: <Icon type="loading" />,
        });

        this.forceUpdate();

        idleTime = setTimeout(() => {
            UserServer.searchUser(input).then(users => {
                this.setState({
                    dataSource: UserTableService.formatUsers(users),
                    searchIcon: <Icon type="search" />,
                });
            });
        }, INPUT_IDLE_TIMEOUT);
    };

    render() {
        return <div>
            <Input 
                suffix={this.state.searchIcon} 
                style={{marginBottom: '16px', width: '300px'}}
                onChange={this.search}
                placeholder="Search an user"
            />
            <Table dataSource={this.state.dataSource} columns={UserTableService.columns}/>
        </div>;
    }
}

export default UserTable;
