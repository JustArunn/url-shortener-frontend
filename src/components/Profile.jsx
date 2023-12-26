import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const BASE_URL = "http://localhost:4000/";
  const [url, setUrl] = useState("");
  const [userURls, setUserURls] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchURL = async () => {
      const FETCH_URLS_API = `${BASE_URL}url/v1/getUrls`;
      await fetch(FETCH_URLS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(async (res) => await res.json())
        .then((urls) => setUserURls(urls.urls));
    };
    fetchURL();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CREATE_URL_API = `${BASE_URL}url/createUrl`;
    await fetch(CREATE_URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            placeholder="Past long URL here..."
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO</button>
        </form>
      </div>
      <div>
        {userURls ? (
          userURls.map((url) => (
            <li key={url._id}>
              <Link to={`${BASE_URL}url/${url.shortId}`}>
                {BASE_URL}url/{url.shortId}
              </Link>{" "}
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
