import axios from "axios";

export const createCategory = async (token, form) => {
  return axios.post("https://clickbuy-api.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCategory = async (token, id) => {
  return axios.delete("https://clickbuy-api.vercel.app/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return axios.get("https://clickbuy-api.vercel.app/api/category", {});
};

export const updateCategory = async (token, id, categoryData) => {
  return axios.put(
    `https://clickbuy-api.vercel.app/api/category/${id}`,
    categoryData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createFilter = async (token, filterData) => {
  return axios.post("https://clickbuy-api.vercel.app/api/filter", filterData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFilter = async (token, filterId) => {
  return axios.delete(
    "https://clickbuy-api.vercel.app/api/filter/" + filterId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listFilters = async (categoryId) => {
  return axios.get(
    "https://clickbuy-api.vercel.app/api/filters?categoryId=" + categoryId
  );
};
