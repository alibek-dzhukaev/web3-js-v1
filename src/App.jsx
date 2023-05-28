import Home from "./components/Home";

const App = () => {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <div>No</div>;
  }
};

export default App;
