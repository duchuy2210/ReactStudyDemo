import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Nav from './Component/Nav';
import BlogPage from './Component/BlogPage';
import ProfilePage from './Component/ProfilePage';
import BlogPageDetail from './Component/BlogPageDetail';
//link Active Link Outlet Nested routes useParams useSearchParams NotFound useNaviGate
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Nav></Nav>}>
          <Route path='/' element={<div>Home Page</div>}></Route>
          <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
          <Route path='/blog/:slug' element={<BlogPageDetail></BlogPageDetail>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
        </Route>
          <Route path='*' element={<>404 not found</>}></Route>
      </Routes>
    </div>
  );
}

export default App;
