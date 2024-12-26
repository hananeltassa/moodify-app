import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";

export default function RecommendedMusic({ data, title }) {
  const router = useRouter();

  return (
    <View className="p-4 bg-black">
      {/* Title */}
      {title && <Text className="text-white text-xl font-Avenir-Bold mb-2">{title}</Text>}

      {/* Horizontal List */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/playlist/${item.id}`,
                params: { playlistName: item.title },
              })
            }
            className="w-45 border mr-4"
          >
            {/* Playlist Image */}
            <Image source={item.image} className="w-40 h-40"/>
              
            {/* Playlist Title */}
            <Text
              className="text-white text-base font-Avenir-Bold mt-3"
              numberOfLines={1}
            >
              {item.title}
            </Text>

            {/* Playlist Subtitle */}
            <Text
              className="text-gray-400 text-sm font-avenir-regular"
              numberOfLines={1}
            >
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
