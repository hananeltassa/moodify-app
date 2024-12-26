import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";;
import TextField from "../../components/TextField";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const searchDatabase = (query) => {
    // Mock data to simulate a database
    const mockData = [
      { id: "1", title: "Belong Together", subtitle: "Mark Ambor", image: "https://via.placeholder.com/100" },
      { id: "2", title: "Dandelions", subtitle: "Ruth B.", image: "https://via.placeholder.com/100" },
      { id: "3", title: "Wildest Dreams", subtitle: "Taylor Swift", image: "https://via.placeholder.com/100" },
    ];

    if (query.trim() === "") {
      setResults([]); 
    } else {
      const filtered = mockData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const handleSearchChange = (text) => {
    setSearchValue(text); // Update the search value
    searchDatabase(text); // Perform search
  };

  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-700"
      onPress={() => console.log(`Selected: ${item.title}`)}
    >
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
    <SafeAreaProvider>
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 10,
        paddingBottom: insets.bottom,
        backgroundColor: "black",
        paddingHorizontal: 16
      }}
    >
      {/* Page Title */}
      <View>
        <Text className="font-Avenir-Bold text-white text-3xl mb-2">
          Search
        </Text>

        {/* Search Field */}
        <TextField
          title="Search"
          value={searchValue}
          placeholder="Artists or songs..."
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
            <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
              No results found.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
