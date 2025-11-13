import React, { useState } from 'react';
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
import { useAuthStore } from '@/Store/auth';
import { useSendEmail } from '@/Hook/useSendEmail';

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
  const accessToken = useAuthStore((state) => state.accessToken);
  const sendEmailMutation = useSendEmail(accessToken || '');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessToken) {
      alert('Vui lòng đăng nhập để gửi email!');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    sendEmailMutation.mutate({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: formData.subject || 'Contact from Portfolio',
    }, {
      onSuccess: () => {
        setFormData({ name: '', email: '', message: '', subject: '' });
      },
    });
  };

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

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full p-4 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Subject (optional)"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Send message..."
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
          <button
            type="submit"
            disabled={sendEmailMutation.isPending || !accessToken}
            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sendEmailMutation.isPending ? 'Đang gửi...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
