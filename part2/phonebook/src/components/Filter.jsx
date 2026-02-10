export default function Filter({ setFilter, persons }) {
  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue),
    );
    setFilter(filtered);
  };
  return (
    <div>
      filter shown with <input onChange={handleFilter} />
    </div>
  );
}
