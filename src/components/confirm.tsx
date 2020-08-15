
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';

const { confirm } = Modal;
type Options = {
    title: string,
    content: string,
    okFn: () => void,
    cancelFn?: () => void
}

function showConfirm({ title, content, okFn, cancelFn = () => { } }: Options) {
    confirm({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        onOk() {
            okFn();
        },
        onCancel() {
            cancelFn();
        },
    });
}
export { showConfirm }