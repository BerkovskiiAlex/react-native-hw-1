/** @format */

import { collection, addDoc } from "firebase/firestore";
import { db } from "./config.js";

const writeDataToFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
writeDataToFirestore();

LOG[
  ({
    post: {
      comments: [Array],
      createdAt: "2023-10-01T16:00:20.078Z",
      location: [Object],
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/snappy-attic-400215.appspot.com/o/photos%2Fd0ae8967-fff8-4e3c-b640-d9f184025757.jpg?alt=media&token=2587b136-da52-498b-b0d0-a7097183bc3f",
      title: "",
    },
    postId: "7GpwRgDZRDDlX1PuhBmT",
  },
  {
    post: {
      comments: [Array],
      createdAt: "2023-10-02T11:49:51.446Z",
      location: [Object],
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/snappy-attic-400215.appspot.com/o/photos%2F0c97cd53-717e-4d59-a028-1bee801d61a8.jpg?alt=media&token=5862b791-edfd-49dc-b675-8def66cb1757",
      title: "124334",
    },
    postId: "MMYAaU0OArN3NYyFiIbs",
  },
  {
    post: {
      comments: [Array],
      createdAt: "2023-10-01T15:39:51.981Z",
      location: [Object],
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/snappy-attic-400215.appspot.com/o/photos%2F87326375-74e0-4cbd-b8d3-c1b4b592a581.jpg?alt=media&token=d6eaea15-20fb-4156-be68-8d944bf3fe1d",
      title: "123324",
    },
    postId: "MQ3MPwHuWUlZN0oURbKf",
  },
  {
    post: {
      comments: [Array],
      createdAt: "2023-10-01T16:07:12.565Z",
      location: [Object],
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/snappy-attic-400215.appspot.com/o/photos%2Fc951064f-87b8-4b0d-abde-7bdb59c0c1ea.jpg?alt=media&token=5221dc19-eaff-4628-9cf5-cb852ef8199f",
      title: "213",
    },
    postId: "OC8ZyKGTfiEpkBkjBbWt",
  })
];
