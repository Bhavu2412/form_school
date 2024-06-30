import { Divider, Button, Avatar } from "rsuite";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_HOST}/${localStorage.getItem(
          "role"
        )}/remove`
      );
      alert(response.data.message);
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <div>
        <div className="bg-gray-200 flex flex-col sm:flex-row items-center justify-center p-5 space-y-5 sm:space-x-10">
          <div className="bg-white flex rounded-xl h-68">
            {localStorage.getItem("image") ? (
              <img
                src={localStorage.getItem("image")}
                alt="profile"
                className="rounded-xl h-64"
              />
            ) : (
              <Avatar size="xxl" />
            )}
          </div>
          <div className="bg-white flex flex-col w-64 p-2 rounded-lg">
            <div className="flex flex-col items-start">
              <h2 className="font-Link">{localStorage.getItem("name")}</h2>
              <p className="font-hTags">Profession</p>
            </div>
            <Divider />
            <div className="font-General">
              <label className="flex flex-row items-center justify-between">
                <p>Role</p>
                <p>{localStorage.getItem("role")}</p>
              </label>
              <label className="flex flex-row items-center justify-between">
                <p>Email</p>
                <p>{localStorage.getItem("email")}</p>
              </label>
              <label className="flex flex-row items-center justify-between">
                <p>Status</p>
                <p>Active</p>
              </label>
              <label className="flex flex-row items-center justify-between mt-5">
                <Button color="red" appearance="primary" onClick={handleLogout}>
                  Logout
                </Button>

                <Button color="red" appearance="primary" onClick={handleDelete}>
                  Delete Acc
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
