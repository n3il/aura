export default function EventsPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-gold font-bold mb-8" style={{ fontFamily: 'var(--font-hubot-sans)' }}>
          Events
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Join us at our upcoming events and be part of our community initiatives.
        </p>

        <div className="space-y-8 text-muted">
          <span>There are no events currently scheduled.</span>
        </div>
      </div>
    </section>
  );
}
