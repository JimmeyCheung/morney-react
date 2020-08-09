import styled from 'styled-components';

const Label = styled.label`
    display:flex;
    align-items: center;
    > span {flex-shrink:0; width:70px; margin-right: 16px; white-space: nowrap; }
    > input,select {
      display:block;
      width: 100%;
      height: 44px;
      background: none;
      border: none;
    }
`;
export { Label };