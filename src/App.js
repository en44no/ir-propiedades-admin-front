import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Section from "./components/Section/Section";
import PropertiesPage from "./pages/Properties";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                component={
                  <Section title="Manejo de Propiedades">
                    <PropertiesPage />
                  </Section>
                }
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <PrivateRoute
                component={
                  <Section title="Manejo de Usuarios">
                    <Users />
                  </Section>
                }
              />
            }
          />
          <Route
            path="/properties"
            element={
              <PrivateRoute
                component={
                  <Section title="Manejo de Propiedades">
                    <PropertiesPage />
                  </Section>
                }
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
