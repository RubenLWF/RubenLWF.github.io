import InfoBox from "./components/InfoBox/InfoBox";
import TechStack from "./components/TechStack/TechStack";

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <InfoBox />
      <TechStack />
    </main>
  );
}
