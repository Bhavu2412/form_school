import React, { useEffect, useState } from "react";
import { Row, Col, Panel } from "rsuite";
import pv from "../images/charts/pv.svg";
import uv from "../images/charts/uv.svg";
import vv from "../images/charts/vv.svg";
import PieChart from "./PieChart";
import DataTable from "./UserDataTable";
import FDataTable from "./FormDataTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({
    forms: [],
    uniqueClientsCount: 0,
    users: [],
    clients: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
        const role = localStorage.getItem("role");
        if (role === "admin") {
          response = await axios.post(
            `${process.env.REACT_APP_URL_HOST}/admin/analyse`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else if (role === "user") {
          response = await axios.post(
            `${process.env.REACT_APP_URL_HOST}/user/analyse`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else if (role === "client") {
          response = await axios.post(
            `${process.env.REACT_APP_URL_HOST}/client/analyse`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          alert("No user found");
          return;
        }
        setData(response.data);
      } catch (err) {
        navigate("/login");
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <>
      <Row
        gutter={30}
        className="dashboard-header mt-5 flex flex-wrap items-center justify-center"
      >
        <Col xs={24} sm={8} className="mb-4 sm:mb-0">
          <Panel className="trend-box bg-blue-100">
            <img className="chart-img" src={pv} alt="PV" />
            <div className="title">Users</div>
            <div className="value">
              {localStorage.getItem("role") === "admin"
                ? data.users.length
                : localStorage.getItem("role") === "user"
                ? 1
                : localStorage.getItem("role") === "client"
                ? 0
                : 0}
            </div>
          </Panel>
        </Col>
        <Col xs={24} sm={8} className="mb-4 sm:mb-0">
          <Panel className="trend-box bg-green-100">
            <img className="chart-img" src={vv} alt="VV" />
            <div className="title">Client</div>
            <div className="value">
              {localStorage.getItem("role") === "admin" ||
              localStorage.getItem("role") === "user"
                ? data.uniqueClientsCount
                : localStorage.getItem("role") === "client"
                ? 1
                : 0}
            </div>
          </Panel>
        </Col>
        <Col xs={24} sm={8}>
          <Panel className="trend-box bg-red-100">
            <img className="chart-img" src={uv} alt="uv" />
            <div className="title">Forms</div>
            <div className="value">{data.forms.length}</div>
          </Panel>
        </Col>
      </Row>

      <Row gutter={30} className="mt-4">
        <Col xs={24} md={16}>
          <FDataTable data={data} />
        </Col>
        <Col xs={24} md={8} className="mt-4 md:mt-0">
          {(localStorage.getItem("role") === "user" ||
            localStorage.getItem("role") === "admin") && (
            <PieChart
              title="Form v/s Client"
              data={[data.forms.length, data.uniqueClientsCount]}
              type="donut"
              labels={["Form", "Client"]}
            />
          )}
        </Col>
      </Row>

      <Row gutter={30} className="mt-4">
        <Col xs={24} md={16}>
          {localStorage.getItem("role") === "admin" && (
            <DataTable data={data} />
          )}
        </Col>
        <Col xs={24} md={8} className="mt-4 md:mt-0">
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
