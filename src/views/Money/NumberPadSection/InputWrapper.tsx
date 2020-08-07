import styled from "styled-components";
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-top: 1px solid var(--border-color);
  background:#fff;
  & > div {
    width: 50%;
    height: 30px;
  }
  > .line {
    flex-shrink: 0;
    width: 2px;
    background: var(--border-color);
  }

  > .output {
    background: white;
    font-size: 30px;
    line-height: 30px;
    text-align: right;
    overflow-x: auto;
  }
`;
export { InputWrapper };
