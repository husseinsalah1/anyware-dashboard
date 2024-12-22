import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout";
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Layout>
          <AllRoutes />
        </Layout>
      </Router>
    </>
  );
};

export default App;
