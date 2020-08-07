import styled from "styled-components";
import React from "react";
import { useTags } from "hooks/useTags";
import Icon from "components/Icon";

const Wrapper = styled.section`
  flex-grow: 1;
  overflow: auto;
  min-height: 130px;
  background: rgb(245, 245, 245);
  > ol {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      padding: 6px 0;
    }
  }
  > button {
    background: none;
    border: none;
    padding: 2px 4px;
    border-bottom: 1px solid #333;
    color: #666;
    margin-top: 8px;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &.selected {
    background: var(--skin-color);
  }
  .icon {
    width: 24px;
    height: 24px;
  }
`;
type Props = {
  value: number[];
  onChange: (selected: number[]) => void;
};
const TagsSection: React.FC<Props> = (props) => {
  const { tags, addTag } = useTags();
  const selectedTagIds = props.value;
  const onToggleTag = (tagId: number) => {
    const index = selectedTagIds.indexOf(tagId);
    if (index >= 0) {
      // 如果 tag 已被选中，就复制所有没有被选中的 tag，作为新的 selectedTag
      props.onChange(selectedTagIds.filter((t) => t !== tagId));
    } else {
      props.onChange([...selectedTagIds, tagId]);
    }
  };
  const getClass = (tagId: number) =>
    selectedTagIds.indexOf(tagId) >= 0 ? "selected" : "";
  return (
    <Wrapper>
      <ol>
        {tags.map((tag) => (
          <li
            key={tag.id}
            onClick={() => {
              onToggleTag(tag.id);
            }}
          >
            <IconWrapper className={getClass(tag.id)}>
              <Icon className="icon" name={tag.icon} />
            </IconWrapper>
            <span>{tag.name}</span>
          </li>
        ))}

        <li
          onClick={() => {
            addTag();
          }}
        >
          <IconWrapper>
            <Icon className="icon" name="add" />
          </IconWrapper>
          <span>添加类别</span>
        </li>
      </ol>
    </Wrapper>
  );
};
export { TagsSection };
