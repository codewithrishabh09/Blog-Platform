import Navbar from "../components/navbar/Navbar";
import AIGenerator from "../components/ai/AIGenerator";

function AIStudio() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-10">

        <AIGenerator />

      </div>
    </>
  );
}

export default AIStudio;