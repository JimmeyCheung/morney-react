import { useEffect, useState } from "react";
import { createId } from "lib/createId";
import { useUpdate } from "./useUpdate";
import moment from 'moment';
const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string, icon: string, category: Category }[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem("tags") || "[]");
    let createdDate = getDate();
    if (localTags.length === 0) {
      localTags = [
        { id: createId(), name: "服饰", createdDate, category: "-", icon: "dress" },
        { id: createId(), name: "餐饮", createdDate, category: "-", icon: "food" },
        { id: createId(), name: "居家", createdDate, category: "-", icon: "hotel" },
        { id: createId(), name: "交通", createdDate, category: "-", icon: "traffic" },
        { id: createId(), name: "旅游", createdDate, category: "-", icon: "travel" },
        { id: createId(), name: "红包", createdDate, category: "+", icon: "cash" },
        { id: createId(), name: "补贴", createdDate, category: "+", icon: "allowance" },
        { id: createId(), name: "零食", createdDate, category: "-", icon: "sock" },
        { id: createId(), name: "通讯", createdDate, category: "-", icon: "message" },
        { id: createId(), name: "社交", createdDate, category: "-", icon: "social-contact" },
        { id: createId(), name: "工资", createdDate, category: "+", icon: "salary" },
        { id: createId(), name: "奖金", createdDate, category: "+", icon: "bonus" },
        { id: createId(), name: "兼职", createdDate, category: "+", icon: "part-time" },
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
  const getTags = (category: Category) => {
    tags.filter(tag => tag.category === category);
  };
  const updateTag = ({ id, name, category }: { id: number, name: string, category: Category }) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, name: name, category } : tag)));
  };
  const deleteTag = (id: number): boolean => {
    setTags(tags.filter((tag) => tag.id !== id));
    return true;
  };
  const addTag = (data: { name: string, category: Category }) => {
    const { name, category } = data;
    if (name !== null && name !== "") {
      setTags([...tags, { id: createId(), name, icon: "other", category }]);
    }
  };
  const getName = (id: number) => {
    const tag = tags.filter((t) => t.id === id)[0];
    return tag ? tag.name : "";
  };
  const getDate = function () {
    return moment(new Date()).format("YYYY-MM-DD");
  }
  return {
    tags,
    getTags,
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
