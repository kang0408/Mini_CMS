import { useState } from "react";

import Form from "../components/common/Form";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validater = [
    {
      field: "email",
      validate: (value) => {
        if (value.length == "") return "Email is not empty";
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value))
          return "Invalid email format";
      },
    },
    {
      field: "password",
      validate: (value) => {
        if (value == 0) return "Password is not empty";
        if (!/^(?=.*[0-9])(?=.*[A-Za-z])\S{8,}$/.test(value))
          return "Password must be at least 8 characters long and contain both letters and numbers";
      },
    },
  ];

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    console.log(formData);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-white p-6 rounded-lg w-96 shadow-xl">
      <p className="font-bold text-5xl mb-4">
        Admin<span className="text-primary-500">.</span>
      </p>
      <Form data={formData} validater={validater} handleSubmit={submitForm}>
        <Input
          label={"Email"}
          name={"email"}
          value={formData.email}
          onChange={onHandleChange}
          required
        />
        <Input
          label={"Password"}
          name={"password"}
          value={formData.password}
          onChange={onHandleChange}
          type="password"
          required
        />
        <div className="action">
          <Button
            color="primary"
            type="submit"
            icon="material-symbols:login-rounded"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
