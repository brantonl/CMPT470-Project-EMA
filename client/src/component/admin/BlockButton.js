import React, { Component } from "react";
import { Button, message, Tooltip } from 'antd';
import UserServer from '../../server/users';

/** Right now is disabled */
const DISABLED_STATE = 'plus-circle';
const DISABLED_DESC = 'Enable the user from login';
/** Right now is enabled */
const ENABLED_STATE = 'stop';
const ENABLED_DESC = 'Disable the user from login';

class BlockButton extends Component
{
    constructor(props) {
        super();
        this.state = {
            disabled: props.disabled,
            loading: false,
            icon: props.user.deletedAt ? DISABLED_STATE : ENABLED_STATE,
            user: props.user,
            desc: props.user.deletedAt ? DISABLED_DESC : ENABLED_DESC,
        };
    }

    handleClick = () => {
        this.setState({
            loading: true,
        });

        if (this.state.icon === DISABLED_STATE) {
            this.enable();
        } else if (this.state.icon === ENABLED_STATE) {
            this.disable();
        }
    };

    disable = () => {
        UserServer.disableUser(this.state.user.id).then(res => {
            this.setState({
                loading: false,
                user: res,
                icon: res.deletedAt ? DISABLED_STATE : ENABLED_STATE,
                desc: res.deletedAt ? DISABLED_DESC : ENABLED_DESC,
            });
        }, err => {
            if (err.response && err.response.data && err.response.data.message) {
                message.error(err.response.data.message);
            }
            this.setState({
                loading: false,
            });
        }).then(() => {
            this.forceUpdate();
        });
    };

    enable = () => {
        UserServer.enableUser(this.state.user.id).then(res => {
            this.setState({
                loading: false,
                user: res,
                icon: res.deletedAt ? DISABLED_STATE : ENABLED_STATE,
                desc: res.deletedAt ? DISABLED_DESC : ENABLED_DESC,
            });

            this.forceUpdate();
        });
    };

    render() {
        return (<span style={{margin: '0 10px'}}>
            <Tooltip title={this.state.desc}>
                <Button 
                    shape="circle" 
                    icon={this.state.icon} 
                    loading={this.state.loading} 
                    onClick={this.handleClick}
                    disabled={this.state.disabled}
                />
            </Tooltip>
        </span>)
    }
}

export default BlockButton;
