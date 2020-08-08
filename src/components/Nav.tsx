import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React from "react";
import Icon from "./Icon";
const NavWrapper = styled.nav`
  line-height: 24px;
  background: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  > ul {
    display: flex;
    > li {
      width: 33.3333%;
      text-align: center;
      > a {
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        justify-content: center;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
        }
        &.selected {
          color: var(--skin-color);
        }
      }
    }
  }
`;

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/tags" activeClassName="selected">
            <Icon name="details" />
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="addLedger" />
            记一笔
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="report" />
            报表
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Nav;
