import React, { useState, useEffect } from "react";
import {
  Table,
  Panel,
  Button,
  Modal,
  ButtonToolbar,
  IconButton,
  Placeholder,
  Input,
  InputGroup,
} from "rsuite";
import { faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const { Column, HeaderCell, Cell } = Table;

const DataTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setUsers(data.users);
  }, [data.users]);

  const handleDelete = async () => {
    // console.log("delete handled", selectedUser.name);
    if (!selectedUser) return;
    const { _id } = selectedUser;
    try {
      await axios.post(
        "http://localhost:8080/admin/deleteuser",
        { userId: _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("User deleted successfully.");
      setUsers(users.filter((user) => user._id !== _id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
    closeDeleteModal();
  };

  const openDeleteModal = (user) => {
    // console.log("openDeleteModal", user);
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };
  // useEffect(() => {
  //   console.log(showModal, selectedUser, users);
  // }, []);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Panel className="card" header="User">
      <InputGroup
        inside
        style={{
          marginBottom: 10,
          width: "30%",
        }}
      >
        <Input
          placeholder="Search by user name"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <InputGroup.Button>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Button>
      </InputGroup>
      <Table height={300} data={filteredUsers} rowKey="_id">
        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>User</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={130}>
          <HeaderCell>Form Count</HeaderCell>
          <Cell>{(rowData) => <span>{rowData.form.length}</span>}</Cell>
        </Column>

        <Column width={100}>
          <HeaderCell>Client Count</HeaderCell>
          <Cell>{(rowData) => <span>{rowData.client.length}</span>}</Cell>
        </Column>

        <Column width={100}>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {(rowData) => (
              <IconButton
                icon={<FontAwesomeIcon icon={faTrashAlt} />}
                appearance="primary"
                size="xs"
                onClick={() => openDeleteModal(rowData)}
                className="ml-2"
              />
            )}
          </Cell>
        </Column>
      </Table>

      <Modal open={showModal} onHide={closeDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user "
          {selectedUser ? selectedUser.name : ""}"?
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              appearance="primary"
              onClick={handleDelete}
              className="m-2 flex items-center justify-center"
            >
              Delete
            </Button>
            <Button
              appearance="default"
              onClick={closeDeleteModal}
              className="m-2 flex items-center justify-center"
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    </Panel>
  );
};

export default DataTable;
