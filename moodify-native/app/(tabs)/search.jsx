import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../components/TextField";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingHorizontal: 16,
      }}
    >
      {/* Page Title */}
      <View className="px-4 " style={{ marginBottom: 16 }}>
        <Text className="text-white font-Avenir-Bold text-3xl mb-2 ">Search</Text>


      {/* Search Field */}
      <TextField
        title="Search"
        value={searchValue}
        placeholder="Artists or a songs..."
        handleChangeText={setSearchValue}
        inputSize={16}
        iconName="search"
        iconColor="#7B7B8B"
      />
            </View>
    </SafeAreaView>
  );
}
