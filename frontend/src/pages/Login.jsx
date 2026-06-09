import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold mb-5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white p-3 w-full rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;