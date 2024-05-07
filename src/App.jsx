import {Navigate,Route, Routes} from 'react-router-dom';
import HomePage from  './pages/HomePage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from  "./pages/SignUpPage.jsx";
import CoursePage from  './pages/CoursePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Header from './components/ui/Header.jsx';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/user.query.js';
import { Toaster } from 'react-hot-toast';
import AdminPage from './pages/admin.jsx';



function App() {
  
  const {loading,data,error} =useQuery(GET_AUTHENTICATED_USER);
  
  console.log("loading",loading);
  console.log("Authenticated user:",data);
  console.log("error",error);
  if(loading) return null;
  return (
    <>
   {data?.authUser && <Header/> }
     <Routes>
    <Route path="/" element={data.authUser? <HomePage/>:<Navigate to ="login"/>}/> 
    <Route path="/login" element={!data.authUser? <LoginPage/> :<Navigate to ="/"/>}/>
    <Route path="/signup" element={!data.authUser? <SignUpPage/> :<Navigate to ="/"/>}/>
    <Route 
    path="/course/:id"
     element={data.authUser? <CoursePage/>:<Navigate to ="login"/>}
     />
    <Route path='/admin' element={<AdminPage />} />
  
    <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    <Toaster />
    </>
  );
}

export default App
