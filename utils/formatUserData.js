import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const defaultProfilePic =
  "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";

export default function (users) {
  const promiseArr = users.map((user) => {
    if (user.avatar_url === defaultProfilePic) {
      return defaultProfilePic;
    } else {
      const storageRef = ref(storage, user.avatar_url);
      return getDownloadURL(storageRef);
    }
  });
  return Promise.all(promiseArr);
}
