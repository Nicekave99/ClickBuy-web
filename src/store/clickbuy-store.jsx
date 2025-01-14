import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import _ from "lodash";
import { toast } from "react-toastify";

const ClickbuyStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  filters: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  getFilters: async (categoryId) => {
    try {
      const res = await axios.get(
        `https://clickbuy-api.vercel.app/api/filters?categoryId=${categoryId}`
      );
      set({ filters: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  updateProductFilter: async (productId, filterId) => {
    try {
      const res = await axios.put(
        `https://clickbuy-api.vercel.app/api/product/filter`,
        {
          productId,
          filterId,
        }
      );
      toast.success("Product filter updated successfully");
      return res.data;
    } catch (err) {
      toast.error("Error updating product filter");
      console.log(err);
    }
  },

  actionADTCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // Step Unique
    const uniqe = _.unionWith(updateCart, _.isEqual);
    toast.success("เพิ่มสินค้าลงตะกร้าเรียบร้อย !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    set({
      carts: uniqe,
    });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    toast.error("ลบสินค้าเรียบร้อย !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post(
      "https://clickbuy-api.vercel.app/api/login",
      form
    );
    set({
      user: res.data.Payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "clickbuy-store",
  Storage: createJSONStorage(() => localStorage),
};

const useClickbuyStore = create(persist(ClickbuyStore, usePersist));

export default useClickbuyStore;
