import Layout from "../components/Layout";
import React, { ReactNode, useState } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { RecordItem, useRecords } from "../hooks/useRecords";
import { useTags } from "../hooks/useTags";
import day from "dayjs";

const CategoryWrapper = styled.div`
  background: white;
`;
const Header = styled.h3`
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
`;
const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const { getName } = useTags();
  const hash: { [K: string]: RecordItem[] } = {}; // {'2020-05-11': [item, item], '2020-05-10': [item, item], '2020-05-12': [item, item, item, item]}
  const selectedRecords = records.filter((r) => r.category === category);

  selectedRecords.forEach((r) => {
    const key = day(r.createdAt).format("YYYY年MM月DD日");
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });

  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });
  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>

      {array.map(([date, records], i) => (
        <div key={i}>
          <Header>{date}</Header>
          <div>
            {records.map((r, rIndex) => {
              return (
                <Item key={rIndex}>
                  <div className="tags oneLine">
                    {r.tagIds
                      .map((tagId) => <span key={tagId}>{getName(tagId)}</span>)
                      .reduce(
                        (result, span, index, array) =>
                          result.concat(
                            index < array.length - 1 ? [span, "，"] : [span]
                          ),
                        [] as ReactNode[]
                      )}
                  </div>
                  {r.note && <div className="note">{r.note}</div>}
                  <div className="amount">￥{r.amount}</div>
                </Item>
              );
            })}
          </div>
        </div>
      ))}
    </Layout>
  );
};
export default Statistics;
