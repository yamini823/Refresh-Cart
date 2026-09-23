import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function Returns() {
  const navigate = useNavigate();
  const [eligibleOrders, setEligibleOrders] = useState([]);
  const [returnRequestedOrders, setReturnRequestedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      
      const validOrders = res.data.map(order => {
        const validItems = (order.items || []).filter(
          item => item && item.name && item.price !== undefined
        );
        const recalcTotal = validItems.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0) + 20;
        return {
          ...order,
          items: validItems,
          total: recalcTotal > 20 ? recalcTotal : order.total
        };
      }).filter(order => order.items.length > 0);

      const eligible = validOrders.filter(o => o.status?.toLowerCase() === "delivered");
      const requested = validOrders.filter(o => o.status?.toLowerCase() === "return requested");
      
      setEligibleOrders(eligible);
      setReturnRequestedOrders(requested);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReturn = async (orderId) => {
    if(!window.confirm("Are you sure you want to request a return for this order?")) return;
    
    try {
      await API.put(`/orders/${orderId}/status`, { status: "Return Requested" });
      toast.success("Return request submitted successfully");
      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to request return");
    }
  };

  return (
    <div className="support-page" style={{backgroundColor: "#f9fafb", minHeight: "100vh"}}>
      <div className="support-container" style={{maxWidth: "800px", margin: "0 auto", padding: "40px 20px"}}>
        
        <div style={{display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px"}}>
          <button className="back-btn" onClick={() => navigate("/support")} style={{background: "none", border: "none", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", color: "#16a34a", fontWeight: "600"}}>
            ← Back to Support
          </button>
        </div>
        
        <h1 style={{fontSize: "32px", marginBottom: "10px", color: "#111827"}}>🔄 Returns & Refunds</h1>
        <p style={{color: "#6b7280", marginBottom: "40px"}}>Request returns for recently delivered orders.</p>

        {loading ? (
          <p>Loading eligible orders...</p>
        ) : (
          <>
            <h2 style={{fontSize: "22px", marginBottom: "20px", color: "#111827"}}>Eligible for Return</h2>
            {eligibleOrders.length === 0 ? (
              <div style={{background: "white", padding: "40px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "40px"}}>
                <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="No orders" style={{width: "80px", marginBottom: "15px", opacity: 0.5}} />
                <h3 style={{fontSize: "18px", color: "#374151"}}>No eligible orders found</h3>
                <p style={{color: "#6b7280", marginTop: "5px"}}>You don't have any recently delivered orders to return.</p>
              </div>
            ) : (
              <div style={{display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px"}}>
                {eligibleOrders.map(order => (
                  <div key={order._id} style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px"}}>
                    <div>
                      <h3 style={{fontSize: "18px", color: "#111827", marginBottom: "5px"}}>Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p style={{color: "#6b7280", fontSize: "14px", marginBottom: "10px"}}>
                        Delivered on {new Date(order.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <p style={{fontWeight: "600", color: "#111827"}}>Total: ₹{order.total}</p>
                    </div>
                    <div>
                       <button onClick={() => handleRequestReturn(order._id)} style={{background: "#ef4444", color: "white", padding: "10px 20px", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer"}}>
                         Request Return
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {returnRequestedOrders.length > 0 && (
              <>
                <h2 style={{fontSize: "22px", marginBottom: "20px", color: "#111827"}}>Return Requested</h2>
                <div style={{display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px"}}>
                  {returnRequestedOrders.map(order => (
                    <div key={order._id} style={{background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", opacity: 0.8}}>
                      <div>
                        <h3 style={{fontSize: "18px", color: "#111827", marginBottom: "5px"}}>Order #{order._id.slice(-6).toUpperCase()}</h3>
                        <p style={{fontWeight: "600", color: "#111827"}}>Total: ₹{order.total}</p>
                      </div>
                      <div>
                         <span style={{background: "#fef3c7", color: "#d97706", padding: "8px 16px", borderRadius: "20px", fontWeight: "600", fontSize: "14px"}}>
                           Processing Return
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Returns;
