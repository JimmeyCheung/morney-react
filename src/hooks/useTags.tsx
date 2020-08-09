import { useEffect, useState } from "react";
import { createId } from "lib/createId";
import { useUpdate } from "./useUpdate";
const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string, icon: string, category: Category }[]>([]);
  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem("tags") || "[]");
    if (localTags.length === 0) {
      localTags = [
        { id: createId(), name: "服饰", category: "-", icon: "dress" },
        { id: createId(), name: "餐饮", category: "-", icon: "food" },
        { id: createId(), name: "居家", category: "-", icon: "hotel" },
        { id: createId(), name: "交通", category: "-", icon: "traffic" },
        { id: createId(), name: "旅游", category: "-", icon: "travel" },
        { id: createId(), name: "红包", category: "+", icon: "cash" },
        { id: createId(), name: "补贴", category: "+", icon: "allowance" },
        { id: createId(), name: "零食", category: "-", icon: "sock" },
        { id: createId(), name: "通讯", category: "-", icon: "message" },
        { id: createId(), name: "社交", category: "-", icon: "social-contact" },
        { id: createId(), name: "工资", category: "+", icon: "salary" },
        { id: createId(), name: "奖金", category: "+", icon: "bonus" },
        { id: createId(), name: "兼职", category: "+", icon: "part-time" },
      ];
    }
    setTags(localTags);
  }, []); // 组件挂载时执行
  useUpdate(() => {
    console.log(tags);
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
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, name, category } : tag)));
  };
  const deleteTag = (id: number): boolean => {
    setTags(tags.filter((tag) => tag.id !== id));
    return true;
  };
  const addTag = (data: { name: string, category: Category }) => {
    console.log(2)
    setTags([...tags, { id: createId(), icon: "other", ...data }]);
  };
  const getName = (id: number) => {
    const tag = tags.filter((t) => t.id === id)[0];
    return tag ? tag.name : "";
  };
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
