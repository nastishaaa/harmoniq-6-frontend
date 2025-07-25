// import styles from "./ArticlesPage.module.css";

import { useEffect } from "react";
export default function ArticlesPage() {
  const N = Math.round(Math.random() * 10);
  useEffect(() => {
    console.log(5);
  }, []);
  return (
    <div>
       <div>
         <h1>Articles</h1> <p>{N > 1 ? ` ${N} articles` : `${N} article`} </p> 
      </div>
      <div>
         <select name="filter" id="choice">
           <option value="all">All</option> 
          <option value="popular">Popular</option> 
        </select>{" "}
      </div>{" "}
    </div>
  );
}
