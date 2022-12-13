import { useAppContext } from "../context/AppContext"

const AuthCheck = () => {
    const { user, isLoading } = useAppContext()
    
    if (!user || !isLoading) return true
    return false

}

export default AuthCheck