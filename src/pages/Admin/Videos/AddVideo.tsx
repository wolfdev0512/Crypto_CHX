import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { ReactComponent as AddIcon } from "../../../assets/icons/add.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as VideoIcon } from "../../../assets/icons/file-video.svg";
import { Button } from "../../../components";
import { videoValidationSchema } from "../../../helpers/validationSchema";
import { createVideo } from "../../../api";
import { IVideos } from "../../../constants/types";
import { storage } from "../../../constants/firebase";

interface IAddVideo {
  setEditData: React.Dispatch<React.SetStateAction<IVideos | null>>;
  setVideosData: React.Dispatch<React.SetStateAction<IVideos[]>>;
  editData: IVideos | null;
}

const initialState = {
  question: "",
  answer: "",
};

const AddVideo: React.FC<IAddVideo> = ({
  setVideosData,
  editData,
  setEditData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log('kallol', file);
    if (!file) return;
    setVideoFile(file);
  };

  const handleSubmit = async (values, formValues) => {
    if (!videoFile) return setError("choose a video file");
    try {
      setLoading(true);
      formValues.setSubmitting(true);
      // const storageRef = ref(storage, `files/${videoFile.name}`);
      // const uploadTask = uploadBytesResumable(storageRef, videoFile);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setProgresspercent(progress);
      //   },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
      //     });
      //   }
      // );
      let formData = new FormData();
      formData.append("video", videoFile);
      const {
          data: { data },
      } = await createVideo( formData );
      setVideosData((d) => [...d, data]);
      formValues.setSubmitting(false);
      formValues.resetForm();
      setOpen(false);
      setVideoFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="faqs_header">
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => setOpen((o) => !o)}
        >
          <AddIcon />
          <span>Add Video</span>
        </Button>
      </div>
      {(editData || open) && (
        <Formik
          onSubmit={handleSubmit}
          validationSchema={videoValidationSchema}
          initialValues={editData || initialState}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div
                style={{ display: "flex", justifyContent: "flex-end" }}
                onClick={() => {
                  setEditData(null);
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </div>
              <div className="form_input file_input">
                <label htmlFor="file">
                  <div>
                    <VideoIcon />
                    <p>supported formats MP4,MKV,MIV,AVI</p>
                  </div>
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".mp4,.mkv,.mov,.avi"
                  onChange={handleUpload}
                />
                {error && <div className="error_input">{error}</div>}
              </div>
              <div>{videoFile && <h3>{videoFile.name}</h3>}</div>
              <Button
                type="submit"
                disabled={
                  !videoFile || loading || isSubmitting || progresspercent !== 0
                }
              >
                {"Add"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddVideo;
