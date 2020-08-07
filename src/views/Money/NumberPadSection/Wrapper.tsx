import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  > .pad {
    > button {
      font-size: 18px;
      float: left;
      width: 25%;
      height: 64px;
      border: 1px solid var(--border-color);
      background: #fff;
      &:active {
        background: var(--skin-color);
      }
      &.ok {
        height: 128px;
        float: right;
        background: var(--skin-color);
      }
      &.zero {
        width: 50%;
      }
    }
  }
`;

export { Wrapper };
