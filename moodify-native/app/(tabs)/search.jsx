import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../components/TextField";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const searchDatabase = (query) => {

    const mockData = [
      { id: "1", title: "Belong Together", subtitle: "Mark Ambor", image: "https://via.placeholder.com/100" },
      { id: "2", title: "Dandelions", subtitle: "Ruth B.", image: "https://via.placeholder.com/100" },
      { id: "3", title: "Wildest Dreams", subtitle: "Taylor Swift", image: "https://via.placeholder.com/100" },
    ];

    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = mockData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const handleSearchChange = (text) => {
    setSearchValue(text);
    searchDatabase(text);
  };

  const renderResultItem = ({ item }) => (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-700">
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-white text-base font-bold">{item.title}</Text>
        <Text className="text-gray-400 text-sm">{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

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
      <View className="px-4" style={{ marginTop: 20, marginBottom: 16 }}>
        <Text className="text-white font-Avenir-Bold text-3xl mb-2 mt-5">Search</Text>

        {/* Search Field */}
        <TextField
          title="Search"
          value={searchValue}
          placeholder="Artists or a songs..."
          handleChangeText={handleSearchChange}
          inputSize={16}
          iconName="search"
          iconColor="#7B7B8B"
        />
      </View>

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderResultItem}
        ListEmptyComponent={
          searchValue ? (
            <Text className="text-gray-500 text-center mt-4">
              No results found.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
