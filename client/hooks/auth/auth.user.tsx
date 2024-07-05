
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('')

  useEffect(() => {
    const subscription = async () => {
       const accessToken = await AsyncStorage.getItem("access_token")
       const refreshToken = await AsyncStorage.getItem("refresh_token")

      await axios
        .get(`${SERVER_URI}/users/userInfo`, {
           headers: {
             'access_token': accessToken,
             'refresh_token': refreshToken
           }
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((error: any) => {
          setError(error?.message)
          setLoading(false);
        });
    };
    subscription();
  }, []);
  return {
    loading,
    user,
    error
  };
}
