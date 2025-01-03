import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import SearchFilters from "../../components/Search/SearchFilters";
import SearchResults from "../../components/Search/SearchResults";
import { useSearch } from "../../hooks/useSearch";
import { useRouter } from "expo-router";

export default function Search() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    searchValue,
    results,
    searchType,
    loading,
    handleSearchChange,
    handleSearchTypeChange,
  } = useSearch();

  const handleItemPress = (type, item) => {
    const route = type === "track" ? "/music/[music]" : "/(tabs)/playlist/[playlist]";
    router.push({
      pathname: route,
      params: {
        ...(type === "track"
          ? {
              songTitle: item.name,
              songImage: item.image,
              songArtist: item.artists,
              externalUrl: item.externalUrl,
              previewUrl: item.previewUrl,
              duration: item.duration_ms,
            }
          : {
              playlist: item.id,
              playlistName: item.name,
              playlistImage: item.image,
              from: "search",
            }),
      },
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: insets.bottom,
          backgroundColor: "black",
          paddingHorizontal: 16,
        }}
      >
        <View>
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">
            Search
          </Text>

          {/* Search Field */}
          <TextField
            value={searchValue}
            placeholder={`Search ${searchType}...`}
            handleChangeText={handleSearchChange}
            inputSize={16}
            iconName="search"
            iconColor="#7B7B8B"
          />

          {/* Filter Buttons */}
          <SearchFilters currentType={searchType} onChangeType={handleSearchTypeChange} />
        </View>

        {/* Results Section */}
        <View style={{ flex: 1, marginTop: 16 }}>
          {loading ? (
            <ActivityIndicator size="large" color="gray" style={{ marginTop: 20 }} />
          ) : (
            <SearchResults results={results} searchType={searchType} onItemPress={handleItemPress} />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
