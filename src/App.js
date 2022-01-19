import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Section from "./components/Section/Section";
import PropertiesPage from "./pages/Properties";
import PropertiesState from "./context/PropertiesState";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <PropertiesState>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <Section title="Manejo de Usuarios">
                  <Users />
                </Section>
              }
            />
            <Route
              path="/properties"
              element={
                <Section title="Manejo de Propiedades">
                  <PropertiesPage />
                </Section>
              }
            />
          </Routes>
        </Router>
      </PropertiesState>
    </>
  );
}

export default App;
