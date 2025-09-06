import React from 'react';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaFacebook,
  FaUser,
  FaUniversity,
  FaGithub,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import ScrollFloat from '@/Util/Animation/scrollFloat';
import { PersonalInfo } from '@/Interface/TPersonalInfo';
// import { useAuthStore } from '@/Store/auth';

type ContactProps = Pick<
  PersonalInfo,
  | 'fullname'
  | 'address'
  | 'university_name'
  | 'email'
  | 'avatar'
  | 'linkedin_url'
  | 'facebook_url'
  | 'phone_number'
  | 'github'
>;

type ContactItemProps = {
  Icon: IconType;
  text: string;
};

const ContactItem: React.FC<ContactItemProps> = ({ Icon, text }) => (
  <div className="flex items-center gap-3 text-base">
    <Icon className="text-purple-600" size={20} />
    <span>{text}</span>
  </div>
);

const Contact: React.FC<ContactProps> = ({
  address,
  university_name,
  email,
  linkedin_url,
  facebook_url,
  phone_number,
  fullname,
  github,
}) => {
  // const contactEmail = useAuthStore((s) => s.email);
  return (
    <section id="contact" className="px-6 py-24 bg-blue-50">
      <div className="flex flex-col items-center text-center mb-14">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-4 text-5xl font-extrabold text-center text-purple-600">
            Let's Work Together
          </h2>
        </ScrollFloat>
        <p className="text-lg text-center text-gray-500">Ready to bring your ideas to life</p>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 mx-auto md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Get In Touch</h3>
            <div className="space-y-4 text-gray-600">
              {fullname && <ContactItem Icon={FaUser} text={fullname} />}
              {phone_number && <ContactItem Icon={FaPhone} text={phone_number} />}
              {email && <ContactItem Icon={FaEnvelope} text={email} />}
              {address && <ContactItem Icon={FaMapMarkerAlt} text={address} />}
              {university_name && <ContactItem Icon={FaUniversity} text={university_name} />}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">Follow Me</h4>
            <div className="flex gap-4 text-xl text-gray-600">
              {linkedin_url && (
                <a
                  href={linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="transition-colors hover:text-purple-600" size={20} />
                </a>
              )}
              {facebook_url && (
                <a
                  href={facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook className="transition-colors hover:text-purple-600" size={20} />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className="transition-colors hover:text-purple-600" size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <form className="w-full space-y-4">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Your Name"
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg"
            type="email"
            placeholder="your.email@example.com"
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Send message..."
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
