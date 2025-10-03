import axios from "axios";
const ITEM_URL = "http://localhost:9999/lost-found/item";
const ITEMID_URL = "http://localhost:9999/lost-found/id-gen";
const LOST_URL = "http://localhost:9999/lost-found/not-found";
const FOUND_URL = "http://localhost:9999/lost-found/found";
const LOSTBYUSER_URL = "http://localhost:9999/lost-found/lost";
const LOSTFOUND_URL = "http://localhost:9999/lost-found/lostFound";

export const getAllItems = () => {
  return axios.get(ITEM_URL);
};

export const lostItemSubmission = (lostItem) => {
  return axios.post(ITEM_URL, lostItem);
};

export const foundItemSubmission = (lostItem) => {
  return axios.put(ITEM_URL, lostItem);
};

export const getItemById = (id) => {
  return axios.get(ITEM_URL + "/" + id);
};

export const deleteItemById = (id) => {
  return axios.delete(ITEM_URL + "/" + id);
};

export const itemIdGenerator = () => {
  return axios.get(ITEMID_URL);
};

export const notFoundItemList = () => {
  return axios.get(LOST_URL);
};

export const foundItemList = () => {
  return axios.get(FOUND_URL);
};

export const lostItemListByUser = () =>{
  return axios.get(LOSTBYUSER_URL);
};

export const foundItemListByUser = () =>{
  return axios.get(LOSTFOUND_URL);
};