import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import { apiURL } from "./components/util/api";
// import Pagination from "./components/Pagination";
import Pagination from "react-bootstrap/Pagination";

function App() {
  //   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [sortType, setSortType] = useState("default");
  // const [page, setPage] = useState([]);
  const [error, setError] = useState("");

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  // handle previous
  const handlePrevios = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    Country();
  }, [page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(countries.length / 10);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 8;
      const skip = LIMIT * page; // 5 *2 = 10
      const dataskip = countries.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [countries]);

  const Country = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);
      if (!res.ok) throw new Error("Sonmething went wrong!");

      const data = await res.json();
      data.sort((a, b) => a.name.official.localeCompare(b.name.official));
      // Use sortedData here
      // console.log("===>",json);
      setCountries(data);

      setLoading(true);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any conutry");

      const data = await res.json();
      setCountries(data);

      setLoading(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container ">
          {/* search================================================================ */}
          <Search onSearch={getCountryByName} />

          {/*@ Product================================ */}
          <section className="product mt-3 ">
            <div className="text-center">
              <h2>REST COUNTRY</h2>
            </div>
            <div className="container ">
              {loading ? (
                loading
              ) : (
                <div className="justify-content-center my-2 d-flex">
                  <div className=" spinner-border " role="status">
                    <span className="visually-hidden text-center">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              {/* <p>Loading...</p> */}
              {/* <img src="http://localhost:3000/img/f3.jpg" alt="" /> */}
              <div className="row h-100 row-cols-2 row-cols-lg-4 g-2  g-lg-3  ">
                {/* {loading ? <Loading/> : <ShowProducts/>} */}

                {pageData.map((results) => (
                  <div key={results.name}>
                    <div className="col ">
                      <div className="p-3">
                        <div className="card">
                          {/* <Link to={`/card/${results.id}`} > */}
                          <div className="card-img">
                            <img
                              height={170}
                              src={results.flags.png}
                              class="card-img-top"
                              alt="..."
                            />
                          </div>
                          {/* </Link> */}
                          <div className="card-body">
                            <p className="text-center">
                              {results.name.official}
                            </p>
                            <p className="text-center">{results.cca2}</p>
                            <p className="text-center">{results.cca3}</p>
                            {/* <p className="text-center">{results.name.nativeName.zho.official}</p> */}
                            <p className="text-center text">
                              {results.altSpellings}
                            </p>
                            {/* <p className="text-center">{results.idd}</p> */}

                            <div className="d-flex justify-content-between">
                              {/* <p >
                                                <ShoppingCartIcon onClick={handleOrder} className="icon"/>
                                            </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Product id={results.id} title={results.attributes.title} img={results.attributes.img} price={results.attributes.price} /> */}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/*@ End Product================================ */}

          <div className="pagination">
            <Pagination>
              <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
              {Array(pageCount)
                .fill(null)
                .map((ele, index) => {
                  return (
                    <>
                      <Pagination.Item
                        active={page === index + 1 ? true : false}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    </>
                  );
                })}
              <Pagination.Next
                onClick={handleNext}
                disabled={page === pageCount}
              />
            </Pagination>
          </div>
        </div>



        <Routes>{/* <Route path="/" element={<App />} /> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
