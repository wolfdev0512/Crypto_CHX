import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Button } from "../../components";
import { setSize } from "../../helpers/utils";
import { updateWhitePaper, deleteWhitePaper } from "../../api";
// import { storage } from "../../constants/firebase";
import { IAdminDashboard } from "../../constants/types";
import { useNavigate } from "react-router-dom";

const UpdateWhitePaper: React.FC<{
  whitepaper_url: IAdminDashboard["whitepaper_url"];
  refetch: () => Promise<void>;
}> = ({ whitepaper_url, refetch }) => {
  const [whitepaperFile, setWhitepaperFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleWhitepaperSubmit = async () => {
    if (!whitepaperFile) return alert("choose a file to upload");
    setLoading(true);
    // const storageRef = ref(storage, `files/${whitepaperFile.name}`);
    // const uploadTask = uploadBytesResumable(storageRef, whitepaperFile);

    let formData = new FormData();
    formData.append("file", whitepaperFile);

    await updateWhitePaper(formData);
    setWhitepaperFile(null);
    setLoading(false);
    alert("whitepaper uploaded successfully");
    refetch();
    navigate("/admin/");

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //       console.log(downloadURL);
    //       await updateDashboardAPi({ whitepaper_url: downloadURL });
    //       setWhitepaperFile(null);
    //       setLoading(false);
    //       alert("whitepaper uploaded successfully");
    //       refetch();
    //       navigate("/admin/");
    //     });
    //   }
    // );
  };

  const handleDeleteWhitepaper = async () => {
    try {
      setLoading(true);
      await deleteWhitePaper();
      alert("whitepaper deleted successfully");
      navigate("/admin/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="mx pad">
        <div className="dashboard_form">
          <div className="form_input">
            {whitepaper_url ? (
              <div style={{ textAlign: "center" }}>
                <a
                  style={{ fontSize: "2em", color: "#fff", fontWeight: "600" }}
                  href={whitepaper_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Whitepaper
                </a>
              </div>
            ) : (
              <h3>Upload your whitepaper here</h3>
            )}
            {!whitepaper_url && (
              <input
                type="file"
                accept=".pdf"
                onChange={({ target }) => {
                  const file = target.files?.[0];
                  if (!file) {
                    alert("please select a file");
                    setWhitepaperFile(null);
                    return;
                  }
                  if (file.size > setSize())
                    return alert("file size must be less than 5mb");

                  setWhitepaperFile(file);
                }}
              />
            )}
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                disabled={loading || !whitepaper_url}
                variant="secondary"
                onClick={() => handleDeleteWhitepaper()}
              >
                Delete Whitepaper
              </Button>
              <Button
                disabled={loading}
                onClick={() => handleWhitepaperSubmit()}
              >
                Upload Whitepaper
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateWhitePaper;
