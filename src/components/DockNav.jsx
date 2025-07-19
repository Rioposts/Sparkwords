// A new version using only Vsc icons
import Dock from "./Dock";
import { 
  VscHome, 
  VscLightbulb, // A good icon for "Spark"
  VscComment,    // A good icon for "Vent"
  VscBeaker      // A good icon for "Reflect" or experiments
} from "react-icons/vsc";

export default function DockNav({ onNavigate }) {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => onNavigate("home") },
    { icon: <VscLightbulb size={18} />, label: "Spark", onClick: () => onNavigate("spark") },
    { icon: <VscComment size={18} />, label: "Vent", onClick: () => onNavigate("vent") },
    { icon: <VscBeaker size={18} />, label: "Reflect", onClick: () => onNavigate("reflect") },
  ];

  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}