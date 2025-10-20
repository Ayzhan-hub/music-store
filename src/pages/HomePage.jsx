import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePageBanner from "../components/HomePageBanner";
import HomeCategories from "../pages/HomeCategories";
import HomeAbout from "../pages/HomeAbout";
import HomeContacts from "../pages/HomeContacts";

function HomePage() {
  return (
    <>
      <Header />
      <HomePageBanner />
      <HomeCategories />
      <HomeAbout />
      <HomeContacts />
      <Footer />
    </>
  );
}

export default HomePage;
//CSS Modules
// shared
