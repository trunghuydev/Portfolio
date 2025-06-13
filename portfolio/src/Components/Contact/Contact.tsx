import React from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import ScrollFloat from '@/Util/Animation/scrollFloat';

type ContactItemProps = {
  Icon: IconType;
  text: string;
};

const ContactItem: React.FC<ContactItemProps> = ({ Icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <Icon className="text-purple-600" size={20} />
      <span>{text}</span>
    </div>
  );
};

const Contact: React.FC = () => {
  const socialIcons = [
    { icon: FaLinkedin, label: 'LinkedIn' },
    { icon: FaGithub, label: 'GitHub' },
    { icon: FaTwitter, label: 'Twitter' },
    { icon: FaInstagram, label: 'Instagram' },
  ];

  return (
    <section id="contact" className="px-6 py-16 bg-blue-50">
      <div className="flex flex-col items-center mb-10 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-2 text-4xl font-bold text-center text-purple-600">
            Let's Work Together
          </h2>
        </ScrollFloat>
        <p className="mb-10 text-center text-gray-500">Ready to bring your ideas to life</p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Get In Touch</h3>
            <div className="space-y-3 text-gray-600">
              <ContactItem Icon={FaEnvelope} text="alex.chen@email.com" />
              <ContactItem Icon={FaPhone} text="+1 (555) 123-4567" />
              <ContactItem Icon={FaMapMarkerAlt} text="San Francisco, CA" />
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-800 text-md">Follow Me</h4>
            <div className="flex gap-4 text-xl text-gray-600">
              {socialIcons.map(({ icon: Icon, label }) => (
                <a href="#" aria-label={label} key={label}>
                  <Icon className="transition-colors hover:text-purple-600" size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <form className="w-full space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            type="email"
            placeholder="your.email@example.com"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Tell me about your project..."
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
