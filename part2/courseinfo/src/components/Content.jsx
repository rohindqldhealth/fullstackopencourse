export default function Content({ content }) {
  return (
    <div>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}
