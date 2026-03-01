import Logo from "../fragments/Logo";
import ProgressBar from "../fragments/ProgressBar";
import NewTask from "../fragments/NewTask";
import FilterBox from "../fragments/FilterBox";
import CheckList from "../fragments/tasks_list/CheckList";
import Stats from "../fragments/Stats";

import {supabase} from "../../supabaseClient";
import {AuthInfo} from "../../contexts/AuthContext";

import TasksContextProvider from "../../contexts/TasksContext";
import {useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../fragments/Loading";

export default function Home() {
  const {authSession, setAuthSession} = useContext(AuthInfo);

  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      const {data} = await supabase.auth.getSession();
      console.log("session ok");

      if (data.session) {
        setAuthSession(data.session);
      } else {
        navigate("/login", {replace: true});
      }
    }
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authSession) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-400">
      <TasksContextProvider>
        <Logo />
        <ProgressBar />
        <NewTask />
        <FilterBox />
        <CheckList />
        <Stats />
      </TasksContextProvider>
    </div>
  );
}
