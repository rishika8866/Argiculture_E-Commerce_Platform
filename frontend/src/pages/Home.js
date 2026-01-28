import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
     navigate("/login");
    // const token = localStorage.getItem("login");
    // if (token) {
    //   navigate("/login"); // ✅ go to product page if logged in
    // } else {
    //   navigate("/login"); // 🔐 go to login if not logged in
    // }
  };

  return (
    <div>
      {/* Hero Section */}
      <header className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Welcome to Grain Market</h1>
          <p className="lead mb-4">
            Buy and sell high-quality grains directly from trusted farmers.
          </p>
          <button onClick={handleShopNow} className="btn btn-light btn-lg">
            Shop Now
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-success">Our Services</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Fresh Grains</h5>
                  <p className="card-text">
                    Buy grains directly sourced from local farms with assured quality.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Easy Purchase</h5>
                  <p className="card-text">
                    Order grains online easily with secure payment options.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Fast Delivery</h5>
                  <p className="card-text">
                    Receive your grains quickly and safely at your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
