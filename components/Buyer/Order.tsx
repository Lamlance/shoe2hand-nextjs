import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../../styles/Invoice.module.css";
import { OrderDetailResult } from "../../pages/api/buyer/order";
import { createRef, FormEvent, useState } from "react";
import { REVIEW } from "@prisma/client";

// let Items = {
//   belongTo: "AAA shop",
//   status: "Đã giao",
//   itemName: "Giày X",
//   price: "100.000",
// };

interface Review {
  rating: number | null; comment: string | null; detailId: number; title?: string | null;
}

export default function Order(props: OrderDetailResult) {
  const stats = props.deliveringStatus;
  const [review, setReviewInfo] = useState<Review | null>(null);
  const ratingRef = createRef<HTMLInputElement>();
  const commentRef = createRef<HTMLTextAreaElement>();

  const setReviewForm = (detailId: number) => {
    const review = props.ORDERDETAIL.find((item) => { return (item.orderdetailId === detailId) });
    if (!review) {
      return;
    }
    setReviewInfo({
      rating: (review.REVIEW) ? review.REVIEW.rating : null,
      comment: (review.REVIEW) ? review.REVIEW.comment : null,
      detailId: detailId,
      title: review.PRODUCT.title
    })
  }

  const submitReviewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!review || !ratingRef.current || !commentRef.current) {
      return;
    }

    const fetchData = await fetch("/api/buyer/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: props.orderId,
        detailId: review.detailId,
        rating: ratingRef.current.valueAsNumber,
        comment: commentRef.current.value,
      })
    })
    try {
      const rating: REVIEW = await fetchData.json();
      for (let index = 0; index < props.ORDERDETAIL.length; index++) {
        if (props.ORDERDETAIL[index].orderdetailId === rating.detailId) {
          props.ORDERDETAIL[index].REVIEW = {
            rating: rating.rating,
            comment: rating.comment
          }
          break;
        }
      }
      console.log("Make rating", rating);
    } catch (error) { console.log(error) }
  }

  const reviewForm = (
    <form className={styles["s2h_order_rating_form"]} onSubmit={(event) => submitReviewHandler(event)}>
      <h4>{review?.title}</h4>

      <p style={{ display: (review && review.comment) ? "block" : "none" }}>
        {"Your's comment: "}{review && review.comment ? review.comment : ""}
      </p>
      <label style={{ display: (review && !review.comment) ? "grid" : "none" }}>Rating comment
        <textarea ref={commentRef} rows={5} cols={12} ></textarea>
      </label>

      <p style={{ display: (review && review.rating) ? "block" : "none" }}>
        {"Your's rating: "}{review && review.rating ? review.rating : ""}
      </p>
      <label style={{ display: (review && !review.rating) ? "grid" : "none" }}>Rating score
        <input ref={ratingRef} min={0} max={5} type={"number"} defaultValue={(review && review.rating) ? review.rating : 0} required
        ></input>
      </label>
      {
        (review && !review.comment && !review.rating) ?
          (<button>Submit Review</button>) :
          null
      }
    </form>);


  return (
    <div className={styles["container"]}>
      <section>
        <div className={styles["title"]}>
          <div>{props.SHOP.shopName} - OrderId:{props.orderId}</div>
          <div>{props.deliveringStatus}</div>
        </div>
        <ul className={styles["content"]}>
          {props.ORDERDETAIL.map((iteminfo, index) => {
            return (
              <li key={index}>
                <span style={{ textAlign: "left" }}>{`${iteminfo.PRODUCT.title} ${iteminfo.orderdetailId}`}</span>
                <span>{`x${iteminfo.quantity}`}</span>
                {
                  (stats === "DELIVERED") ?
                    (<button onClick={() => { setReviewForm(iteminfo.orderdetailId) }}>
                      RATE
                    </button>) :
                    null
                }

              </li>
            );
          })}
        </ul>
        {review ? reviewForm : null}
        <div>
          {
            (stats != "DELIVERED" && stats != "CANCELED") ?
              <button type="button" className={styles["reorder"]}>CANCEL</button> :
              ""
          }
        </div>

      </section>
    </div>
  );
}
