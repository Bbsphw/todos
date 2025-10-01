import todoApp from "./connect";
import {
  getFirestore,
  collection,
  orderBy,
  limit,
  where,
  addDoc,
  doc,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(todoApp);
const todoColl = collection(db, "todos");
const userColl = collection(db, "users");

export const getAllTodos = async (success, unsuccess) => {
  console.log(`getAllTodos active`);
  try {
    const qry = query(todoColl);
    const qrySnapshot = await getDocs(qry);
    // loop all item
    qrySnapshot.forEach((doc) => {
      console.log(`Doc id: ${doc.id} => task: ${doc.data().task}`);
      success(doc);
    });
  } catch (e) {
    unsuccess(e);
  }
};

export const getUserByEmail = async (email, success, unsuccess) => {
  console.log(`email: ${email}`);
  let userRefID;
  try {
    let qry = query(userColl, where("email", "==", email));
    let qrySnapshot = await getDocs(qry);
    qrySnapshot.forEach((doc) => {
      userRefID = doc.ref;
    });
    console.log(`userRefID: ${userRefID}`);
    qry = query(todoColl, where("user_id", "==", userRefID));
    qrySnapshot = await getDocs(qry);
    qrySnapshot.forEach((doc) => {
      success(doc);
    });
  } catch (e) {
    unsuccess(e);
  }
};
