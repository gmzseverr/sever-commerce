import axios from "axios";

// Action Types
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
const SET_TOTAL = "SET_TOTAL";
const SET_FETCH_STATE = "SET_FETCH_STATE";
const SET_LIMIT = "SET_LIMIT";
const SET_OFFSET = "SET_OFFSET";
const SET_FILTER = "SET_FILTER";
const SET_BESTSELLERS = "SET_BESTSELLERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_SORT_OPTION = "SET_SORT_OPTION";

// Action Creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setBestsellers = (bestsellers) => ({
  type: SET_BESTSELLERS,
  payload: bestsellers,
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});

export const setSortOption = (sortOption) => ({
  type: SET_SORT_OPTION,
  payload: sortOption,
});

export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) {
    console.error("Product ID is missing");
    return;
  }

  dispatch(setFetchState("FETCHING"));

  const url = `https://workintech-fe-ecommerce.onrender.com/products/${productId}`;
  console.log("Fetching product from URL:", url);

  try {
    const response = await axios.get(url);
    dispatch({
      type: "SET_PRODUCT_DETAIL",
      payload: response.data,
    });
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    console.error("Failed to fetch product:", error);
    dispatch(setFetchState("ERROR"));
  }
};

export const fetchProducts =
  (
    limit = 10,
    offset = 0,
    filter = "",
    sortOption = "popularity",
    categoryId = ""
  ) =>
  async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    const url = `https://workintech-fe-ecommerce.onrender.com/products`;
    console.log("Fetching from URL:", url, {
      limit,
      offset,
      filter,
      sortOption,
      categoryId,
    });

    try {
      const response = await axios.get(url, {
        params: { limit, offset, filter, sortOption, categoryId },
      });

      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(setFetchState("ERROR"));
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://workintech-fe-ecommerce.onrender.com/categories"
    );
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // You might also want to dispatch an action to show an error message to the user.
  }
};