import { useState } from "react";

function RegisterForm() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const submit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-xl shadow"
    >
      <h2 className="text-3xl font-bold mb-6">
        Register
      </h2>

      <input
        type="text"
        placeholder="Username"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 w-full mb-4"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded w-full">
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;