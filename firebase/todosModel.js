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

export const getAllTodos = async (success, unseccess) => {
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
    unseccess(e);
  }
};
