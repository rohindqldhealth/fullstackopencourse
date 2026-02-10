export default function Persons({ filtered, deletePerson }) {
  return (
    <div>
      {filtered.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
}
