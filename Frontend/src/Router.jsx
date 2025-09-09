import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SearchFlightPage from './pages/User/SearchFlightPage';
import SearchRoutePage from './pages/User/SearchRoutePage';
import SelectSeatPage from './pages/User/SelectSeatPage';
import BookingPage from './pages/User/BookingPage';
import PaymentPage from './pages/User/PaymentPage';
import SuccessPage from './pages/User/SuccessPage';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateFlightPage from './pages/Admin/CreateFlightPage';
import ManageFlightsPage from './pages/Admin/ManageFlightsPage';
import FlightOwnerDashboard from './pages/Owner/FlightOwnerDashboard';
import AdminBookingList from './pages/Admin/BookingList';
import UserManagement from './pages/Admin/UserManagement';
import RouteManager from './pages/Admin/RouteManager';
import BookingReviewPage from './pages/User/BookingReviewPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/Register'; 
import OwnerCreateFlightPage from './pages/Owner/OwnerCreateFlightPage';
import OwnerManageFlightsPage from './pages/Owner/OwnerManageFlightsPage';




export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user/search-flight" element={<SearchFlightPage />} />
        <Route path="/search-route" element={<SearchRoutePage />} />
        <Route path="/select-seat/:flightId" element={<SelectSeatPage />} />
        <Route path="/booking/:flightId" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/user/userdashboard" element={<UserDashboard />} />
        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
        <Route path="/create-flight" element={<CreateFlightPage />} />
        <Route path="/manage-flights" element={<ManageFlightsPage />} />
        <Route path="/own-create-flight" element={<OwnerCreateFlightPage />} />
        <Route path="/own-manage-flights" element={<OwnerManageFlightsPage />} />
        <Route path="/owner/flightownerdashboard" element={<FlightOwnerDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookingList />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/routes" element={<RouteManager />} />
        <Route path="/review-booking" element={<BookingReviewPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        

      </Routes>
    </BrowserRouter>
  );
}
