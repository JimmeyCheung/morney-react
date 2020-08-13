import styled from "styled-components";
import React, { useState } from "react";
import { useTags } from "hooks/useTags";
import Icon from "components/Icon";
import moment from "moment";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  & > .title {
    padding: 5px 10px;
    background: var(--bg-color);
    font-size: 16px;
  }
  & > .bill {
    height: 100%;
    margin: 10px;
    border-top: 1px solid var(--border-color);
    overflow: auto;
    font-size: 14px;
  }
`;
const BillWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid var(--border-color);

    > span {
      margin-left: 10px;
      flex-shrink: 0;
    }
    .remark {
      font-size: 14px;
      color: #a8a3a3;
    }
    .bill-amount {
      flex-shrink: 1;
      width: 100%;
      text-align: right;
    }
    .icon {
      width: 20px;
      height: 20px;
      color: red;
      &.ex-icon {
        margin-left: 10px;
        color: black;
      }
    }
  }
`;
const BillDetails = styled.ol`
  display: flex;
  width: 100%;
  flex-direction: column;
  > li {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
`;
type Props = {
  records: RecordItem[];
};
type Bill = {
  tagId: number;
  amount: number;
  icon: string;
  name: string;
  note: string;
  children: number[];
};
const BillSection = (props: Props) => {
  const { findTag } = useTags();
  const { records } = props;
  const getBillList = () => {
    let billList: Bill[] = [];
    records.forEach((record) => {
      const {
        id,
        amount,
        note,
        tagIds: [tagId],
      } = record;
      const { icon, name } = findTag(tagId);
      let bill = billList.find((v) => v.tagId === tagId);
      if (bill) {
        bill.amount += amount;
        bill.children.push(id);
      } else {
        billList.push({
          amount: record.amount,
          tagId,
          icon,
          name,
          note,
          children: [id],
        });
      }
    });
    return billList.sort((a, b) => {
      return b.amount - a.amount;
    });
  };
  const [selectedId, setSelectedId] = useState(-1);
  return (
    <Wrapper>
      <div className="title">支出排行榜</div>
      <ol className="bill">
        {getBillList().map((bill, index) => {
          return (
            <BillWrapper
              key={index}
              onClick={() => {
                setSelectedId(bill.tagId === selectedId ? -1 : bill.tagId);
              }}
            >
              <div className="info">
                <Icon className="icon" name={bill.icon} />
                <span>
                  {bill.name}（{bill.children.length}次）
                </span>
                <span></span>
                <span className="bill-amount">共{bill.amount}元</span>
                <Icon
                  className="ex-icon"
                  name={bill.tagId === selectedId ? "top" : "bottom"}
                />
              </div>
              {bill.tagId === selectedId ? (
                <BillDetails className="details">
                  {bill.children.map((id, billIndex) => {
                    const record = records.find((record) => record.id === id);
                    if (record) {
                      return (
                        <li key={billIndex}>
                          <span>
                            {moment(record.createdDate).format("YYYY年M月D日")}
                          </span>
                          <span>{record.note}</span>
                          <span>
                            {record.category === "-" ? "支出" : "收入"}
                            {record.amount}元
                          </span>
                        </li>
                      );
                    }
                  })}
                </BillDetails>
              ) : (
                ""
              )}
            </BillWrapper>
          );
        })}
      </ol>
    </Wrapper>
  );
};
export { BillSection };
