import { firestore } from "../config/firebase.config";

const projects = firestore.collection("projects");

export const getAll = (uid, status) =>
  projects
    .where("user_id", "==", uid)
    .where("status", "==", status)
    .orderBy("updated_at", "desc")
    .limit(5);

export const add = ({ uid, title, desc, status }) =>
  projects.add({
    user_id: uid,
    title,
    desc,
    status,
    created_at: new Date(),
    updated_at: new Date(),
  });

export const edit = ({ title, desc, todo_id }) =>
  projects.doc(todo_id).update({
    title,
    desc,
    updated_at: new Date(),
  });

export const del = (todo_id) => projects.doc(todo_id).delete();

export const updateStatus = ({ todo_id, status }) => {
  projects.doc(todo_id).update({
    status,
    updated_at: new Date(),
  });
};
