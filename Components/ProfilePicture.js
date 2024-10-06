import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { patchUserPicture } from "../utils/api";

const storage = getStorage();

export default function () {
  const { user, setUser } = useContext(UserContext);
  const [picData, setPicData] = useState(
    "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
  );
  const defaultPic =
    "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";

  useEffect(() => {
    if (defaultPic !== user.avatar_url) {
      getDownloadURL(ref(storage, "profile_images/" + user.user_id)).then(
        (url) => {
          setPicData(url);
        }
      );
    }
  }, []);
  function pressHandler() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    }).then((data) => {
      setPicData(data.assets[0].uri);
      fetch(data.assets[0].uri)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const storageRef = ref(storage, "profile_images/" + user.user_id);
          const uploadTask = uploadBytesResumable(storageRef, blob);
          uploadTask.on(
            "state_changed",
            () => {},
            () => {},
            () => {
              getDownloadURL(storageRef).then((url) => {
                setUser((curr) => {
                  const newUserDetials = { ...curr };
                  newUserDetials.avatar_url = url;
                  return newUserDetials;
                });
                return patchUserPicture(user.user_id, url);
              });
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  return (
    <Pressable style={styles.container} onPress={pressHandler}>
      <Image source={{ uri: picData }} style={styles.picture}></Image>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  picture: { height: 100, width: 100, borderRadius: "100%" },
  container: {},
});
