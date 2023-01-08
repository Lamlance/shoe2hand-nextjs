import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useStore } from "@nanostores/react";
import { SHOP, USER } from "@prisma/client";
import { createRef, useState } from "react";
import MakeAdmin from "../../components/Admin/MakeAdmin";
import ShopStats from "../../components/Admin/ShopStats";
import { userInfo_inDB } from "../../helper/userInfo_inDB";
import styles from "/styles/admin/admin.module.css";

function adminPage() {
  const { user, error, isLoading } = useUser();
  const $userInfo_inDB = useStore(userInfo_inDB);
  const [displayTab,setDisplayTab] = useState<number>(0);

  if (!$userInfo_inDB || !$userInfo_inDB.user ||!$userInfo_inDB.user.isAdmin) {
    fetch("/api/user",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: user?.email,
          sub: user?.sub,
          name: user?.name
        })
      }).then((raw) => {
        raw.json().then((userData: { userData: USER }) => {
          userInfo_inDB.set({
            user: userData.userData
          })
        })
      })
  }

  if (isLoading || !$userInfo_inDB || !$userInfo_inDB.user) { return <div>Loading...</div> };
  if (error) { return <div>{error.message}</div> };

  if(!$userInfo_inDB.user.isAdmin){
    return(<div>{"You are not an admin"}</div>)
  }
  
  return (<div>
    <h1>This is admin page</h1>
    <section className={styles["s2h_admin_display_wrapper"]}>
      <ul className={styles["s2h_admin_tab_option"]}>
        <li onClick={()=>{setDisplayTab(0)}}>{"Thống kê các Shop"}</li>
        <li onClick={()=>{setDisplayTab(1)}}>{"Trao quyền admin"}</li>
      </ul>

      <ul className={styles["s2h_admin_tab_display_list_wrapper"]}>
        <li style={{display: (displayTab === 0) ? "block" : "none"}}>{ <ShopStats />}</li>
        <li style={{display: (displayTab === 1) ? "block" : "none"}}>{ <MakeAdmin />}</li>
      </ul>
    </section>
  </div>)
}
export default withPageAuthRequired(adminPage);