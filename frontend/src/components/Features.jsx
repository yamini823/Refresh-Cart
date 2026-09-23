import "../styles/features.css";
import {
  Truck,
  Clock,
  ShieldCheck,
  Tag,
} from "lucide-react";

function Features() {
  return (
    <div className="features" >
 <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon">
          <Truck />
        </div>
        <h3>Free Delivery</h3>
        <p>Orders over $30</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <Clock />
        </div>
        <h3>30 Min Delivery</h3>
        <p>Express shipping</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <ShieldCheck />
        </div>
        <h3>Fresh Guarantee</h3>
        <p>100% quality</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">
          <Tag />
        </div>
        <h3>Best Prices</h3>
        <p>Unbeatable deals</p>
      </div>
 </div>
    </div>
  );
}

export default Features;