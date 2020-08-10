import Layout from "../components/Layout";
import React, { ReactNode, useState, useRef } from "react";
import { CategorySection } from "./Money/CategorySection";
import styled from "styled-components";
import { RecordItem, useRecords } from "../hooks/useRecords";
import { useTags } from "../hooks/useTags";
import day from "dayjs";
import { useEffect } from "react";

const echarts = require("echarts");

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

const Chart = styled.div`
  width: 100%;
  height: 300px;
`;
const Statistics = () => {
  const [category, setCategory] = useState<"-" | "+">("-");
  const { records } = useRecords();
  const { getName } = useTags();
  const hash: { [K: string]: RecordItem[] } = {}; // {'2020-05-11': [item, item], '2020-05-10': [item, item], '2020-05-12': [item, item, item, item]}
  const selectedRecords = records.filter((r) => r.category === category);

  selectedRecords.forEach((r) => {
    const key = day(r.createdDate).format("YYYY年MM月DD日");
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
  const refChart = useRef(null);
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(refChart.current);
    myChart.setOption({
      title: {
        text: "总支出3999元",
        subtext: "其中每天平均消费xxx元",
        textStyle: { fontWeight: "normal" },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    });
  });

  return (
    <Layout>
      <CategoryWrapper>
        <CategorySection
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </CategoryWrapper>
      <Chart ref={refChart}></Chart>

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
