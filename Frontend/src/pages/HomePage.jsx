import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/homebg.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-start align-items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        overflowY: 'auto',
        paddingTop: '100px',
        color: '#000',
      }}
    >
      
      <div className="p-4 rounded text-center w-75">
        <h1 className="display-5 fw-bold">Welcome to SimplyFly ✈️</h1>
        <p className="lead">Your gateway to seamless travel</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/login')}>
          🔐 Login
        </button>
      </div>

   
<div className="mb-5">
  <h2 className="text-center mb-3">📖 About SimplyFly</h2>
  <div className="p-3 rounded">
    <p>
      SimplyFly is your trusted travel companion, engineered to simplify every step of your journey with precision, speed, and clarity. Whether you're a frequent flyer chasing business goals, a first-time traveler exploring new horizons, or an admin managing complex itineraries, SimplyFly adapts to your needs with seamless efficiency. Our platform offers flight bookings, hotel reservations, and real-time travel updates—all wrapped in a clean, intuitive interface that eliminates confusion and prioritizes transparency. No hidden fees, no cluttered menus—just smooth navigation and honest pricing. Admins benefit from powerful dashboard tools that streamline booking management, cancellations, and refunds, with secure role-based access and actionable insights. Travelers enjoy curated offers, instant confirmations, and secure payment options including our SimplyPay Wallet, which supports cashback and flexible transactions. Owners and operators gain access to robust analytics that reveal user behavior, booking trends, and operational performance. What sets SimplyFly apart is our relentless commitment to customer-first service—we listen, we iterate, and we deliver features that solve real-world problems. From backend security and scalable architecture to frontend polish and emotionally resonant UX, every pixel and endpoint is designed for performance. We’ve built a system that doesn’t just work—it works beautifully. Our cancellation and refund flows are fast, fair, and frustration-free, and our support team is always ready to assist with empathy and speed. Whether you're booking a weekend escape or managing a fleet of travelers, SimplyFly empowers you to move with confidence. We believe travel should be exciting, not exhausting, and we’re here to make that happen—one seamless experience at a time. Welcome aboard.
    </p>
  </div>
</div>



    <div className="container mt-5">
  
  <div className="mb-5">
    <h2 className="text-center mb-4 text-dark">🔥 Latest Offers</h2>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
     
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">🎓 Student & Senior Discounts</h5>
          <p>Special rates for students and senior citizens – save more every day.</p>
        </div>
      </div>

      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">🌐 Air India International</h5>
          <p>₹3000 off on select Air India international flights. Limited time only.</p>
        </div>
      </div>

     
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">🏨 Hotel Bundle</h5>
          <p>Get 25% off on hotel bookings when bundled with flights.</p>
        </div>
      </div>

      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">💳 SimplyPay Cashback</h5>
          <p>Earn ₹1500 cashback when you pay via SimplyPay Wallet.</p>
        </div>
      </div>
     
<div className="col">
  <div className="glass-card p-3 h-100">
    <h5 className="mb-2">✈️ Weekend Getaway Deals</h5>
    <p>Flat ₹2000 off on round-trip weekend flights.</p>
  </div>
</div>


<div className="col">
  <div className="glass-card p-3 h-100">
    <h5 className="mb-2">🧳 Luggage Upgrade Offer</h5>
    <p>Free extra baggage allowance on select routes.</p>
  </div>
</div>

    </div>
  </div>
</div>

        <div className="container mt-5">
  
  <div className="mb-5">
    <h2 className="text-center mb-4 text-dark">🆘 Help & Support</h2>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">📞 24/7 Customer Care</h5>
          <p>Call, chat, or email us anytime — we’re always here for you.</p>
        </div>
      </div>

      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">❌ Easy Cancellation & Refund</h5>
          <p>No hidden charges. Cancel or refund with confidence and clarity.</p>
        </div>
      </div>

      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">🩺 Medical Emergency Support</h5>
          <p>We’ve got your back — fast help when you need it most.</p>
        </div>
      </div>

      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">🛂 Visa Rejection Assistance</h5>
          <p>Refunds and rebooking made easy — no stress, no hassle.</p>
        </div>
      </div>

      
      <div className="col">
        <div className="glass-card p-3 h-100">
          <h5 className="mb-2">💬 Live Chat with Experts</h5>
          <p>Real humans, real help — chat with travel experts anytime.</p>
        </div>
      </div>
      
<div className="col">
  <div className="glass-card p-3 h-100">
    <h5 className="mb-2">🧾 Invoice & Billing Help</h5>
    <p>Download invoices or get billing support instantly.</p>
  </div>
</div>

    </div>
  </div>
</div>
<div className="text-center text-muted py-3" style={{ fontSize: '0.9rem' }}>
  © {new Date().getFullYear()} SimplyFly. All rights reserved.
</div>



      </div>
  );
};

export default HomePage;
