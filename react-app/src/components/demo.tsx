import GooeyDock from "@/components/ui/gooey-dock";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Search,
  Users,
  Calendar,
  Compass,
  ShoppingCart,
} from "lucide-react"

export default function DemoOne() {
  const navigate = useNavigate();

  const dockItems = [
    { icon: Search, label: "Search", onClick: () => navigate("/search") },
    { icon: Home, label: "Home", onClick: () => navigate("/") },
    { icon: Users, label: "Group Trips", onClick: () => navigate("/group-trips") },
    { icon: Compass, label: "Weekend Trips", onClick: () => navigate("/weekend-trips") },
    { icon: Calendar, label: "Upcoming Trips", onClick: () => navigate("/upcoming-trips") },
    { icon: ShoppingCart, label: "Cart / Booking", onClick: () => alert("Cart Page clicked (React Route in progress)") },
  ]

  return <GooeyDock items={dockItems} />
}
