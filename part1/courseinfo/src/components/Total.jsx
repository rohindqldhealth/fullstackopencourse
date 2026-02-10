export default function Total({ exercises }) {
  return (
    <p style={{ fontWeight: "bold" }}>
      total of {exercises.reduce((a, b) => a + b)} exercises
    </p>
  );
}
