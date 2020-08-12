import styled from "styled-components";
import { useRef } from "react";
import React from "react";
import { useUpdate } from "../../hooks/useUpdate";

const echarts = require("echarts");
type Props = {
  chartData: ChartData;
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
  useUpdate(() => {
    myChart = echarts.init(refChart.current);
    myChart.setOption({
      title: {
        text: `总支出${totalAmount}元`,
        subtext: `其中每天平均消费${averageAmount}元`,
        textStyle: { fontWeight: "normal", fontSize: 14, color: "#a8a3a3" },
        subtextStyle: { color: "#a8a3a3" },
      },
      grid: {
        left: "5px", // 与容器左侧的距离
        right: "5px", // 与容器右侧的距离
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxis,
      },
      yAxis: {
        type: "value",
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
    window.addEventListener("resize", listener);
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
