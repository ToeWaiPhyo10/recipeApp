import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function Categories(props) {
  const { selectedCategory, handleChangeCategory, categories } = props;

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="mt-3"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4 "
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = selectedCategory === cat.strCategory;
          let activeClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center space-y-1"
            >
              <View className={"rounded-full p-[6px] " + activeClass}>
                <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{
                    width: heightPercentageToDP(6),
                    height: heightPercentageToDP(6),
                  }}
                  className="rounded-full"
                />
              </View>
              <Text
                className="text-neutral-600"
                style={{ fontSize: heightPercentageToDP(1.6) }}
              >
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
