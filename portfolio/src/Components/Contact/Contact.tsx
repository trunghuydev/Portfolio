const Contact = () => {
  return (
    <section id="contact" className="px-6 py-12 text-center bg-blue-50">
      <h2 className="mb-4 text-3xl font-bold text-purple-700">Let's Work Together</h2>
      <form className="max-w-md mx-auto space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Your Name" />
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
        <textarea className="w-full p-2 border rounded" placeholder="Message" rows={4}></textarea>
        <button className="px-6 py-2 text-white bg-purple-600 rounded hover:bg-purple-700">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
