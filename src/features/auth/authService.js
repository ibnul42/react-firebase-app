import axios from "axios"

const API_URL = "http://localhost:5000/api/users/"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"

// login user
const login = async (user) => {
  const docRef = doc(db, "users", user.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const newData = docSnap.data()
    delete newData.password
    localStorage.setItem("user", JSON.stringify(newData))
    return newData
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!")
  }
}

// logout user
const logout = () => {
  localStorage.removeItem("user")
}

// update user
const update = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user"))["token"]
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(API_URL + "me/update", userData, config)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  login,
  logout,
  update,
}

export default authService
