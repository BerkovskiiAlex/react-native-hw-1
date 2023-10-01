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
  }
];
