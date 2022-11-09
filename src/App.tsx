import React, { useEffect, useReducer } from "react";
import "./App.css";
import Body from "./components/body/Body";
import LogoTray from "./components/logo-tray/LogoTray";
import axios from "axios";
import { space3xReducer } from "./utility/space3xReducer";

function App() {
  const [state, dispatch] = useReducer(space3xReducer, {
    data: [],
    loading: false,
  });
  const getProductData = async () => {
    dispatch({
      type: "GET_DATA_FROM_SPACE3X",
      payload: { data: [], loading: true },
    });
    const { data } = await axios.get("https://api.spacexdata.com/v3/launches");
    dispatch({
      type: "GET_DATA_FROM_SPACE3X",
      payload: { data, loading: false },
    });
  };
  useEffect(() => {
    getProductData();
  }, []);

  // useEffect(() => {
  //   console.log(state);
  // });

  return (
    <div className="App">
      <LogoTray />
      <Body data={state.data} loading={false} />
    </div>
  );
}

export default App;
