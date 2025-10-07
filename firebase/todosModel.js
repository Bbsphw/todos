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

export const getUserRefID = async (email, success, unsuccess) => {
  console.log(`email: ${email}`);
  let userRefID;
  try {
    let qry = query(userColl, where("email", "==", email));
    let qrySnapshot = await getDocs(qry);
    qrySnapshot.forEach((doc) => {
      userRefID = doc.ref;
    });
    console.log(`userRefID: ${userRefID}`);
    success(userRefID);
  } catch (e) {
    unsuccess(e);
  }
};

export const addTask = async (newTask, users, success, unsuccess) => {
  console.log(`newTask: ${newTask}`);
  // console.log(`user_id: ${users[0].user_id}`);
  console.log("user_id:", users[0].user_id);

  const docData = {
    task: newTask,
    user_id: users[0].user_id,
    status: false,
  };

  try {
    const docRef = await addDoc(todoColl, docData);
    console.log(`doc ref: ${docRef.id}`);
    success(docRef.id);
  } catch (e) {
    unsuccess(e);
  }
};

export const getTodosByUserRefID = async (userRefID, success, unsuccess) => {
  try {
    const qry = query(todoColl, where("user_id", "==", userRefID));
    const qrySnapshot = await getDocs(qry);
    qrySnapshot.forEach((doc) => {
      console.log(`doc.id: ${doc.id}, task: ${doc.data().task}`);
      success(doc);
    });
  } catch (e) {
    unsuccess(e);
  }
};
