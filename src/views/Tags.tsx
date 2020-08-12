import Layout from "../components/Layout";
import React, { useState, useRef } from "react";
import { useTags } from "hooks/useTags";
import styled from "styled-components";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import { Button } from "components/Button";
import { TagModal } from "components/TagModal";
const TagList = styled.ol`
  height: 100%;
  flex-grow: 1;
  overflow: auto;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 60px;
`;
const IconWrap = styled.div`
  display:flex;
  .icon{
    width:20px;
    height:20px;
    margin-right:5px;
    color:var(--skin-color);
  }
`;
const Tags = () => {
  const { tags, addTag } = useTags();
  const [modalState, setModalState] = useState(false);
  const refTagList = useRef<HTMLOListElement>(null);
  return (
    <Layout>
      <TagList ref={refTagList}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link to={"/tags/" + tag.id}>
              <IconWrap>
                <Icon className="icon" name={tag.icon} />
                <span className="oneLine">{tag.name}</span>
              </IconWrap>
              <Icon name="right" />
            </Link>
          </li>
        ))}
      </TagList>
      <Footer>
        <Button
          onClick={() => {
            setModalState(true);
          }}
        >
          新增标签
        </Button>
      </Footer>
      <TagModal
        visible={modalState}
        addTag={addTag}
        hide={() => {
          setModalState(false);
        }}
      />
    </Layout>
  );
};
export default Tags;
