import { useState } from "react";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import ShameRecap from "./components/ShameRecap";
import { fetchShameData } from "./services/api";
import type { ShameResponse } from "./types";

type AppState = "idle" | "loading" | "success" | "error";

function App() {
  const [state, setState] = useState<AppState>("idle");
  const [shameData, setShameData] = useState<ShameResponse | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (steamId: string) => {
    setState("loading");
    setError("");

    try {
      const data = await fetchShameData(steamId);
      setShameData(data);
      setState("success");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setState("error");

      // Return to idle after 3 seconds
      setTimeout(() => {
        setState("idle");
      }, 3000);
    }
  };

  const handleReset = () => {
    setState("idle");
    setShameData(null);
    setError("");
  };

  // State-based rendering
  if (state === "idle" || state === "error") {
    return (
      <>
        <Landing onSearch={handleSearch} />
        {state === "error" && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white px-8 py-4 rounded-lg shadow-lg z-50 border border-red-400">
            <p className="font-bold">❌ {error}</p>
          </div>
        )}
      </>
    );
  }

  if (state === "loading") {
    return <Loading />;
  }

  if (state === "success" && shameData) {
    return <ShameRecap data={shameData} onReset={handleReset} />;
  }

  return null;
}

export default App;
