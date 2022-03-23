import "./App.css";
import Spinner from "./components/Spinner";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import useGetData from "./data/useGetData";

function App() {
  const {data, dataErr} = useGetData();

  return (
    <div className="App">
      <NavBar/>
      <div className="container">
        {data
          ? data.map((el) => (
            <Card db={el}/>
            ))
          : (<Spinner />)}
        {dataErr
          ? dataErr.map((el) => (
            <Card db={el}/>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
