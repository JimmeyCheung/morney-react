import styled from "styled-components";
import React, { useState } from "react";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  font-size: 18px;
  background-color: var(--skin-color);
  > ul {
    display: flex;
    margin: 10px 0;
    border: 1px solid #000;
    width: 80%;
    border-radius: 6px;
    overflow: hidden;
    > li {
      padding: 8px 0;
      width: 50%;
      background: var(--skin-color);
      color: #000;
      text-align: center;
      cursor:pointer;
      &.selected {
        background: #000;
        color: var(--skin-color);
      }
    }
  }
`;
type Props = {
  value: "-" | "+";
  onChange: (value: "-" | "+") => void;
};

const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = { "-": "支出", "+": "收入" };
  const [categoryList] = useState<("+" | "-")[]>(["-", "+"]);
  const category = props.value;
  return (
    <Wrapper>
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
