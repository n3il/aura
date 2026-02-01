export default function ContactPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-gold" style={{ fontFamily: 'var(--font-hubot-sans)' }}>
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          We&apos;d love to hear from you. Reach out to learn more about our work or how you can get involved.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'var(--font-hubot-sans)' }}>
              Get in Touch
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p>info@aurafieldsfoundation.com</p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Location</h3>
                <p>Serving communities worldwide</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'var(--font-hubot-sans)' }}>
              Send a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-[#d9ddc6]/30 bg-background/5 focus:outline-none focus:ring-2 focus:ring-[#d9ddc6]/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-[#d9ddc6]/30 bg-background/5 focus:outline-none focus:ring-2 focus:ring-[#d9ddc6]/50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-[#d9ddc6]/30 bg-background/5 focus:outline-none focus:ring-2 focus:ring-[#d9ddc6]/50"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#d9ddc6] text-background rounded-full font-medium hover:bg-[#d9ddc6]/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
