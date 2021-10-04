import { useState } from "react";
import { storage } from "../config/firebase.config";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const uploadImageToFirebaseStorage = async (file, fileName) => {
    const storageRef = storage.ref(`images/${fileName}`);

    storageRef
      .putString(file.split(",")[1], "base64", {
        contentType: file.split(",")[0].split(";")[0].split(":")[1],
      })
      .on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          setProgress(
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
          );
        },
        (err) => {
          setLoading(false);
          setError(err);
        },
        async () => {
          setLoading(false);
          setUrl(await storageRef.getDownloadURL());
        }
      );
  };

  return {
    progress,
    error,
    url,
    loading,
    uploadImageToFirebaseStorage,
  };
};

export default useStorage;
