import { useEffect, useState } from "react";

interface ICourses {
  description: string;
  image_url: string;
}

const HomeCourses = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGM4OTU0ZWZhMWE5NjRlOGFmYzU4YyIsImlhdCI6MTY3ODk4MDQ0NH0.ClAOm6_dA0qJcIGDniplBrNmfpjirVqdP4qn6WqnreA";

  const [courses, setCourses] = useState<ICourses[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const getAllCourses = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/course/all", {
      method: "GET",
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
        setCourses(data.message);
        setIsLoading(false);
        console.log(courses);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        courses.map((data) => (
          <div>
            <h1>{data.description}</h1>
            <p>
              <img src={data.image_url} />
            </p>
          </div>
        ))
      )}
    </>
  );
};

export default HomeCourses;
