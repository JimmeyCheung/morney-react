import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.header`
    height:60px;
    background:var(--skin-color);
`;
const Header: React.FC = (props) => {
    return (<Wrapper>
        {props.children}
    </Wrapper>)
}
export { Header };