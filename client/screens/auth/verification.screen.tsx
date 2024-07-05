import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { verificationStyles } from "@/styles/verification/verification";
import Button from "@/utils/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";

export default function VerificationScreen() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const [countdown, setCountdown] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);

  const inputs = useRef([...Array(4)].map(() => React.createRef<any>()));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleInput = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === "" && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };

  const handleResend = () => {
    setCountdown(120);
    setResendDisabled(true);
    // Add logic to resend the verification code
  };

  const handleSubmit = async () => {
    try {
      const otp = code.join("");
      const activation_token = await AsyncStorage.getItem("activation_token");
      await axios
        .post(`${SERVER_URI}/users/activate-user`, {
          activation_code: otp,
          activation_token,
        })
        .then((res) => {
          Toast.show(res.data.message, {
            type: "success",
          });
          // setCode(new Array(4).fill(''));
          router.push("/(routes)/login");
        });
    } catch (error) {
      Toast.show("Invalid Otp, Please try again!", {
        type: "danger",
      });
    }
  };

  return (
    <View style={verificationStyles.container}>
      <Text style={verificationStyles.headerText}>Verification Code</Text>
      <Text style={verificationStyles.subText}>
        Verification code has been sent to your email.
      </Text>

      <View style={verificationStyles.inputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={verificationStyles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={code[index]}
            ref={inputs.current[index]}
            autoFocus={index === 0}
          />
        ))}
      </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Verify" onPress={handleSubmit} />
        </View>
  
      <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
        <Text
          style={{
            fontSize: 15,
            paddingTop: 10,
            color: resendDisabled ? "gray" : "blue",
          }}
        >
          Resend Verification Code{" "}
          {resendDisabled
            ? `(${Math.floor(countdown / 60)}:${
                countdown % 60 < 10 ? "0" : ""
              }${countdown % 60})`
            : ""}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
        <Text
          style={{
            fontSize: 17,
            paddingTop: 10,
            color: "#5A72A0",
            textDecorationLine: "underline",
          }}
        >
          Go back to login →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
