import InputForm from "../InputForm";
import {
  Container,
  UploadCard,
  ContentCard,
  InputFile,
  LabelFile,
  FileContainer,
  UploadContainer,
} from "./styled";
import { FormEvent, useRef, useState } from "react";
import ButtonForm from "../ButtonForm";
const UploadCourse = () => {
  const [image, setImage] = useState<any>("");
  const [video, setVideo] = useState<any>("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const descriptionRef = useRef<HTMLInputElement>(null);

  const secure_url = import.meta.env.VITE_CLOUDNAME;

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ms6fdgh0");

    fetch(`https://api.cloudinary.com/v1_1/${secure_url}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setImageUrl(data.url);
      });
  };

  const uploadVideo = () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "ms6fdgh0");

    fetch(`https://api.cloudinary.com/v1_1/${secure_url}/video/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setVideoUrl(data.url);
      });
  };

  const contentUrlToDatabase = async (imageUrl: string, videoUrl: string) => {
    const data = {
      image_url: imageUrl,
      video_url: videoUrl,
      description: descriptionRef.current?.value,
    };

    const user = JSON.parse(localStorage.getItem("user") || "");
    const token = user.token;

    fetch("http://localhost:3000/course/upload", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const sendContentToDatabase = async () => {
    uploadImage();
    uploadVideo();
    await contentUrlToDatabase(imageUrl, videoUrl);
  };

  return (
    <Container>
      <UploadCard>
        <h1>Upload Course</h1>
        <ContentCard onSubmit={(e) => e.preventDefault()}>
          <InputForm
            type="text"
            placeholder="description"
            inputRef={descriptionRef}
          />
          <FileContainer>
            <UploadContainer>
              <InputFile
                type="file"
                id="fileInput"
                accept=".jpg, .jpeg, .png"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setImage(event.target.files[0]);
                  }
                }}
              />
              <LabelFile htmlFor="fileInput">Upload Image</LabelFile>
            </UploadContainer>

            <UploadContainer>
              <InputFile
                type="file"
                id="videoinput"
                accept=".mp4"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setVideo(event.target.files[0]);
                  }
                }}
              />
              <LabelFile htmlFor="videoinput">Upload Video</LabelFile>
            </UploadContainer>
          </FileContainer>
          <ButtonForm onClick={sendContentToDatabase}>Send</ButtonForm>
        </ContentCard>
      </UploadCard>
    </Container>
  );
};

export default UploadCourse;
