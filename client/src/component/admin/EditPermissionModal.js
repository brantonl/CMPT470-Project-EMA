import React, { Component } from "react";
import { Button, Icon, Modal, List, Tooltip } from 'antd';
import PermissionSwitch from './PermissionSwitch';
import storage from '../../utils/Storage';
import PermissionServer from '../../server/permissions';

const PERMISSION_DESCRIPTIONS = {
    'read-user': 'The permission to view other users',
    'block-user': 'The permission to disable/enable an user',
    'mod-user': 'The permission to update user permissions',
    'delete-comment': 'The permission to delete comment',
};

class EditPermissionModal extends Component
{
    constructor(props) {
        super();

        this.state = {
            disabled: props.disabled,
            visible: false,
            permissions: storage.getPermissionList(),
            user: props.user.user,
            userPermissions: [],
        };
    }

    requestPermissionFromServer = () => {
        PermissionServer.getUserPermissionIds(this.state.user.id).then(permissions => {
            this.setState({
                userPermissions: permissions,
            })
        }).then(() => this.forceUpdate());
    };

    componentDidMount() {
        this.requestPermissionFromServer();
    }

    showModal = () => {
        this.setState({visible: true});
    };

    closeModal = () => {
        this.setState({visible: false});
    };

    buildModalContent = () => {
        const permissions = this.state.permissions;

        return <div>
            <List
                dataSource={permissions}
                renderItem={permission => {
                    const name = permission.name.charAt(0).toUpperCase() + permission.name.replace('-', ' ').slice(1);

                    const checked = this.state.userPermissions.includes(permission.id);

                    const action = <PermissionSwitch targetId={this.state.user.id} checked={checked} id={permission.id}></PermissionSwitch>;

                    return <List.Item
                        actions={[action]}
                    >
                        <List.Item.Meta
                            description={PERMISSION_DESCRIPTIONS[permission.name]}
                            title={name}
                        />
                    </List.Item>
                }}
            />
        </div>
    };

    render() {
        return <span style={{margin: '0 10px'}}>
            <Tooltip title="Modify user permissions">
                <Button shape="circle" onClick={this.showModal} disabled={this.state.disabled}>
                    <Icon type="form"/>
                </Button>
            </Tooltip>
            <Modal
                title="Update Permissions"
                visible={this.state.visible}
                footer={null}
                onCancel={this.closeModal}
            >
                {this.buildModalContent()}
            </Modal>
        </span>;
    }
}

export default EditPermissionModal;
