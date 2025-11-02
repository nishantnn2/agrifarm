import Navbar from '../components/Navbar';
import FarmerRegistration from '../components/FarmerRegistration';
import Footer from '../components/Footer';

const FarmerRegistrationPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/farm-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24 pb-12">
          <FarmerRegistration />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FarmerRegistrationPage;

