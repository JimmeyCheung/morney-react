import React from "react";
import styled from "styled-components";
import { DateTypeEnum } from "Enums/DateTypeEnum";
const Wrapper = styled.section`
  & > .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    padding-top: 5px;
    background-color: var(--bg-color);
    overflow: hidden;
    & > .tab {
      position: relative;
      display: flex;
      width: 33.333%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--border-color);
      cursor:pointer;

      &.selected {
        background: #fff;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        border-bottom: none;
      }
    }
  }
`;

type Props = {
  tabs: { text: string; value: DateTypeEnum }[];
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};
const TabsSection = (props: Props) => {
  const { tabIndex, setTabIndex, tabs } = props;
  const getClass = (index: number) => {
    return `tab ${index === tabIndex ? "selected" : ""}`;
  };
  return (
    <Wrapper>
      <div className="tabs">
        {tabs.map((tab, index) => {
          return (
            <div
              className={getClass(index)}
              onClick={() => {
                setTabIndex(index);
              }}
              key={index}
            >
              {tab.text}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export { TabsSection };
