import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  const deleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Name of categories</h2>

          {
            categories.map((category, index) => {
              return(
                <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left" key={index}>{category.name}</h3>
            </div>
            
            <div className="col-4">
              <button onClick={() => {
                deleteThisCategory(category._id)
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
              )
            })
          }
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
