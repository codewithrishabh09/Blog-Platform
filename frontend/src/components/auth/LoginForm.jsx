import { useState } from "react";

function LoginForm() {

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
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-xl shadow"
    >
      <h2 className="text-3xl font-bold mb-6">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 w-full mb-4"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-4"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded w-full">
        Login
      </button>
    </form>
  );
}

export default LoginForm;