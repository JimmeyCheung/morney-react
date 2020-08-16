import React, { useState } from "react";
import { Wrapper } from "./NumberPadSection/Wrapper";
import { InputWrapper } from "./NumberPadSection/InputWrapper";
import { generateOutput } from "./NumberPadSection/generateOutput";
import moment from "moment";
import { useEffect } from "react";
import { DatePicker, List } from 'antd-mobile';

type Props = {
  data: {
    createdDate: string;
    amount: number;
  };
  onChange: (amount: number, createdDate: string) => void;
  onOk?: () => void;
};
const NumberPadSection: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.data.amount.toString());
  const [createdDate, _setCreatedDate] = useState(props.data.createdDate);
  const setOutput = (_output: string) => {
    if (_output.length > 16) {
      _output = _output.slice(0, 16);
    } else if (_output.length === 0) {
      _output = "0";
    }
    _setOutput(_output);
    props.onChange(parseFloat(_output), createdDate);
  };
  const setCreatedDate = (createdDate: string) => {
    _setCreatedDate(createdDate);
    props.onChange(parseFloat(output), createdDate);
  };
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    if (text === "完成") {
      if (props.onOk) {
        props.onOk();
      }
      return;
    }
    if ("0123456789.".split("").concat(["删除", "清空"]).indexOf(text) >= 0) {
      setOutput(generateOutput(text, output));
    }
  };
  useEffect(() => {
    _setOutput(props.data.amount.toString());
    _setCreatedDate(props.data.createdDate);
  }, [props]);
  return (
    <Wrapper>
      <InputWrapper>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={new Date(createdDate)}
          onChange={date => { setCreatedDate(moment(date).format("YYYY-MM-DD")); }}
        >
          <List.Item></List.Item>
        </DatePicker>
        <div className="line"></div>
        <div className="output">{output}</div>
      </InputWrapper>
      <div className="pad clearfix" onClick={onClickButtonWrapper}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="ok">完成</button>
        <button className="zero">0</button>
        <button className="dot">.</button>
      </div>
    </Wrapper>
  );
};

export { NumberPadSection };
