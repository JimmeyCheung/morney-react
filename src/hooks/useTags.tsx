import { useEffect, useState } from "react";
import { createId } from "lib/createId";
import { useUpdate } from "./useUpdate";
type Tag = {
  id: number;
  name: string;
  icon: string;
};
const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string, icon: string }[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem("tags") || "[]");
    if (localTags.length === 0) {
      localTags = [
        { id: createId(), name: "服饰", icon: "dress" },
        { id: createId(), name: "餐饮", icon: "food" },
        { id: createId(), name: "居家", icon: "hotel" },
        { id: createId(), name: "交通", icon: "traffic" },
        { id: createId(), name: "旅游", icon: "travel" },
        { id: createId(), name: "红包", icon: "cash" },
        { id: createId(), name: "补贴", icon: "allowance" },
        { id: createId(), name: "零食", icon: "sock" },
        { id: createId(), name: "通讯", icon: "message" },
        { id: createId(), name: "社交", icon: "social-contact" },
        { id: createId(), name: "工资", icon: "salary" },
        { id: createId(), name: "奖金", icon: "bonus" },
        { id: createId(), name: "兼职", icon: "part-time" },
      ];
    }
    setTags(localTags);
  }, []); // 组件挂载时执行
  useUpdate(() => {
    window.localStorage.setItem("tags", JSON.stringify(tags));
  }, tags);
  const findTag = (id: number) => tags.filter((tag) => tag.id === id)[0];
  const findTagIndex = (id: number) => {
    let result = -1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateTag = (id: number, { name }: { name: string }, icon: string = "other") => {
    setTags(tags.map((tag) => (tag.id === id ? { id, name: name, icon } : tag)));
  };
  const deleteTag = (id: number): boolean => {
    setTags(tags.filter((tag) => tag.id !== id));
    return true;
  };
  const addTag = () => {
    const tagName = window.prompt("新标签的名称为");
    if (tagName !== null && tagName !== "") {
      setTags([...tags, { id: createId(), name: tagName, icon: "other" }]);
    }
  };
  const getName = (id: number) => {
    const tag = tags.filter((t) => t.id === id)[0];
    return tag ? tag.name : "";
  };
  return {
    tags,
    getName,
    addTag,
    setTags,
    findTag,
    updateTag,
    findTagIndex,
    deleteTag,
  };
};

export { useTags };
