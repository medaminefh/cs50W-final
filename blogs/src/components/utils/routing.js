import Blog from "../Blog/blog";
import Markdown from "../Markdown/markdown";
import LandingPage from "../LandingPage/landingPage";

import { Route, Switch } from "react-router-dom";

const Routing = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/blog/create" component={Markdown} />
        <Route exact path="/blogs/:id" component={Blog} />
        <Route exact path="/blogs/:id/edit" component={Markdown} />
        <Route exact path="*" component={LandingPage} />
      </Switch>
    </div>
  );
};

export default Routing;
