import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMessageProvider } from "../../components/common/Message/Provider.jsx";
import api from "../../configs/axios.js";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Modal from "../../components/common/Modal.jsx";

export default function ProductList() {
  const navigate = useNavigate();
  const { useMessage } = useMessageProvider();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageTotal, setPageTotal] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortValue, setSortValue] = useState("DESC");
  const [deletedId, setDeletedId] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  const fetchProducts = async (search = searchString) => {
    try {
      setLoading(false);
      const { data } = await api.get(
        `products?page=${pageCurrent}&limit=${itemPerPage}&search=${search}&sortBy=${sortBy}&sortValue=${sortValue}`
      );

      if (data.status === 200) {
        setLoading(true);

        useMessage({
          type: "success",
          message: data.message,
        });

        setProductList(data.data.products);
        setPageCurrent(data.data.page);
        setItemPerPage(data.data.limit);
        setPageTotal(data.data.pageTotal);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id = deletedId) => {
    try {
      console.log(deletedId);
      const { data } = await api.delete(`/products/delete/${id}`);

      if (data.status === 200) {
        useMessage({
          type: "success",
          message: data.message,
        });
        fetchProducts();
        setToggleModal(!toggleModal);
      }
    } catch (error) {
      useMessage({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const onHandleChange = (e) => {
    setSearchString(e.target.value);
  };

  const onHandleSelectSortBy = (e) => {
    console.log(e.target);
    setSortBy(e.target.value);
  };

  const onHandleSelectSortValue = (e) => {
    setSortValue(e.target.value);
  };

  const onHandleKeyDown = (e) => {
    if (e.key == "Enter") handleSearch();
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleReset = () => {
    setSearchString("");
    fetchProducts("");
  };

  const handleToggleModal = (product) => {
    console.log(product._id);
    setDeletedId(product._id);
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    fetchProducts();
  }, [pageCurrent, sortBy, sortValue]);

  return (
    <>
      <div className="flex items-centers gap-2">
        <div className="flex-1">
          <Input
            name="search"
            value={searchString}
            onChange={onHandleChange}
            onKeyDown={onHandleKeyDown}
          />
        </div>
        <Button
          onClick={handleSearch}
          color="primary"
          icon="material-symbols:search-rounded"
        >
          Search
        </Button>
        <Button onClick={handleReset} icon="grommet-icons:power-reset" />
      </div>
      <div className="my-8 flex justify-between">
        <Button
          color="primary"
          icon="mynaui:plus-solid"
          onClick={() => navigate("/products/create")}
        >
          Create
        </Button>
        <div className="flex gap-4">
          <div>
            <span>Sort by: </span>
            <select
              name="sortBy"
              id="sortBy"
              className="border-1 py-2 px-4 rounded-md"
              onChange={onHandleSelectSortBy}
            >
              <option value="updatedAt" selected>
                Time
              </option>
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="discountPercentage">Discount</option>
              <option value="stock">Stock</option>
            </select>
          </div>
          <div>
            <span>Sort value: </span>
            <select
              name="sortValue"
              id="sortValue"
              className="border-1 py-2 px-4 rounded-md"
              onChange={onHandleSelectSortValue}
            >
              <option value="ASC">Increasing</option>
              <option value="DESC" selected>
                Decreasing
              </option>
            </select>
          </div>
        </div>
      </div>

      <table className="w-full">
        <thead className="border-b-1 border-gray">
          <tr>
            <th className="p-4">Thumbnail</th>
            <th className="p-4">Title</th>
            <th className="p-4">Price</th>
            <th className="p-4">Discount</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            productList.map((product) => {
              return (
                <tr key={product.id} className="text-center odd:bg-gray-200">
                  <td>
                    <div className="flex items-center justify-center">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-24 h-24"
                      />
                    </div>
                  </td>
                  <td className="name">{product.title}</td>
                  <td>{product.price}$</td>
                  <td>{product.discountPercentage}%</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`${
                        product.status == "active"
                          ? "bg-green-500"
                          : "bg-red-400"
                      } px-4 py-1 rounded-3xl text-white`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        color="primary"
                        handleClick={() => navigateToEditPage(product)}
                        icon="fluent:edit-20-filled"
                      >
                        Edit
                      </Button>
                      <Button
                        icon="material-symbols:delete-rounded"
                        onClick={() => handleToggleModal(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : !productList || productList.length == 0 ? (
            <tr>
              <td colSpan={7} className="py-12">
                <p style={{ textAlign: "center" }}>No data...</p>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={7} className="py-12">
                <p style={{ textAlign: "center" }}>Loading...</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-8 flex justify-end">
        <Pagination
          pageTotal={pageTotal}
          pageCurrent={pageCurrent}
          setPageCurrent={setPageCurrent}
        />
      </div>
      <Modal
        title="Are you want to delete this product?"
        content="Be careful! This action can't not roll back"
        modal={toggleModal}
        toggleModal={() => setToggleModal(!toggleModal)}
        onConfirm={() => handleDeleteProduct(deletedId)}
      />
    </>
  );
}
