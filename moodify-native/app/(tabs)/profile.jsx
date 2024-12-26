import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity} from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import RadioButton from "../../components/RadioButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
  });
  const insets = useSafeAreaInsets(); 

  const handleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSave = () => {
    const { name, gender, dateOfBirth } = form;

    if (!name || !gender || !dateOfBirth) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    Alert.alert("Success", "Profile saved successfully!");
    console.log("Saved Profile:", form);

  };

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
      <View className="flex-1 bg-black p-4">
        {/* Profile Picture */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ color: "#FF4081", fontWeight: "bold" }}>Change Picture</Text>
          </TouchableOpacity>
        </View>
    
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
          value="Female"
          selectedValue={form.gender}
          onPress={(value) => handleChange("gender", value)}
          color="#FF4081"
        />
        <RadioButton
          label="Male"
          value="Male"
          selectedValue={form.gender}
          onPress={(value) => handleChange("gender", value)}
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