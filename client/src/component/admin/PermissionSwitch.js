import React, { Component } from "react";
import { Switch, Icon } from 'antd';
import UserServer from '../../server/users';

class PermissionSwitch extends Component
{
    constructor(props) {
        super();

        this.state = {
            targetId: props.targetId,
            permissionId: props.id,
            checked: props.checked,
            loading: false,
        }
    }

    handleChange = (checked) => {
        this.setState({
            loading: true,
        });

        const request = checked 
            ? UserServer.enableUserPermission(this.state.targetId, this.state.permissionId)
            : UserServer.disableUserPermission(this.state.targetId, this.state.permissionId);
        
        request.then(enabled => {
            this.setState({
                checked: enabled,
                loading: false,
            })
        }, err => {
            this.setState({
                loading: false,
            });
        });
    };

    render() {
        return <Switch 
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="close"/>}
            checked={this.state.checked}
            loading={this.state.loading}
            onChange={this.handleChange}
        />
    }
}

export default PermissionSwitch;
