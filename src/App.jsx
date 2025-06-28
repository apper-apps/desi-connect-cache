import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Communities from '@/components/pages/Communities';
import Discussions from '@/components/pages/Discussions';
import Events from '@/components/pages/Events';
import Businesses from '@/components/pages/Businesses';
import People from '@/components/pages/People';
import Messages from '@/components/pages/Messages';
import Profile from '@/components/pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/events" element={<Events />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/people" element={<People />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;