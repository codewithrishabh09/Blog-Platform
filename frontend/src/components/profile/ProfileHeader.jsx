function ProfileHeader() {
  return (
    <div className="bg-white rounded-xl shadow p-8">

      <div className="flex items-center gap-6">

        <img
          src="https://i.pravatar.cc/150"
          alt=""
          className="w-24 h-24 rounded-full"
        />

        <div>

          <h1 className="text-3xl font-bold">
            Rishabh Dwivedi
          </h1>

          <p className="text-gray-500">
            Full Stack Developer
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;