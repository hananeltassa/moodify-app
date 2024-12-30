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

const ProfileScreen = () => {
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

  const handleSave = () => {
    const { name, gender, dateOfBirth, profilePic } = form;

    if (!name || !gender || !dateOfBirth) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    dispatch(
      setUser({
        ...user,
        name,
        gender,
        dateOfBirth,
        profilePic,
      })
    );

    Alert.alert("Success", "Profile saved successfully!");
    console.log("Saved Profile:", form);
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
      console.error("Error picking image:", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>User data is unavailable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex-1 bg-black">
        {/* Profile Picture Section */}
        <LinearGradient
          colors={["#FF6100", "#B90039"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            alignItems: "center",
            marginBottom: 20,
            padding: 50,
            position: "relative",
          }}
        >
          <Image
            source={
              typeof form.profilePic === "string" 
                ? { uri: form.profilePic }
                : form.profilePic
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
          <TouchableOpacity
            onPress={handlePickImage}
            style={{
              position: "absolute",
              bottom: 50,
              right: 165,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 5,
              elevation: 5,
            }}
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
        <Text className="text-white text-2xl font-Avenir-Bold mb-2 p-4">Gender</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
};

export default ProfileScreen;