import AppRoutes from "./AppRoutes"
import { AuthProvider } from "./featurea/auth/authContext"
import {InterviewProvider} from "./featurea/interview/interviewContext"

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
      <AppRoutes/>
      </InterviewProvider>
    </AuthProvider>


  )
}

export default App
