import React, { useEffect, useState } from "react";

import Banner from "../components/Banner/Banner";
import HomeSlide from "../components/HomePage/HomeSlide/HomeSlide";
import HomeListPosts from "../components/HomePage/HomeListPosts/HomeListPosts";
import firebase from "../firebase";

function HomePage(props) {
  const [data, setdata] = useState(null);

  useEffect(() => {
    firebase
      .database()
      .ref("posts")
      .limitToLast(10)
      .on("value", (el) => {
        let list = [];
        el.forEach((el) => {
          list.push(el.val());
        });
        setdata(list);
      });
  }, []);
  return (
    <React.Fragment>
      <Banner />
      <section id="content" className="container">
        {/* HOME SLIDE   */}
        <HomeSlide data={data} />
        {/* HOME LIST POSTS */}
        <HomeListPosts />
      </section>
    </React.Fragment>
  );
}

export default HomePage;
