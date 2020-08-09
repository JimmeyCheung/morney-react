import Layout from "../components/Layout";
import React, { useState } from "react";
import { useTags } from "hooks/useTags";
import styled from "styled-components";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import Modal from 'antd/lib/modal/Modal';
import { Input } from 'components/Input';
import { Label } from 'components/Label';
const TagList = styled.ol`
    height:100%;
    flex-grow:1;
    overflow:auto;
    font-size: 16px;
    background: white;
    margin-bottom: 0;
  > li {
    //#e5e5e7
    border-bottom: 1px solid #d5d5d9;
    line-height: 20px;
    margin-left: 16px;
    > a {
      padding: 12px 16px 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
const Footer = styled.footer`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-shrink:0;
    height:60px;
`;
type NewTag = {
    name: string,
    category: Category
};
function getNewTag() {
    return {
        name: "",
        category: "-" as Category
    };
}
const Tags = () => {
    const { tags, addTag } = useTags();
    const [modalState, setModalState] = useState(false);
    const [newTag, setNewTag] = useState(getNewTag());
    const saveTag = () => {
        if (!newTag.name.trim()) {
            return alert("标签名不能为空");
        }
        addTag(newTag);
        hideModal();
    };
    const showModal = () => {
        setNewTag(getNewTag());
        setModalState(true);
    };
    const hideModal = () => {
        setModalState(false);
    };
    return (
        <Layout>
            <TagList>
                {tags.map((tag) => (
                    <li key={tag.id}>
                        <Link to={"/tags/" + JSON.stringify(tag)}>
                            <span className="oneLine">{tag.name}</span>
                            <Icon name="right" />
                        </Link>
                    </li>
                ))}
            </TagList>
            <Footer>
                <Button onClick={() => { showModal() }}>新增标签</Button>
            </Footer>
            <Modal
                title="新增标签"
                visible={modalState}
                okText="保存"
                cancelText="取消"
                onOk={saveTag}
                onCancel={() => { hideModal() }}
            >
                <div>
                    <Input
                        label="标签名"
                        type="text"
                        placeholder="标签名"
                        value={newTag.name}
                        onChange={(e) => { setNewTag({ ...newTag, name: e.target.value }) }}
                    />
                    <Label>
                        <span>标签类别</span>
                        <select defaultValue={newTag.category}
                            onChange={
                                (e) => {
                                    console.log(e.target.value)
                                    setNewTag(
                                        {
                                            ...newTag,
                                            category: e.target.value as Category
                                        })
                                }
                            }>
                            <option value="+">收入</option>
                            <option value="-">支出</option>
                        </select>
                    </Label>
                </div>
            </Modal>
        </Layout >
    );
};
export default Tags;
