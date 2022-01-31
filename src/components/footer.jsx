export default function Footer({ lists }) {
  return (
    <>
      {lists.map(list => (
        <li key={list.id}>List-{list.id} footer controls</li>
      ))}
    </>
  )
}
