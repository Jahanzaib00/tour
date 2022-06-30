import React, { useState, useEffect } from "react";
const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    setLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch();
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const clickHandler = (id) => {
    const newData = data.filter((tour) => tour.id !== id);
    setData(newData);
  };
  if (loading) {
    return (
      <>
        <h1>Loading....</h1>
      </>
    );
  }
  if (data.length === 0) {
    return (
      <div className="text-center">
        <h1>No Tour Left</h1>
        <button className="btn btn-primary" onClick={getData}>
          Refresh
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center">Our Tours</h1>
      {data.map(({ id, image, info, name, price }) => {
        console.log(id);
        return (
          <div key={id}>
            <div className="card">
              <img className="card-img-top" src={image} alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  {name}
                  <span className="float-right" style={{ color: "red" }}>
                    Rs {price}
                  </span>
                </h5>
                <p className="card-text">{info}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => clickHandler(id)}
                >
                  Not interested
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
