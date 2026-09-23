import "../styles/hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="overlay">
        <div className="hero-content">
          <h1>
            Fresh Groceries, <br />
            Delivered <span>Fast</span>
          </h1>
          <p>
            Get farm-fresh produce and daily essentials delivered to your
            doorstep.
          </p>
          <p>
            Up to 40% off on your first order!
          </p>

          <button>Shop Now → </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;