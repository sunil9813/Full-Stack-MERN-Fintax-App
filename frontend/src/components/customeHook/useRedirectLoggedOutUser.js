import { useEffect } from "react"
import { getLoginStatus } from "../../redux/services/authServices"
import { useDispatch } from "react-redux"
import { SET_LOGIN } from "../../redux/fetaures/auth/authSlice"
import { useNavigate } from "react-router-dom"

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus()
      dispatch(SET_LOGIN(isLoggedIn))

      if (!isLoggedIn) {
        navigate(path)
        return
      }
    }
    redirectLoggedOutUser()
  }, [navigate, path, dispatch])
}

export default useRedirectLoggedOutUser
