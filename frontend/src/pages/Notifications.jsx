import Navbar from "../components/navbar/Navbar";
import NotificationList from "../components/notifications/NotificationList";

function Notifications() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-10">
        <NotificationList />
      </div>
    </>
  );
}

export default Notifications;