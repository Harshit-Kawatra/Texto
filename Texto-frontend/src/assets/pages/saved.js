import React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
const Saved = (props) => {
  const { savedtext, deleteobj } = props;
  console.log(props);
  return (
    <div className="container p-2">
      {/* rendering savedtext */}
      {savedtext.length ? (
        <h2 className="m-2">Notes</h2>
      ) : (
        <h2 className="m-2">No Saved Text</h2>
      )}
      <div class="d-flex flex-wrap justify-content-around">
        {savedtext.map((item, index) => {
          console.log(item.text);
          return (
            <div class="card m-2" style={{ width: "18rem" }} key={index}>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">NOTE</h5>
                <p style={{ whiteSpace: "pre-wrap" }} class="card-text">
                  <ReactReadMoreReadLess
                    charLimit={200}
                    readMoreText={" Read more ▼"}
                    readLessText={" Read less ▲"}
                  >
                    {`${item.text}`}
                  </ReactReadMoreReadLess>
                </p>
                <button
                  type="button"
                  class="btn btn-outline-danger mt-auto align-self-start"
                  onClick={() => deleteobj(index)}
                >
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
                <p
                  className="text-secondary mb-0 font-italic align-self-end"
                  style={{ fontSize: "0.8em" }}
                >
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Saved;
