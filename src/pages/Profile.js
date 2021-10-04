import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import useStorage from "../hooks/useStorage";
import { userRef } from "../config/firebase.config";
import Modal from "../components/Modal/Modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { AnimatePresence, motion } from "framer-motion";
import variants from "../constants/variants";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

const Profile = () => {
  const {
    currentUser: { uid, photoURL },
  } = useSelector((state) => state.auth);
  const [fileName, setFileName] = useState("");
  const { progress, url, loading, uploadImageToFirebaseStorage } = useStorage();
  const [profileImg, setProfileImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(photoURL);
  const [cropModal, setCropModal] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (url && uid) {
      userRef.doc(uid).update({
        photoURL: url,
      });

      setProfileImg(null);
      setFileName("");
    }
  }, [url, uid]);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFileName(acceptedFiles[0].name);
    setProfileImg(await getBase64(acceptedFiles[0]));
    setImgSrc(await getBase64(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleUpload = () => {
    uploadImageToFirebaseStorage(imgSrc, fileName);
  };

  const getCropedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL(
      profileImg.split(",")[0].split(";")[0].split(":")[1]
    );
  };

  return (
    <>
      <AnimatePresence>
        {cropModal && profileImg && (
          <Modal setShowModal={setCropModal}>
            <motion.div
              variants={variants.modal}
              initial="closed"
              animate="opened"
              exit="closed"
              className={`max-w-lg p-1 bg-white shadow-xl flex flex-col gap-2 items-end  `}
            >
              <ReactCrop
                src={profileImg}
                crop={crop}
                onImageLoaded={setImg}
                onChange={(newCrop) => setCrop(newCrop)}
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              />
              <div className="w-60 flex gap-4 py-4 px-4">
                <Button
                  bgColor="yellow"
                  onClick={() => {
                    setCropModal(false);
                  }}
                >
                  cancel
                </Button>
                <Button
                  bgColor="blue"
                  onClick={() => {
                    if (img) {
                      setImgSrc(getCropedImg());
                    }
                    setCropModal(false);
                  }}
                >
                  save
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
      <div className="h-full w-full bg-white shadow-xl rounded-lg p-4 flex md:flex-col">
        <div className="w-72 h-full p-4 flex flex-col items-center gap-4">
          <div
            {...getRootProps()}
            className=" h-60 w-full rounded-lg shadow-xl overflow-hidden cursor-pointer"
          >
            <input {...getInputProps()} />
            <img
              className="h-full w-full object-cover"
              src={imgSrc}
              alt="user profile pic"
            />
          </div>

          {loading && (
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200 w-full">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          )}

          <div className="flex w-full gap-4">
            {profileImg && (
              <Button
                bgColor="yellow"
                disabled={!profileImg || loading}
                onClick={() => setCropModal(true)}
              >
                crop
              </Button>
            )}
            <Button
              bgColor="green"
              disabled={!profileImg || loading}
              onClick={handleUpload}
            >
              upload
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
