import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Music({ title, subtitle, image, onPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleMorePress = () => {
    setModalVisible(true);
  };

  const handleOptionSelect = (option) => {
    if (option === "Like") {
      setIsLiked(!isLiked); 
    }
    setModalVisible(false);
  };

  return (
    <>
      {/* Main Music Component */}
      <TouchableOpacity onPress={onPress} className="flex-row items-center p-2">
        {/* Thumbnail */}
        <Image
          source={image}
          className="mr-4"
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
          }}
        />

        {/* Text Content */}
        <View className="flex-1 mr-2">
          <Text
            className="text-white text-lg font-Avenir-Demi"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>

          <Text className="text-gray-400 text-base" numberOfLines={1}
            ellipsizeMode="tail">
              {subtitle}
          </Text>
        </View>

        {/* Three Dots Icon */}
        <TouchableOpacity onPress={handleMorePress}>
          <Ionicons name="ellipsis-vertical" size={24} color="#7B7B8B" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Modal for Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              justifyContent: "flex-end",
            }}
          >
            <View className="bg-[#252425] p-6 rounded-t-2xl">

              <TouchableOpacity
                onPress={() => handleOptionSelect("Like")}
                className="flex-row items-center mb-4"
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={24}
                  color={isLiked ? "#FF0000" : "#FF6100"}
                  className="mr-4"
                />
                <Text className="text-white text-lg">
                  {isLiked ? "Liked" : "Like"}
                </Text>
              </TouchableOpacity>

              {/* Option: Add to Playlist
              <TouchableOpacity
                onPress={() => handleOptionSelect("Add to Playlist")}
                className="flex-row items-center mb-4"
              >
                <Ionicons
                  name="add-outline"
                  size={24}
                  color="#FFF"
                  className="mr-4"
                />
                <Text className="text-white text-lg">Add to Playlist</Text>
              </TouchableOpacity> */}

              {/* Option: Remove */}
              <TouchableOpacity
                onPress={() => handleOptionSelect("Remove")}
                className="flex-row items-center mb-4"
              >
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="#FF0000"
                  className="mr-4"
                />
                <Text className="text-red-500 text-lg">Remove</Text>
              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-400 text-lg text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
