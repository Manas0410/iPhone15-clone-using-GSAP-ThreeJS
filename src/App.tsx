import Hero from "./Components/HeroSection/Hero";
import Highlight from "./Components/Highlights/Highlight";
import Navbar from "./Components/Navbar/navbar";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlight />
    </main>
  );
}

export default App;
