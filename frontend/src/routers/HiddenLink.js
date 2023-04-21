import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/fetaures/auth/authSlice"

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <> {children} </>
  }
  return null
}

export const ShowOnLogOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <> {children} </>
  }
  return null
}
