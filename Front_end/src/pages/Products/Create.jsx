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
    title: "",
    description: "",
    thumbnail: "logo.png",
    price: 0,
    stock: 0,
    discountPercentage: 0,
    status: "active",
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
      const { data } = await api.post("products/create", item);
      if (data.status === 200) {
        useMessage({
          type: "success",
          message: data.message,
        });
        navigate("/products");
      }
    } catch (error) {
      useMessage({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const backToProductList = () => {
    navigate("/products");
  };

  const validater = [
    {
      field: "title",
      validate: (value) => {
        if (value.length == "") return "This field is not empty";
        if (value.length < 5) return "Title is too short";
      },
    },
  ];

  return (
    <>
      <p className="text-3xl font-bold mb-4">Create Product</p>
      <Form data={formData} validater={validater} handleSubmit={submitForm}>
        <Input
          label={"Title"}
          name={"title"}
          value={formData.title}
          onChange={onHandleChange}
          required
        />
        <Input
          label={"Description"}
          name={"description"}
          value={formData.description}
          onChange={onHandleChange}
        />
        <Input
          label={"Price"}
          name={"price"}
          value={formData.price}
          onChange={onHandleChange}
        />
        <Input
          label={"Discount Percentage"}
          name={"discountPercentage"}
          value={formData.discountPercentage}
          onChange={onHandleChange}
        />
        <Input
          label={"Stock"}
          name={"stock"}
          value={formData.stock}
          onChange={onHandleChange}
        />
        <div>
          <label htmlFor="status">Status: </label>
          <select
            name="status"
            value={formData.status}
            onChange={onHandleChange}
            className="border-1 py-2 px-4 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-4">
          <Button color="primary" type="submit" icon="mynaui:plus-solid">
            Submit
          </Button>
          <Button
            type="button"
            icon="ion:caret-back"
            handleClick={backToProductList}
          >
            Back
          </Button>
        </div>
      </Form>
    </>
  );
}
