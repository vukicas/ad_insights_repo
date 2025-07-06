import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
            <Link to="/posts">All Posts</Link>
        </li>
         <li>
            <Link to="/same_user_and_title">Same titles of one user</Link>
        </li>
        <li>
            <Link to="/same_user_and_title_more than 5">More than 5 same titles of one user</Link>
        </li>
        <li>
            <Link to="/title_shorter_than_15">Post Titles Shorter than 15</Link>
        </li>
        <li>
            <Link to="/max_title_words_count">Titles with max number of words</Link>
        </li>
        <li>
            <Link to="/top_title_words">word with maximum number of appearnces</Link>
        </li>
        <li>
            <Link to="/top_3_users">Top 3 users with max word counts in title</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
