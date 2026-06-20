
// import ScrollToTop from "./components/ScrollToTop";
// import { BrowserRouter } from "react-router-dom";
// import AppRouter from "./router/AppRouter";
// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";

// export default function App() {
//   return (
//     <BrowserRouter>
//   <ScrollToTop />
//   <Header />
//       <AppRouter />
//       <Footer />
//     </BrowserRouter>
//   );
// }
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages where header and footer should NOT appear
const noLayoutPages = ["/dashboard", "/staff-login", "/admin"];

function Layout() {
  const location = useLocation();
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Header />}
      <AppRouter />
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}