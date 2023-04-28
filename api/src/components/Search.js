import React, { useState } from "react";
import "../App.css";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <section className=" mt-5">
      <div className="serach row m-auto">
        <div className="col-4 ">
          <form onSubmit={onSubmitHandler}>
            <div class="input-group">
              <input
                type="text"
                className="form-control"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search country..."
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Search;
