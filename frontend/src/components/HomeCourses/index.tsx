import { useEffect } from "react";

const HomeCourses = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGM4OTU0ZWZhMWE5NjRlOGFmYzU4YyIsImlhdCI6MTY3ODk4MDQ0NH0.ClAOm6_dA0qJcIGDniplBrNmfpjirVqdP4qn6WqnreA";

  const getAllCourses = () => {
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
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default HomeCourses;
