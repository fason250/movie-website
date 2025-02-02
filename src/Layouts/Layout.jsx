import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <main className="min-h-screen relative bg-primary">
        <div className="bg-hero-pattern w-screen h-screen bg-center bg-cover absolute z-0">
            <Outlet />
            <Footer />
        </div>
    </main>
  )
}

export default Layout