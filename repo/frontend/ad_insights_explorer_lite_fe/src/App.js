import Home from './home/home.component.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SideBarComponent from './components/sidebar/SideBarComponent'
import PostDataTableComponent from './components/general/PostDataTableComponent.jsx'
import SameUserAndTitleTableComponent from './components/anomalies/SameUserAndTitleTableComponent.jsx'
import SameUserAndTitle5TableComponent from './components/anomalies/SameUserAndTitle5TableComponent.jsx'
import Title15TableComponent from './components/anomalies/Title15TableComponent.jsx'
import MaxTitleWordsTableComponent from './components/summary/MaxTitleWordsTableComponent'
import Top3UsersTableComponent from './components/summary/Top3UsersTableComponent.jsx'
import TopTitleWordsTableComponent from './components/summary/TopTitleWordsTableComponent'

const App = () => {
  return(
    <Router>
      <div className="app-container">
        <SideBarComponent />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostDataTableComponent/> } />
            <Route path="/same_user_and_title" element={<SameUserAndTitleTableComponent/> } />
            <Route path="/same_user_and_title_more than 5" element={<SameUserAndTitle5TableComponent/>} />
            <Route path="/title_shorter_than_15" element={<Title15TableComponent/>} />
            <Route path="/max_title_words_count" element={<MaxTitleWordsTableComponent />} />
            <Route path="/top_title_words" element={<TopTitleWordsTableComponent />} />
            <Route path="/top_3_users" element={<Top3UsersTableComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
