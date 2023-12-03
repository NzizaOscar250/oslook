import { Routes,Route} from "react-router-dom"
import Home from "./core/Home"
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"
import Profile from "./user/Profile"
import EditUser from "./user/EditUser"
import FindPeople from "./user/FindPeople"
import Auth from "./auth/Auth"
import PostsPage from "./core/PostsPage"

export default function MainRouter(){
    
    return <>

<Routes>
        
        <Route path="/" element={<Home />}>
          <Route index element={<PostsPage/>} />
          <Route path="/profile/:userId"  element={<Profile/>}/>
          <Route path="/profile/edit/:userId" element={<EditUser/>} />
          <Route path="/findpeople" element={<FindPeople/>}/>
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route index  element={<Signin/>}/>
        <Route path="signup" element={<Signup/>}/>
            
        </Route>
    
      </Routes>
            

    </>
}