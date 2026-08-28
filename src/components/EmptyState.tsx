export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="card card-white empty-card">
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  )
}
