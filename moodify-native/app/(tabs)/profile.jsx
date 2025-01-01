import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import RadioButton from "../../components/RadioButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { setUser } from "../../redux/slices/userSlice";
import Icon from "react-native-vector-icons/Feather";
import images from "../../constants/images";
import { updateUserProfile } from "../../api/user";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    profilePic: user?.profilePic || images.user,
  });

  const insets = useSafeAreaInsets();

  const handleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSave = async () => {
    const updatedProfile = {};

    if (form.name !== user.name) updatedProfile.name = form.name;
    if (form.gender !== user.gender) updatedProfile.gender = form.gender;
    if (form.dateOfBirth !== user.dateOfBirth) updatedProfile.birthday = form.dateOfBirth;

    if (
      form.profilePic !== user.profilePic &&
      form.profilePic !== images.user &&
      typeof form.profilePic === "string"
    ) {
      updatedProfile.profile_picture = form.profilePic;
    }

    if (Object.keys(updatedProfile).length === 0) {
      Alert.alert("No changes detected", "Please make changes before saving.");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(updatedProfile);
      dispatch(setUser(updatedUser));
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Permission to access media library is required.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        setForm((prevForm) => ({ ...prevForm, profilePic: selectedImageUri }));
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">User data is unavailable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-black"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex-1">
        {/* Profile Picture Section */}
        <LinearGradient
          colors={["#FF6100", "#B90039"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="items-center mb-8 py-16 relative"
        >
          <Image
            source={
              typeof form.profilePic === "string"
                ? { uri: form.profilePic }
                : form.profilePic
            }
            className="w-32 h-32 rounded-full border-2 border-white"
          />
          <TouchableOpacity
            onPress={handlePickImage}
            className="absolute bg-white rounded-lg p-1.5 shadow-md"
            style={{ bottom: 65, right: 165 }}
          >
            <Icon name="edit-2" size={16} color="#FF6100" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Name Field */}
        <FormField
          title="Name"
          value={form.name}
          placeholder="Enter your name"
          handleChangeText={(value) => handleChange("name", value)}
          otherStyles="mb-4"
        />

        {/* Gender Selection */}
        <Text className="text-white text-xl font-bold mb-2 px-4">Gender</Text>
        <View className="flex-row justify-around">
          <RadioButton
            label="Female"
            value="female"
            selectedValue={form.gender}
            onPress={() => handleChange("gender", "female")}
            color="#FF4081"
          />
          <RadioButton
            label="Male"
            value="male"
            selectedValue={form.gender}
            onPress={() => handleChange("gender", "male")}
            color="#4081FF"
          />
        </View>

        {/* Date of Birth Field */}
        <FormField
          title="Date of birth"
          type="date"
          value={form.dateOfBirth}
          placeholder="Select your date of birth"
          handleChangeText={(value) => handleChange("dateOfBirth", value)}
          otherStyles="mb-4"
        />

        {/* Save Button */}
        <CustomButton
          text="Save"
          backgroundColor="bg-white"
          textColor="text-black"
          textSize="text-base"
          marginTop="mt-8"
          width="w-38"
          borderStyle="border border-white"
          containerStyle="mx-auto py-2 px-6"
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
}