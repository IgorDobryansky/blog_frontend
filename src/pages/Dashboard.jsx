import axios from "axios";
import { useAppState } from "../context/reducer";
import { useEffect } from "react";

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const { token, url, notes } = state;
  console.log(state);

//   useEffect(() => {
//     getNotes();
//   });
//   function getNotes() {
//     const res = axios.get(url + "/notes", {});
//     console.log(res);
//   }
  //   getNotes()
  return <div>{!!notes && "Notes"}</div>;
}
