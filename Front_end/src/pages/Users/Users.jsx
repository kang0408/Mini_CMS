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
  const [userList, setUserList] = useState();
  const [pageCurrent, setPageCurrent] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [pageTotal, setPageTotal] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortValue, setSortValue] = useState("DESC");
  const [deletedId, setDeletedId] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  const fetchUsers = async (search = searchString) => {
    try {
      setLoading(false);
      const { data } = await api.get(
        `users?page=${pageCurrent}&limit=${itemPerPage}&search=${search}&sortBy=${sortBy}&sortValue=${sortValue}`
      );

      if (data.status === 200) {
        setLoading(true);

        useMessage({
          type: "success",
          message: data.message,
        });

        setUserList(data.data.users);
        setPageCurrent(data.data.page);
        setItemPerPage(data.data.limit);
        setPageTotal(data.data.pageTotal);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id = deletedId) => {
    try {
      const { data } = await api.delete(`/users/delete/${id}`);

      if (data.status === 200) {
        useMessage({
          type: "success",
          message: data.message,
        });
        fetchUsers();
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
    fetchUsers();
  };

  const handleReset = () => {
    setSearchString("");
    fetchUsers("");
  };

  const handleToggleModal = (user) => {
    console.log(user._id);
    setDeletedId(user._id);
    setToggleModal(!toggleModal);
  };

  const navigateToEditPage = (item) => {
    navigate(`/users/edit/${item._id}`);
  };

  useEffect(() => {
    fetchUsers();
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
          onClick={() => navigate("/users/create")}
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
              <option value="username">Username</option>
              <option value="email">Email</option>
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
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            userList.map((user) => {
              return (
                <tr key={user.id} className="text-center odd:bg-gray-200 h-20">
                  <td className="name">{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${
                        user.role == "user" ? "bg-green-500" : "bg-red-400"
                      } px-4 py-1 rounded-3xl text-white`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        color="primary"
                        handleClick={() => navigateToEditPage(user)}
                        icon="fluent:edit-20-filled"
                      >
                        Edit
                      </Button>
                      <Button
                        icon="material-symbols:delete-rounded"
                        onClick={() => handleToggleModal(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : !userList || userList.length == 0 ? (
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
        title="Are you want to delete this user?"
        content="Be careful! This action can't not roll back"
        modal={toggleModal}
        toggleModal={() => setToggleModal(!toggleModal)}
        onConfirm={() => handleDeleteUser(deletedId)}
      />
    </>
  );
}
