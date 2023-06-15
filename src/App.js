import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default class App extends Component {
  pageSize = 15;
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="General" pageSize={this.pageSize} country="in" category="General"/>}/>
          <Route exact path="/enterainment" element={<News key="Enterainment" pageSize={this.pageSize} country="in" category="Enterainment"/>}/>
          <Route exact path="/general" element={<News key="General" pageSize={this.pageSize} country="in" category="General"/>}/>
          <Route exact path="/business" element={<News key="Business" pageSize={this.pageSize} country="in" category="Business"/>}/>
          <Route exact path="/health" element={<News key="Health" pageSize={this.pageSize} country="in" category="Health"/>}/>
          <Route exact path="/science" element={<News key="Science" pageSize={this.pageSize} country="in" category="Science"/>}/>
          <Route exact path="/sports" element={<News key="Sports" pageSize={this.pageSize} country="in" category="Sports"/>}/>
          <Route exact path="/technology" element={<News key="Technology" pageSize={this.pageSize} country="in" category="Technology"/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}
