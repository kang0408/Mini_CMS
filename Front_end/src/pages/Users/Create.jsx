import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMessageProvider } from "../../components/common/Message/Provider";
import api from "../../configs/axios";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";

export default function Create() {
  const { useMessage } = useMessageProvider();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    handleAddProduct(formData);
  };

  const handleAddProduct = async (item) => {
    try {
      const { data } = await api.post("users/create", item);
      if (data.status === 200) {
        useMessage({
          type: "success",
          message: data.message,
        });
        navigate("/users");
      }
    } catch (error) {
      useMessage({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const backToUserList = () => {
    navigate("/users");
  };

  const validater = [
    {
      field: "username",
      validate: (value) => {
        if (value.length == "") return "Username is not empty";
        if (value.length < 5) return "Username is too short";
        if (value.length > 20) return "Username is too long";
      },
    },
    {
      field: "email",
      validate: (value) => {
        if (value.length == "") return "Email is not empty";
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value))
          return "Invalid email format";
      },
    },
  ];

  return (
    <>
      <p className="text-3xl font-bold mb-4">Create Product</p>
      <Form data={formData} validater={validater} handleSubmit={submitForm}>
        <Input
          label={"Username"}
          name={"username"}
          value={formData.username}
          onChange={onHandleChange}
          required
        />
        <Input
          label={"Email"}
          name={"email"}
          value={formData.email}
          onChange={onHandleChange}
          required
        />
        <div>
          <label htmlFor="rol">Role: </label>
          <select
            name="role"
            value={formData.role}
            onChange={onHandleChange}
            className="border-1 py-2 px-4 rounded-md"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex gap-4">
          <Button color="primary" type="submit" icon="mynaui:plus-solid">
            Submit
          </Button>
          <Button
            type="button"
            icon="ion:caret-back"
            handleClick={backToUserList}
          >
            Back
          </Button>
        </div>
      </Form>
    </>
  );
}
