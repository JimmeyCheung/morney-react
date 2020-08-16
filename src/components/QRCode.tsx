import { useState } from 'react';
import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgb(140, 140, 140, 0.5);
  z-index: 9999;
  &.visible {
    @media screen and (min-width: 501px) {
      display: block;
    }
  }

  & > .QR-code {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    width: 300px;
    height: 300px;
    margin: auto;
    background: url("/QRCode.png") center/100% 100%;
  }

  .tips {
    position: absolute;
    top: -30px;
    width: 100%;
    background: white;
    color: #000;
    font-weight: bold;
    text-align: center;
    line-height: 30px;

    .close {
      position: absolute;
      top: 0;
      right: -24px;
      cursor: pointer;
    }
    svg {
      color: #000;
    }
  }
`;

const QRCode = () => {
  const [visible, setVisible] = useState(true);
  return (
    <Wrapper className={visible ? "visible" : ""}>
      <div className="QR-code">
        <div className="tips">
          为了保证你的浏览效果，请扫描下方二维码使用手机浏览
                        <div title="关闭" className="close" onClick={() => { setVisible(false) }}>
            <Icon name="close" />
          </div>
        </div>
      </div>
    </Wrapper >
  )
}
export { QRCode }