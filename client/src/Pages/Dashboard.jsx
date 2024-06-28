import React, { useEffect } from "react";
import { Row, Col, Panel, ButtonGroup, Button } from "rsuite";
import pv from "../images/charts/pv.svg";
import uv from "../images/charts/uv.svg";
import vv from "../images/charts/vv.svg";
import PieChart from "./PieChart";
import DataTable from "./UserDataTable";
import FDataTable from "./FormDataTable";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    forms: [],
    uniqueClientsCount: 0,
    users: [],
    clients: [],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem("role") === "admin") {
          const response = await axios.post(
            "http://localhost:8080/admin/analyse",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setData(response.data);
        } else if (localStorage.getItem("role") === "user") {
          const response = await axios.post(
            "http://localhost:8080/user/analyse",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setData(response.data);
        } else if (localStorage.getItem("role") === "client") {
          const response = await axios.post(
            "http://localhost:8080/client/analyse",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(response);
          setData(response.data);
        }
      } catch (err) {
        console.log("Error: " + err.response.data.message);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Row
        gutter={30}
        className="dashboard-header mt-5 flex items-center justify-center"
      >
        <Col xs={7}>
          <Panel className="trend-box bg-blue-100">
            <img className="chart-img" src={pv} />
            <div className="title">Users</div>
            {localStorage.getItem("role") === "admin" && (
              <div className="value">{data.users.length}</div>
            )}
            {localStorage.getItem("role") === "user" && (
              <div className="value">1</div>
            )}
            {localStorage.getItem("role") === "client" && (
              <div className="value">0</div>
            )}
          </Panel>
        </Col>
        <Col xs={7}>
          <Panel className="trend-box bg-green-100">
            <img className="chart-img" src={vv} />
            <div className="title">Client</div>
            {localStorage.getItem("role") === "admin" && (
              <div className="value">{data.forms.length}</div>
            )}
            {localStorage.getItem("role") === "user" && (
              <div className="value">0</div>
            )}
            {localStorage.getItem("role") === "client" && (
              <div className="value">1</div>
            )}
          </Panel>
        </Col>
        <Col xs={7}>
          <Panel className="trend-box bg-red-100">
            <img className="chart-img" src={uv} />
            <div className="title">Forms</div>
            <div className="value">{data.forms.length}</div>
          </Panel>
        </Col>
      </Row>

      <Row gutter={30}>
        <Col xs={16}>
          <FDataTable data={data} />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Form v/s Client"
            data={[data.forms.length, data.uniqueClientsCount]}
            type="donut"
            labels={["Form", "Client"]}
          />
        </Col>
      </Row>
      <Row gutter={30}>
        <Col xs={16}>
          {localStorage.getItem("role") === "admin" && (
            <DataTable data={data} />
          )}
        </Col>
        <Col xs={8}>
          {localStorage.getItem("role") === "admin" && (
            <PieChart
              title="User v/s Client"
              data={[data.users.length, data.uniqueClientsCount]}
              type="pie"
              labels={["User", "Client"]}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
