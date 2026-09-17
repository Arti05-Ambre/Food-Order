
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = (url) => {
  
  const [list, setList] = useState([]);

  // Fetch food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Remove food
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        {
          id: foodId,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Refresh list after deleting
        await fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Fetch list when component loads
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">

        {/* Table Header */}
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Food List */}
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">

              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
              />

              <p>{item.name}</p>

              <p>{item.category}</p>

              <p>${item.price}</p>

              <p
                onClick={() => removeFood(item._id)}
                className="Cursor"
              >
                X
              </p>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default List;

