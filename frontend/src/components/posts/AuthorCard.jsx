function AuthorCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <img
        src="https://i.pravatar.cc/150"
        alt=""
        className="w-20 h-20 rounded-full mb-4"
      />

      <h3 className="font-bold">
        Rishabh Dwivedi
      </h3>

      <p className="text-gray-500">
        Full Stack Developer
      </p>

    </div>
  );
}

export default AuthorCard;