import InputForm from "../InputForm";
import {
  Container,
  UploadCard,
  ContentCard,
  InputFile,
  LabelFile,
  FileContainer,
} from "./styled";
import { FormEvent, useRef, useState } from "react";
import ButtonForm from "../ButtonForm";
const UploadCourse = () => {
  const [image, setImage] = useState<any>("");
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
        imageUrlToDatabase(data.url);
      });
  };

  const imageUrlToDatabase = async (url: string) => {
    const data = {
      image_url: url,
      video_url: "empty",
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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <Container>
      <UploadCard>
        <h1>Upload Course</h1>
        <ContentCard onSubmit={submitHandler}>
          <InputForm
            type="text"
            placeholder="description"
            inputRef={descriptionRef}
          />
          <FileContainer>
            <InputFile
              type="file"
              id="fileInput"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                  setImage(event.target.files[0]);
                }
              }}
            />
            <LabelFile htmlFor="fileInput">Upload Image</LabelFile>
          </FileContainer>
          <ButtonForm onClick={uploadImage}>Send</ButtonForm>
        </ContentCard>
      </UploadCard>
    </Container>
  );
};

export default UploadCourse;
