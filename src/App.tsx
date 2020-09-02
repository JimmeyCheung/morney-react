import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Tags from "views/Tags";
import Statistics from "views/Statistics";
import NoMatch from "components/NoMatch";
import Money from "views/Money";
import { Tag } from "./views/Tag";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN"; // 引入语言包
import moment from "moment";
import "moment/locale/zh-cn";
import { RecordDetail } from "views/Statistics/RecordDetail";
import { QRCode } from "components/QRCode";
moment.locale("zh-cn");

const AppWrapper = styled.div`
  height: 100%;
  color: #333;
`;
const PageWrapper = styled.div`
  height: 100%;
`;
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AppWrapper>
        <Router>
          <QRCode />
          <PageWrapper>
            <Switch>
              <Route exact path="/tags">
                <Tags />
              </Route>
              <Route exact path="/money">
                <Money />
              </Route>
              <Route exact path="/money/:id">
                <Money />
              </Route>
              <Route exact path="/statistics">
                <Statistics />
              </Route>
              <Route exact path="/statistics/:id">
                <RecordDetail />
              </Route>
              <Redirect exact from="/" to="/money" />
              <Route exact path="/tags/:id">
                <Tag />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </PageWrapper>
        </Router>
      </AppWrapper>
    </ConfigProvider>
  );
}
export default App;
