import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../LoginView.css";
import { foundItemList } from "../../Services/ItemService";

const FoundItemReport = () => {
  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  const showAllFoundItems = () => {
    foundItemList().then((response) => {
      setItemList(response.data);
    });
  };

  useEffect(() => {
    showAllFoundItems();
  }, []);

  const returnBack = () => {
    navigate("/AdminMenu");
  };

  return (
    <div className="text-center">
      <h2 className="text-center">Found Item List</h2>
      <hr
        style={{
          height: "3px",
          borderWidth: 0,
          color: "yellow",
          backgroundColor: "red",
        }}
      />
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Found Date</th>
              <th>EntryDate</th>
              <th>User Id</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => (
              <tr key={item.itemId}>
                <td>{item.itemId}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.foundDate}</td>
                <td>{item.entryDate}</td>
                <td>{item.username}</td>
                <td>{item.userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button
          style={{ marginLeft: "10px" }}
          onClick={returnBack}
          className="btn btn-success"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default FoundItemReport;
