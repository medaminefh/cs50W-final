import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Routing from "./components/utils/routing";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routing />
      <Footer />
    </Router>
  );
}

export default App;
