import { useRef, useState } from "react";
import styles from "/styles/SellerDBoard.module.css";

const fakeShoeData ={
    name: "Shoe1",
    price: 250000,
    quantity:2
}
function createData(){
  const fakeDatas = Array<typeof fakeShoeData>(20);
  for (let index = 0; index < fakeDatas.length; index++) {
    const data = JSON.parse(JSON.stringify(fakeShoeData));
    data.name = `Shoe${index}`;
    fakeDatas[index] = data; 
  }
  return fakeDatas;
}
async function getFakeShoeData() {
  return (new Promise<typeof fakeShoeData[]>((resolve,reject)=>{
    setTimeout(()=>{
      resolve(createData())
    },1000);
  }));
}

const EditShoeItem = (shoeDatas:(typeof fakeShoeData[]))=>{
  return(<ul className={styles["s2h_seller_shoes_option_ul"]}>
    {shoeDatas.map((item,index)=>{
      return(<li key={index}>
        <h3>{item.name}</h3>
        {item.price}
      </li>)
    })}
  </ul>)
}

const SellerDBoard = () => {
  const [selectedOption,setSelectedOption] = useState(1);
  const [shoeDataList,setShoeData] = useState<typeof fakeShoeData[]>([]);

  const selectShoeHandler = async ()=>{
    console.log("Option 1");
    setSelectedOption(1);
    const shoeDatas = await getFakeShoeData();
    console.log(shoeDatas);
    setShoeData(shoeDatas);
  }

  return (<div className={styles["s2h_seller_dboard_wrapper"]}>
    <ul className={styles["s2h_seller_dboard_option_select"]}>
      <li onClick={()=>{selectShoeHandler();}}>Giày bạn bán</li>
      <li onClick={()=>{setSelectedOption(2)}}>Các đơn hàng</li>
      <li onClick={()=>{setSelectedOption(3)}}>Các thông báo</li>
    </ul>
    {EditShoeItem(shoeDataList)}
  </div>)
}

export default SellerDBoard;