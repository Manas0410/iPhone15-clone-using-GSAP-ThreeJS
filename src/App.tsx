import Hero from "./Components/Hero";
import Highlight from "./Components/Highlight";
import Model from "./Components/Model";
import Navbar from "./Components/navbar";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlight />
      <Model />
    </main>
  );
}

export default App;
