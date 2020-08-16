import styled from "styled-components";
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  height:46px;
  padding: 0 16px;
  border-top: 1px solid var(--border-color);
  background:#fff;
  & > div {
    width: 50%;
  }
  > .line {
    flex-shrink: 0;
    width: 2px;
    height:30px;
    background: var(--border-color);
  }

  > .output {
    background: white;
    font-size: 30px;
    line-height: 30px;
    text-align: right;
    overflow-x: auto;
    overflow-y:hidden;
  }
  .am-list-item .am-list-line .am-list-extra{
    flex-basis: 100%;
    text-align: left;
  }
`;
export { InputWrapper };
