function NotificationList() {

  const notifications = [
    "John liked your post",
    "Sarah commented on your blog",
    "David followed you"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold text-xl mb-4">
        Notifications
      </h2>

      {notifications.map((item, index) => (
        <div
          key={index}
          className="border-b py-3"
        >
          {item}
        </div>
      ))}

    </div>
  );
}

export default NotificationList;