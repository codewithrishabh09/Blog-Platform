import { Bell } from "lucide-react";

function NotificationBell() {
  return (
    <div className="relative cursor-pointer">

      <Bell size={24} />

      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
        5
      </span>

    </div>
  );
}

export default NotificationBell;