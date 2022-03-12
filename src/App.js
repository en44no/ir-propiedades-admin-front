import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Section from "./components/Section/Section";
import PropertiesPage from "./pages/Properties";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import UsersPage from "./pages/Users";
import CustomersPage from "./pages/Customers";
import ReportsPage from "./pages/Reports";

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
            path="/usuarios"
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
            path="/propiedades"
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
          <Route
            path="/clientes"
            element={
              <PrivateRoute
                component={
                  <Section title="Manejo de Clientes">
                    <CustomersPage />
                  </Section>
                }
              />
            }
          />
          <Route
            path="/reportes"
            element={
              <PrivateRoute
                component={
                  <Section title="Reportes">
                    <ReportsPage />
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
