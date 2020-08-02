import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Layout from 'components/Layout';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/tags">
            <Tags />
          </Route>
          <Route path="/money">
            <Money />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Redirect exact from="/" to="/money" />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

function NoMatch() {
  return (
    <div>页面不存在，你丫输错地址了吧！</div>
  );
}

function Statistics() {
  return <h2>统计页面</h2>;
}

function Tags() {
  return <h2>标签页面</h2>;
}

function Money() {
  return <h2>记账页面</h2>;
}

export default App;