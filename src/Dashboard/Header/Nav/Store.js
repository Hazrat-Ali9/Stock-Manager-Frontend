import React from "react";
import { FaStoreAlt } from "react-icons/fa";
function Store() {
  return (
    <div>
      <a href="/store">
        <FaStoreAlt
          color="black"
          size="2em"
          style={{ marginRight: "10px", marginTop: "3px" }}
        />
      </a>
    </div>
  );
}

export default Store;
