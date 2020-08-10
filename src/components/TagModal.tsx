import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import React from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { message } from "antd";

type Props = {
  visible: boolean;
  hide: () => void;
  addTag: (tag: { name: string; category: Category }) => void;
};
function getNewTag() {
  return {
    name: "",
    category: "-" as Category,
  };
}
const TagModal = (props: Props) => {
  const [newTag, setNewTag] = useState(getNewTag());
  const saveTag = () => {
    if (!newTag.name.trim()) {
      return message.warning("标签名不能为空");
    }
    props.addTag(newTag);
    message.success("添加成功");
    props.hide();
  };
  const hide = () => {
    props.hide();
  };
  return (
    <Modal
      title="新增标签"
      visible={props.visible}
      okText="保存"
      cancelText="取消"
      onOk={saveTag}
      onCancel={() => {
        hide();
      }}
    >
      <div>
        <Input
          label="标签名"
          type="text"
          placeholder="标签名"
          value={newTag.name}
          onChange={(e) => {
            setNewTag({ ...newTag, name: e.target.value });
          }}
        />
        <Label>
          <span>标签类别</span>
          <select
            defaultValue={newTag.category}
            onChange={(e) => {
              setNewTag({
                ...newTag,
                category: e.target.value as Category,
              });
            }}
          >
            <option value="+">收入</option>
            <option value="-">支出</option>
          </select>
        </Label>
      </div>
    </Modal>
  );
};

export { TagModal };
