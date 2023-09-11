import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);
  const navigation = useNavigation();
  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    const padding1 = setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + hp(5))),
      100
    );
    const padding2 = setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + hp(5.5))),
      300
    );
    const navigateToNextPage = setTimeout(
      () => navigation.navigate("Home"),
      2500
    );
    return () => {
      clearTimeout(padding1);
      clearTimeout(padding2);
      clearTimeout(navigateToNextPage);
    };
  }, []);
  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style="dark" />

      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring1Padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring2Padding }}
        >
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest "
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-white tracking-widest "
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
