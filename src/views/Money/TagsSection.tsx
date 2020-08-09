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
  data: {
    tagIds: number[],
    category: Category
  };
  onChange: (selected: number[]) => void;
  showModal: () => void;
};
const TagsSection: React.FC<Props> = (props) => {
  const { tags } = useTags();
  const selectedTagIds = props.data.tagIds;
  const onToggleTag = (tagId: number) => {
    const index = selectedTagIds.indexOf(tagId);
    if (index >= 0) {
      props.onChange([]);
    } else {
      props.onChange([tagId]);
    }
  };
  const getClass = (tagId: number) =>
    selectedTagIds.indexOf(tagId) >= 0 ? "selected" : "";
  return (
    <Wrapper>
      <ol>
        {tags.filter(tag => { return tag.category === props.data.category }).map((tag) => (
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
            props.showModal()
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
