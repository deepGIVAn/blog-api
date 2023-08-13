import React from "react";
import { formatISO9075, format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <>
      <div className="post">
        {/* to go to the id of the post.. */}
        <Link to={`/post/${_id}`}>
          <div className="image">
            <img src={"https://blog-api-dotx.onrender.com/" + cover} alt="/" />
          </div>
        </Link>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <span className="author">{author.username}</span>
            {/* for using dates from mongoose we use, yarn add date-fns */}
            {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
            <time>{format(new Date(createdAt), "MMM d, YYY HH:mm")}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
      {/* <div className="post">
        <div className="image">
          <img
            src="https://www.motortrend.com/uploads/2023/08/001-2024-Fisker-ForceE.jpg?fit=around%7C875:492"
            alt="/"
          />
        </div>
        <div className="texts">
          <h2>2024 Fisker Ocean EV SUV Adds Meaty Force-E Off-Road Edition</h2>
          <p className="info">
            <span className="author">D. Gray</span>
            <time>2023-01-06 16:45</time>
          </p>
          <p className="summary">
            Henrik Fisker promises the Force-E will be the most sustainable
            off-road all-electric SUV on the market.
            <br />
            <br />
            Fisker had a big night, revealing the four-door, five-passenger
            Ronin EV convertible GT sports car, the compact Pear EV SUV and its
            Houdini trunk, and a pickup version of the Ocean EV SUV dubbed the
            Alaska EV truck. But it also showed off something a little more
            immediately tangible with the off-road edition of the Ocean, which
            is called the 2024 Fisker Ocean Force-E, adding plenty of
            overlanding gear and gimmicks. Here's what we learned about it last
            night.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default Post;
