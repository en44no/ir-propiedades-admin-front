import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Section from "./components/Section/Section";
import PropertiesPage from "./pages/Properties";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import UsersPage from "./pages/Users";

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
                    <UsersPage />
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
