import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { VideoLibraryHome } from "./component/VideoLibraryHome";
import { UserRegister } from './component/UserRegister';
import { UserLogin } from './component/UserLogin';
import { UserDashBoard } from './component/UserDashBoard';
import { UserLoginError } from './component/UserLoginError';
import { AdminLogin } from './component/AdminLogin';
import { AdminDashBoard } from './component/AdminDashBoard';
import { AddVideo } from './component/AddVideo';
import { EditVideo } from './component/EditVideo';
import { DeleteVideo } from './component/DeleteVideo';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <header className="bg-dark text-white p-2">
          <h1 className="text-center">
            <Link to="/" className="btn btn-dark btn-lg">
              Video Library
            </Link>
          </h1>
        </header>
        <section>
          <Routes>
            <Route path="/" element={<VideoLibraryHome />} />
            <Route path="user-register" element={<UserRegister />} />
            <Route path="user-login" element={<UserLogin />} />
            <Route path="user-dashboard" element={<UserDashBoard />} />
            <Route path="user-login-error" element={<UserLoginError />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin-dashboard" element={<AdminDashBoard />} />
            <Route path="add-video" element={<AddVideo />} />
            <Route path="edit-video/:id" element={<EditVideo />} />
            <Route path="delete-video/:id" element={<DeleteVideo />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App
