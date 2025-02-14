import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
};
const DeleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const useDeleteDocument = (doccollection) => {
  const [response, dispatch] = useReducer(DeleteReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
  const deleteDocument = async (id) => {
    console.log("Inserção iniciada...");
    checkCancelBeforeDispatch({ type: "LOADING" });
    try {
      const deletedDocument = await deleteDoc(doc(db, doccollection, id));
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      console.log("Erro ao inserir:", error.message);
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { deleteDocument, response };
};
