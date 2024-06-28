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

const FDataTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState({});
  const [forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setForms(data.forms);
  }, [data.forms]);

  const handleDelete = async () => {
    if (!selectedForm) return;
    const { _id } = selectedForm;
    try {
      await axios.post(
        `http://localhost:8080/${localStorage.getItem("role")}/deleteform`,
        { Id: _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setForms(forms.filter((form) => form._id !== _id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
    closeDeleteModal();
  };

  const openDeleteModal = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedForm(null);
    setShowModal(false);
  };
  // useEffect(() => {
  //   console.log(showModal, selectedForm, forms);
  // }, []);
  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Panel className="card" header="Forms">
      <InputGroup inside style={{ marginBottom: 10, width: "30%" }}>
        <Input
          placeholder="Search by form name"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <InputGroup.Button>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Button>
      </InputGroup>
      <Table height={300} data={filteredForms} rowKey="_id">
        <Column flexGrow={1} minWidth={100}>
          <HeaderCell>Form</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={230}>
          <HeaderCell>Owner</HeaderCell>
          <Cell>{(rowData) => <span>{rowData.user}</span>}</Cell>
        </Column>

        <Column width={100}>
          <HeaderCell>Client Count</HeaderCell>
          <Cell>{(rowData) => <span>{rowData.client.length}</span>}</Cell>
        </Column>

        {localStorage.getItem("role") === "admin" && (
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
        )}
        {localStorage.getItem("role") === "user" && (
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
        )}
      </Table>

      <Modal open={showModal} onHide={closeDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user "
          {selectedForm ? selectedForm.name : ""}"?
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

export default FDataTable;
