import Loader from "@/components/loader/loader";
import AuthUser from "@/hooks/auth/auth.user";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function TabsIndex() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { loading, user } = AuthUser();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  if (showLoader || loading) {
    return <Loader />;
  }

  return (
    <Redirect
      href={!isLoggedIn ? "/(routes)/onboarding" : "/(tabs)"}
    />
  );
}
