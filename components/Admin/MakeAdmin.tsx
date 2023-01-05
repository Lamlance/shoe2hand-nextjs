import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { createRef, FormEvent } from "react";
import { toast } from "react-toastify";
import { MakeAdminRespond } from "../../pages/api/admin/MakeAdmin";
import styles from "/styles/admin/admin.module.css";

function makeAdmin() {
  const userIdRef = createRef<HTMLInputElement>();

  const makeAdminHandle = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!userIdRef.current){
      return;
    }

    const fetchData = await fetch("/api/admin/MakeAdmin",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        userId: userIdRef.current.valueAsNumber
      })
    });
    try {
      const user:MakeAdminRespond = await fetchData.json();
      if(user){
        toast.success(`Id:${user.userId} - ${user.userName} is ${user.isAdmin ? "now an admin" : "no longer an admin"}`);
        return;
      }
    } catch (error) {}
    toast.error("User id not found");
  }

  return (<section className={styles["s2h_admin_tab_display_wrapper"]}>
    <ul className={styles["s2h_admin_tab_option"]}>
      <li>{"REFRESH"}</li>
    </ul>
    <section className={styles["s2h_admin_tab_display"]}>
      <form onSubmit={makeAdminHandle}>
        <label>{"User id to make admin: "}<input ref={userIdRef} type={"number"}></input></label>
        <input type={"submit"} value={"Make admin"}></input>
      </form>
    </section>
  </section>)
}

export default withPageAuthRequired(makeAdmin);