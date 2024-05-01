import Hero from "./Components/Hero";
import Highlight from "./Components/Highlight";
import Navbar from "./Components/navbar";

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
