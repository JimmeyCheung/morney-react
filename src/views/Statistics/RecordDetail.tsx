import styled from "styled-components";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useRecords } from "hooks/useRecords";
import { useTags } from "hooks/useTags";
import Icon from "components/Icon";
import moment from "moment";
import { Button } from "components/Button";
import { showConfirm } from "components/confirm";
import { message } from "antd";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  > header {
    position: relative;
    display: flex;
    flex-shrink: 0;
    height: 60px;
    align-items: center;
    justify-content: center;
    background: var(--skin-color);
    font-size: 20px;
    .back-icon {
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .icon {
      width: 24px;
      height: 24px;
    }
    > span {
      margin-left: 10px;
    }
  }
  > main {
    flex-shrink: 1;
    height: 100%;
    padding: 20px 20px;
    background: #fff;
    overflow: auto;
  }
  > footer {
    display: flex;
    align-items: center;
    height: 50px;
    border-top: 1px solid var(--border-color);
    > Button {
      width: 50%;
      height: 100%;
      background: #fff;
      cursor: pointer;
      &:active {
        background: var(--bg-color);
      }
    }
    > .line {
      width: 1px;
      height: 60%;
      background: var(--border-color);
    }
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  padding: 10px;
  > .title {
    flex-shrink: 0;
    padding-right: 30px;
    color: #8c8a8a;
  }
  > .content {
    word-wrap: break-word;
    word-break: break-all;
  }
`;
const getDay = (dayNumber: number) => {
  const days = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return days[dayNumber];
};

const RecordDetail = () => {
  let id = parseInt(useParams<{ id: string }>().id);
  const { records, deleteRecord } = useRecords();
  const { findTag } = useTags();
  const history = useHistory();
  const record = records.find((v) => v.id === id);
  const tag = findTag(record?.tagIds[0] || -1);
  const date = moment(record?.createdDate);
  const items = [
    { text: "类型", value: record?.category === "-" ? "支出" : "收入" },
    { text: "金额", value: record?.amount + "元" },
    {
      text: "时间",
      value: date.format("YYYY年M月D日") + " " + getDay(date.day()),
    },
    { text: "备注", value: record?.note },
  ];
  const deleteBill = () => {
    showConfirm({
      title: "删除",
      content: "是否确定删除此记录？",
      okFn: () => {
        if (deleteRecord(id)) {
          message.success("删除成功");
          history.goBack();
        } else {
          message.error("删除异常，记录不存在");
        }
      },
    });
  };
  return (
    <Wrapper>
      <header>
        <Icon
          className="back-icon"
          name="left"
          onClick={() => {
            history.goBack();
          }}
        />
        <Icon name={tag?.icon} />
        <span>{tag?.name}</span>
      </header>
      <main>
        {items.map((item, i) => {
          return (
            <ItemWrapper key={i}>
              <span className="title">{item.text}</span>
              <span className="content">{item.value}</span>
            </ItemWrapper>
          );
        })}
      </main>
      <footer>
        <Button
          onClick={() => {
            history.push(`/money/${id}`);
          }}
        >
          编辑
        </Button>
        <div className="line"></div>
        <Button onClick={deleteBill}>删除</Button>
      </footer>
    </Wrapper>
  );
};

export { RecordDetail };
