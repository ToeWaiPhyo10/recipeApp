import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function RecipeCard({ item, index, navigation }) {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingRight: isEven ? 8 : 0,
          paddingLeft: isEven ? 0 : 8,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("Recipe", { ...item })}
      >
        <CachedImage
          //   source={{ uri: item.strMealThumb }}
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height:
              index % 3 == 0
                ? heightPercentageToDP(25)
                : heightPercentageToDP(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.strMeal}
        />
        <Text
          className="font-semibold text-neutral-600 ml-2"
          style={{ fontSize: heightPercentageToDP(1.5) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
