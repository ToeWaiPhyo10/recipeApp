import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import useDebounce from "../hooks/useDebounce";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [searchMeals, setSearchMeals] = useState([]);
  const searchInputDebounce = useDebounce(searchInput);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getReceipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeCategory = (category) => {
    getReceipes(category);
    setSelectedCategory(category);
    setMeals([]);
  };

  const handleSearchCategory = async () => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${searchInputDebounce}`
      );
      if (response && response.data) {
        setSearchMeals(response.data.meals);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
    getReceipes();
  }, []);
  useEffect(() => {
    if (searchInputDebounce?.length) {
      handleSearchCategory();
    }
  }, [searchInputDebounce]);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{
              height: heightPercentageToDP(5),
              width: heightPercentageToDP(5.5),
            }}
          />
          <BellIcon size={heightPercentageToDP(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{ fontSize: heightPercentageToDP(1.7) }}
            className="text-neutral-600"
          >
            Hello, Toe Wai!
          </Text>
          <View>
            <Text
              style={{ fontSize: heightPercentageToDP(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make Your Own Food
            </Text>
          </View>
          <Text
            style={{ fontSize: heightPercentageToDP(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            value={searchInput}
            style={{ fontSize: heightPercentageToDP(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            onChangeText={(e) => setSearchInput(e)}
          />
          <View className="bg-white rounded-full p-3 ">
            <MagnifyingGlassIcon
              size={heightPercentageToDP(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>
        {categories.length > 0 && (
          <Categories
            selectedCategory={selectedCategory}
            handleChangeCategory={handleChangeCategory}
            categories={categories}
          />
        )}
      </View>
      <View className="mx-4 space-y-3 mt-3">
        <Text
          style={{ fontSize: heightPercentageToDP(3) }}
          className="text-neutral-600 font-semibold "
        >
          Recipes
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6"
      >
        <View>
          {searchInputDebounce?.length && searchMeals.length ? (
            <Recipes categories={categories} meals={searchMeals} />
          ) : (
            <Recipes categories={categories} meals={meals} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
