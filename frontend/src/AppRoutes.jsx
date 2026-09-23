import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./featurea/auth/pages/Login"
import Register from "./featurea/auth/pages/Register"
import Protected from "./featurea/auth/components/Protected"
import Home from "./featurea/interview/pages/Home"
import Interview from "./featurea/interview/pages/Interview"

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Protected><Home/></Protected>}/>
        <Route path="interview/:interviewId" element={<Protected><Interview/></Protected>} />
        </Routes>
        </BrowserRouter>
  )
}

export default AppRoutes


