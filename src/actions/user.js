import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
// import { API } from "../config";
import { API } from "../../config";

export const getMyRequests = (userId, token) => {
  const data = {
    userId,
  };
  return fetch(`${API}/api/user/get-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyCategoryRequests = (sender, token) => {
  const data = {
    sender,
  };
  return fetch(`${API}/api/user/get-category-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyOffers = (requestId, token) => {
  const data = {
    requestId,
  };
  return fetch(`${API}/api/user/get-offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createNewOffer = (requestId, sender, receiver, offer, token) => {
  const data = {
    requestId,
    sender,
    receiver,
    offer,
  };
  return fetch(`${API}/api/user/create-offer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createNewRequest = (userId, request, token) => {
  const data = {
    userId,
    request,
  };
  return fetch(`${API}/api/user/create-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyPrivateRooms = (sender, token) => {
  const data = {
    sender,
  };
  return fetch(`${API}/api/user/get-private-rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRoom = (roomId) => {
  const data = {
    roomId,
  };
  return fetch(`${API}/api/user/get-private-room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
