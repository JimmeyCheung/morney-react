import styled from "styled-components";
import React, { useState } from "react";
import { useTags } from "hooks/useTags";
import Icon from "components/Icon";
import moment from "moment";
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import "./styles/BillDetail.scss";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  & > .title {
    padding: 10px 10px;
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
  cursor:pointer;
  &.selected{
    border-bottom: 1px solid var(--border-color);
  }
  & > .info {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid var(--border-color);

    > span {
      margin-left: 5px;
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
  padding-bottom:5px;
  background:var(--bg-color);
  li {
    display: flex;
    justify-content: space-between;
    padding: 5px 25px 0 25px;
    font-size:12px;
    >span{
      flex-shrink:1;
      width:60%;
      overflow:hidden;
      text-overflow:ellipsis;
      &:nth-child(2){
        width:40%;
        text-align:right;
      }
    }
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
              className={bill.tagId === selectedId ? "selected" : ""}
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
                <span className="bill-amount">{bill.amount}元</span>
                <Icon
                  className="ex-icon"
                  name={bill.tagId === selectedId ? "top" : "bottom"}
                />
              </div>
              <CSSTransition
                in={bill.tagId === selectedId}
                timeout={300}
                classNames="bill"
                unmountOnExit
              >
                <BillDetails className="details" >
                  {
                    bill.children.map((id, billIndex) => {
                      const record = records.find((record) => record.id === id);
                      if (record) {
                        return (
                          <Link to={"/Statistics/" + id}>
                            <li key={billIndex} onClick={(e) => { e.stopPropagation() }}>
                              <span>
                                {moment(record.createdDate).format("YYYY.M.D")}（{record.note}）
                            </span>
                              <span>
                                {record.amount}元
                            </span>
                            </li>
                          </Link>
                        );
                      }
                      return "";
                    })
                  }
                </BillDetails>
              </CSSTransition>
            </BillWrapper>
          );
        })}
      </ol>
    </Wrapper >
  );
};
export { BillSection };
