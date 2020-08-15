import styled from "styled-components";
import React, { useState } from "react";
import Icon from 'components/Icon';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.section`
  position:relative;
  display: flex;
  height:60px;
  justify-content: center;
  font-size: 18px;
  background-color: var(--skin-color);
  >.back{
    position:absolute;
    left:10px;
    top:0;
    display:flex;
    align-items:center;
    height:100%;
    .icon{
      width:24px;
      height:24px;
      cursor:pointer;
    }
  }
  > ul {
    display: flex;
    margin: 10px 0;
    width: 70%;
    overflow: hidden;
    background: var(--skin-color);
    > li {
      display:flex;
      justify-content:center;
      align-items:center;
      width: 50%;
      border: 1px solid #000;
      border-radius: 6px;
      color: #000;
      text-align: center;
      cursor:pointer;
      &.selected {
        background: #000;
        color: var(--skin-color);
      }
      :nth-child(1){
        border-top-right-radius:0;
        border-bottom-right-radius:0;
      }
      :nth-child(2){
        border-top-left-radius:0;
        border-bottom-left-radius:0;
      }
    }
  }
`;
type Props = {
  isUpdate: boolean;
  value: "-" | "+";
  onChange: (value: "-" | "+") => void;
};

const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = { "-": "支出", "+": "收入" };
  const [categoryList] = useState<("+" | "-")[]>(["-", "+"]);
  const history = useHistory();
  const category = props.value;
  return (
    <Wrapper>
      {props.isUpdate ?
        (<div className="back">
          <Icon onClick={() => { history.goBack() }} name="left" />
        </div>) : ""}
      <ul>
        {categoryList.map((c) => (
          <li
            key={c}
            className={category === c ? "selected" : ""}
            onClick={() => {
              props.onChange(c);
            }}
          >
            {categoryMap[c]}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
export { CategorySection };
