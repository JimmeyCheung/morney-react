import styled from "styled-components";
import { useRef } from "react";
import React from "react";
import { useUpdate } from "../../hooks/useUpdate";

const echarts = require("echarts");
type Props = {
  chartData: ChartData;
  category: string
};

const Wrapper = styled.section`
  width: 100%;
  height: 250px;
  padding: 10px;
  & > .chart {
    height: 100%;
  }
`;
const ChartsSection = (props: Props) => {
  const refChart = useRef(null);
  const { xAxis, series, totalAmount, averageAmount } = props.chartData;
  let myChart: any = undefined;
  const categoryName = props.category === '-' ? '支出' : '收入';
  useUpdate(() => {
    myChart = echarts.init(refChart.current);
    myChart.setOption({
      title: {
        text: `总${categoryName + totalAmount}元`,
        subtext: `其中每天平均${categoryName + averageAmount
          }元`,
        textStyle: { fontWeight: "normal", fontSize: 14, color: "#a8a3a3" },
        subtextStyle: { color: "#a8a3a3" },
      },
      grid: {
        left: "5px", // 与容器左侧的距离
        right: "5px", // 与容器右侧的距离
        bottom: 0,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{c}元'
      },
      xAxis: {
        type: "category",
        data: xAxis,
        axisLabel: {
          formatter: '{value}'
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: '{value}元'
        },
      },
      series: [
        {
          data: series,
          type: "line",
        },
      ],
    });
    const listener = () => {
      myChart.resize();
    };
    window.addEventListener("resize", listener);//window resize时图标宽度自适应
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [props]);
  return (
    <Wrapper>
      <div className="chart" ref={refChart}></div>
    </Wrapper>
  );
};

export { ChartsSection };
