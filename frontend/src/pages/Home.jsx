


import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import Deals from "../components/Deals";
import Footer from "../components/Footer";


function Home() {
  return (
    <div>
  
      <Hero />
      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8f9fa' }}>
      
      </div>
      <Features />
      <Categories />
      <Deals />
      <Footer />
    </div>
  );
}

export default Home;
