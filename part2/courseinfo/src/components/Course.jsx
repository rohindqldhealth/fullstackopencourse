import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

export default function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  );
}
