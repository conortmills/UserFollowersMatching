import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import DisplayPage from "./DisplayPage";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route exact path="/" element={<DisplayPage />}></Route>
        </Routes>
      </Main>
    </BrowserRouter>
  );
}

const Main = styled.div``;

export default App;
