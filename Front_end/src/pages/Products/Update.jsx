import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMessageProvider } from "../../components/common/Message/Provider";
import api from "../../configs/axios";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";

export default function Update() {
  const { useMessage } = useMessageProvider();
  const { id: productId } = useParams();
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
  const [isLoading, setIsLoading] = useState(false);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    handleEditProduct(formData);
  };

  const handleEditProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.patch(
        `products/update/${productId}`,
        formData
      );

      if (data.status === 200) {
        useMessage({
          type: "success",
          message: data.message,
        });
        setIsLoading(false);
        navigate("/products");
      }
    } catch (error) {
      setIsLoading(false);
      useMessage({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const getDetailProduct = async () => {
    const { data } = await api.get(`products/${productId}`);
    setFormData(data.data);
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
    {
      field: "price",
      validate: (value) => {
        if (value < 0) return "Price is greater than 0";
      },
    },
    {
      field: "discountPercentage",
      validate: (value) => {
        if (value < 0) return "Discount is greater than 0";
        if (value > 100) return "Discount is less than 100%";
      },
    },
    {
      field: "stock",
      validate: (value) => {
        if (value < 0) return "Stock is greater than 0";
      },
    },
  ];

  useEffect(() => {
    getDetailProduct();
  }, []);

  return (
    <>
      <p className="text-3xl font-bold mb-3">Edit Product</p>
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
          required
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
          <Button
            color="primary"
            type="submit"
            icon={isLoading ? "line-md:loading-loop" : "fluent:edit-20-filled"}
          >
            {!isLoading ? "Submit" : "Submitting..."}
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
