import React, { useEffect, useState } from "react";
import "./Children.css";
import Add from "../../assets/images/add.png";
import AddChild from "../Modals/AddChild";
import useFetch from "../../hooks/UseFetch";
import { useSelector } from "react-redux";
import Logout from "../Auth/Logout";
import { Link } from "react-router-dom";

const Children = () => {
  const [addChild, setAddChild] = useState(false);
  const user = useSelector((state) => state.user);

  const children = useFetch(`/childrens/${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return (
    <div className="children_wrapper">
      {addChild && <AddChild setAddChild={setAddChild} />}
      <div className="children_records_box">
        <div className="crt_logout_wrap">
          <Logout isAdmin={false} />
        </div>
        <div className="chilren_records_topbar">
          <span onClick={() => setAddChild(true)}>
            <img src={Add} alt="" className="crt_add_icon" />{" "}
            <span>Add Child</span>
          </span>
        </div>
        <div className="children_records">
          <table className="children_records_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Add Money</th>
              </tr>
            </thead>

            <tbody>
              {children.response &&
                children.response.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.child_id}</td>
                      <td>{item.name}</td>
                      <td>{item.balance} SR</td>
                      <td>
                        <Link
                          to={`/checkout?balance=${item.balance}&&child_id=${item.child_id}`}
                        >
                          <img src={Add} alt="" className="crt_add_icon" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Children;
