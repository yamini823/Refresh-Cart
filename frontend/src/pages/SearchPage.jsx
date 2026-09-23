import "./SearchPage.css";


import Footer from "../components/Footer";

import { useEffect, useState } from "react";

import {
  useSearchParams
} from "react-router-dom";

import API from "../api/axios";

import ProductCard from "../components/ProductCard";

function SearchPage() {

  const [products, setProducts] =
    useState([]);

  const [filteredProducts,
    setFilteredProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [priceFilter,
    setPriceFilter] =
    useState("");

  const [brandFilter,
    setBrandFilter] =
    useState("");

  const [ratingFilter,
    setRatingFilter] =
    useState("");

  const [searchParams] =
    useSearchParams();

  const category =
    searchParams.get("category");

  const queryParam = searchParams.get("q") || "";

  // Sync url search query with local search input state
  useEffect(() => {
    setSearch(queryParam);
  }, [queryParam]);

  // FETCH PRODUCTS

  useEffect(() => {

    API.get("/products")

      .then((res) => {

        setProducts(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  // FILTER PRODUCTS

  useEffect(() => {

    let data = [...products];

    // CATEGORY

    if (
      category &&
      category !== "all"
    ) {

      data = data.filter(
        (item) =>
          item.category
            ?.toLowerCase()
            .includes(
              category.toLowerCase()
            )
      );

    }

    // SEARCH

    if (search) {

      data = data.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }

    // BRAND

    if (brandFilter) {

      data = data.filter(
        (item) =>
          item.brand ===
          brandFilter
      );

    }

    // RATING

    if (ratingFilter === "4") {

      data = data.filter(
        (item) =>
          item.rating >= 4
      );

    }

    if (ratingFilter === "3") {

      data = data.filter(
        (item) =>
          item.rating >= 3
      );

    }

    // PRICE

    if (
      priceFilter ===
      "lowToHigh"
    ) {

      data.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

    }

    if (
      priceFilter ===
      "highToLow"
    ) {

      data.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

    }

    setFilteredProducts(data);

  }, [
    products,
    category,
    search,
    priceFilter,
    brandFilter,
    ratingFilter
  ]);

  return (

    <div className="search-page">


      {/* TOP */}

      <div className="search-top">

        <div className="search-bar-row">

          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

          />

          <button>

            Search

          </button>

        </div>

        {/* FILTERS */}

        <div className="filter-row">

          <select
            onChange={(e) =>
              setPriceFilter(
                e.target.value
              )
            }
          >

            <option value="">
              Price
            </option>

            <option value="lowToHigh">
              Low to High
            </option>

            <option value="highToLow">
              High to Low
            </option>

          </select>

          <select
            onChange={(e) =>
              setBrandFilter(
                e.target.value
              )
            }
          >

            <option value="">
              Brand
            </option>

            <option value="Nature's Best">
              Nature's Best
            </option>

            <option value="Farm Fresh">
              Farm Fresh
            </option>

            <option value="Amul">
              Amul
            </option>

            <option value="Britannia">
              Britannia
            </option>

          </select>

          <select
            onChange={(e) =>
              setRatingFilter(
                e.target.value
              )
            }
          >

            <option value="">
              Rating
            </option>

            <option value="4">
              4+ Stars
            </option>

            <option value="3">
              3+ Stars
            </option>

          </select>

        </div>

      </div>

      {/* HEADING */}

      <div className="search-heading">

        <h1>

          {
            !category || category === "all"
              ? "All Products"
              : `${category} Products`
          }

        </h1>

        <p>

          Fresh groceries picked for you

        </p>

      </div>

      {/* PRODUCTS */}

      <div className="products-grid">

        {filteredProducts.map(
          (item) => (

            <ProductCard

              key={item._id}

              item={item}

            />

          )
        )}

      </div>

      {/* FOOTER */}

      <Footer />

    </div>

  );

}

export default SearchPage;