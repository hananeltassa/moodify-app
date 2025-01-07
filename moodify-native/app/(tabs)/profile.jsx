import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { deleteToken } from "../../utils/secureStore";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import RadioButton from "../../components/RadioButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import { clearPlaylists } from "../../redux/slices/playlistSlice";
import { stopPlayback } from "../../redux/slices/playbackSlice";
import { clearPlaylistTracks } from "../../redux/slices/playlistTracksSlice";
import { useRouter } from "expo-router";
import { updateUserProfile } from "../../api/user";
import Icon from "react-native-vector-icons/Feather";
import images from "../../constants/images";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  //console.log("Redux user state:", user);

  const [form, setForm] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth  || "",
    profilePic: user?.profilePic || images.user,
  });

  //console.log("Initialized form state:", form);

  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await deleteToken("jwtToken");

      dispatch(clearUser());
      dispatch(clearPlaylists());
      dispatch(stopPlayback());
      dispatch(clearPlaylistTracks());

      router.replace("/onboarding");

      Alert.alert("Logged Out", "You have been successfully logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  const handleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    setIsModified(true);
  };

  const handleSave = async () => {
    const updatedProfile = {};

    if (form.name !== user.name) updatedProfile.name = form.name;
    if (form.gender !== user.gender) updatedProfile.gender = form.gender;
    if (form.dateOfBirth !== user.birthday) updatedProfile.birthday = form.dateOfBirth;

    if (
      form.profilePic !== user.profilePic &&
      form.profilePic !== images.user &&
      typeof form.profilePic === "string"
    ) {
      updatedProfile.profile_picture = form.profilePic;
    }

    // Debugging the updated profile before API call
    console.log("Updated profile payload:", updatedProfile);

    if (Object.keys(updatedProfile).length === 0) {
      Alert.alert("No changes detected", "Please make changes before saving.");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUserProfile(updatedProfile);
      console.log("API response - updated user:", updatedUser);

      dispatch(setUser(updatedUser));
      setIsModified(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
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
        setIsModified(true);
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
      className="flex-1 bg-black"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View className="flex-1">
        <TouchableOpacity
          onPress={handleLogout}
          className="absolute bg-white/10 p-2 rounded-full z-10"
          style={{
            top: insets.top - 40,
            right: insets.right + 10,
          }}
        >
          <Icon name="log-out" size={24} color="white" />
        </TouchableOpacity>

        {/* Profile Content */}
        <LinearGradient
          colors={["#FF6100", "#B90039"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            alignItems: "center",
            marginBottom: 30,
            padding: 70,
            position: "relative",
          }}
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
            className="absolute bg-white rounded-full p-1.5 shadow-md"
            style={{
              bottom: 65,
              right: 165,
            }}
          >
            <Icon name="edit-2" size={16} color="#FF6100" />
          </TouchableOpacity>
        </LinearGradient>

        <FormField
          title="Name"
          value={form.name}
          placeholder="Enter your name"
          handleChangeText={(value) => handleChange("name", value)}
          otherStyles="mb-4"
        />

        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginBottom: 6 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginRight: 50 }}>Gender:</Text>

          {/* Gender Options */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 80, marginTop: 20 }}>
            {/* Female Option */}
            <RadioButton
              label="Female"
              value="female"
              selectedValue={form.gender}
              onPress={(value) => handleChange("gender", value)}
              color="#FF4081"
            />

            {/* Male Option */}
            <RadioButton
              label="Male"
              value="male"
              selectedValue={form.gender}
              onPress={(value) => handleChange("gender", value)}
              color="#4081FF"
            />
          </View>
        </View>

        <FormField
          title="Date of birth"
          type="date"
          value={form.dateOfBirth}
          placeholder="Select your date of birth"
          handleChangeText={(value) => handleChange("dateOfBirth", value)}
          otherStyles="mb-4"
        />

        {isModified && (
          <CustomButton
            text="Save"
            backgroundColor="bg-white"
            textColor="text-black"
            textSize="text-base"
            marginTop="mt-6"
            width="w-38"
            borderStyle="border border-white"
            containerStyle="mx-auto py-2 px-6"
            onPress={handleSave}
          />
        )}
      </View>
    </SafeAreaView>
  );
}