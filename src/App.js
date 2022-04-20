import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BigLoader from "./components/Other/Loader/BigLoader/BigLoader";
import PrivateRoute from "./PrivateRoute";

const Section = React.lazy(() => import("./components/Section/Section"));
const PropertiesPage = React.lazy(() => import("./pages/Properties"));
const Login = React.lazy(() => import("./pages/Login"));
const UsersPage = React.lazy(() => import("./pages/Users"));
const CustomersPage = React.lazy(() => import("./pages/Customers"));
const ReportsPage = React.lazy(() => import("./pages/Reports"));

function App() {
  return (
    <>
      <Suspense fallback={<BigLoader />}>
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
      </Suspense>
    </>
  );
}

export default App;
