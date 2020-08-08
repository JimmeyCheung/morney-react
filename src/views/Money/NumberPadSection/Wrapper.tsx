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
    @media screen and (max-height:650px){
        &>button{
          height:48px;
          &.ok {
          height: 96px;
          }
        }
      }
  }
`;

export { Wrapper };
