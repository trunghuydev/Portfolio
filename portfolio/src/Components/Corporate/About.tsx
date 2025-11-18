import React from 'react';
import { FiDownload } from 'react-icons/fi';

interface AboutProps {
  fullname: string;
  position_career?: string | null;
  background?: string | null;
  mindset?: string | null;
  avatar?: string;
  university_name?: string;
  address?: string;
  email?: string;
  phone_number?: string;
}

const About: React.FC<AboutProps> = ({
  fullname,
  position_career,
  background,
  mindset,
  avatar,
  university_name,
  address,
  email,
  phone_number,
}) => {
  const handleDownloadCV = () => {
    console.log('Download CV clicked');
  };

  return (
    <section
      id="about"
      className="py-16 lg:py-24 bg-corp-gray-50"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="about-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-corp-navy mb-12 text-center"
        >
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {avatar && (
            <div className="flex justify-center lg:justify-start">
              <img
                src={avatar}
                alt={fullname}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-lg object-cover shadow-lg border-4 border-white"
                loading="lazy"
              />
            </div>
          )}

          <div className="space-y-6">
            {position_career && (
              <div>
                <h3 className="text-xl font-semibold text-corp-navy mb-2">
                  {position_career}
                </h3>
              </div>
            )}

            {background && (
              <div>
                <p className="text-base lg:text-lg text-corp-gray-700 leading-relaxed whitespace-pre-line">
                  {background}
                </p>
              </div>
            )}

            {mindset && (
              <div>
                <h4 className="text-lg font-semibold text-corp-navy mb-2">Mindset</h4>
                <p className="text-base text-corp-gray-700 leading-relaxed">
                  {mindset}
                </p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              {university_name && (
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-corp-navy min-w-[100px]">Education:</span>
                  <span className="text-corp-gray-700">{university_name}</span>
                </div>
              )}
              {address && (
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-corp-navy min-w-[100px]">Location:</span>
                  <span className="text-corp-gray-700">{address}</span>
                </div>
              )}
              {email && (
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-corp-navy min-w-[100px]">Email:</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-corp-accent hover:underline"
                  >
                    {email}
                  </a>
                </div>
              )}
              {phone_number && (
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-corp-navy min-w-[100px]">Phone:</span>
                  <a
                    href={`tel:${phone_number}`}
                    className="text-corp-accent hover:underline"
                  >
                    {phone_number}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-6">
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-2 px-6 py-3 bg-corp-accent text-white font-semibold rounded-md hover:bg-corp-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-corp-accent focus:ring-offset-2"
                aria-label="Download CV"
              >
                <FiDownload className="w-5 h-5" aria-hidden="true" />
                Download Full CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

