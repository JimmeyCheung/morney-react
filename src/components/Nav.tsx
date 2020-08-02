import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';


const NavWrapper = styled.nav`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  > ul {
    display:flex;
    > li{
      width: 33.3333%;
      text-align:center;
      padding: 16px;
      > svg{
        width: 1em;
        height: 1em;
        fill: currentColor;
      }
    }
  }
`;

const Nav = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <svg>
                        <use xlinkHref="icon-label" />
                    </svg>
                    <Link to="/tags">标签页</Link>
                </li>
                <li>
                    <Link to="/money">记账页</Link>
                </li>
                <li>
                    <Link to="/statistics">统计页</Link>
                </li>
            </ul>
        </NavWrapper>
    );
};

export default Nav;