import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/common/HeroSection';
import SectionHeader from '@/components/common/SectionHeader';
import AboutNavigation from '@/components/about/AboutNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, TrendingUp, Award } from 'lucide-react';
import StickyContactButton from '@/components/common/StickyContactButton';

function SwipeableTeamCards({ teamMembers }) {
  const [current, setCurrent] = React.useState(0);
  const total = teamMembers.length;

  // Handle swipe
  function handleSwipe(direction) {
    if (direction === 'left' && current < total - 1) setCurrent(current + 1);
    if (direction === 'right' && current > 0) setCurrent(current - 1);
  }

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 480 }}>
      <AnimatePresence initial={false} custom={current}>
        {teamMembers.map((member, idx) => {
          if (Math.abs(idx - current) > 1) return null;
          const isActive = idx === current;
          const isPrev = idx < current;
          const isNext = idx > current;
          return (
            <motion.div
              key={idx}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -120) handleSwipe('left');
                if (info.offset.x > 120) handleSwipe('right');
              }}
              initial={{
                scale: isActive ? 1 : 0.92,
                x: isPrev ? -60 : isNext ? 60 : 0,
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
              animate={{
                scale: isActive ? 1 : 0.92,
                x: isPrev ? -60 : isNext ? 60 : 0,
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0.7,
              }}
              exit={{ opacity: 0, scale: 0.7, x: isPrev ? -120 : 120 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              style={{ position: 'absolute', width: '90%', maxWidth: 520, cursor: isActive ? 'grab' : 'default', zIndex: isActive ? 2 : 1 }}
            >
              <Card className={`group border-2 border-transparent bg-white transition-all duration-200 ${isActive ? 'shadow-2xl shadow-black/60 hover:border-[gold] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)]' : 'shadow-md shadow-black/30'}`}> 
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-blue-900 group-hover:text-[gold] transition-all duration-200">{member.name}</h3>
                      <p className="text-green-700 font-medium">{member.title}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Education:</h4>
                        <p className="text-sm text-gray-700">{member.education}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Experience:</h4>
                        <p className="text-sm text-gray-700">{member.experience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Specialization:</h4>
                        <p className="text-sm text-gray-700">{member.specialization}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* Navigation Arrows - closer to card edges */}
      <div className="absolute left-[6%] top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => handleSwipe('right')}
          disabled={current === 0}
          className={`w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-all ${current === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={() => handleSwipe('left')}
          disabled={current === total - 1}
          className={`w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-all ${current === total - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
}

const OurTeam = () => {
  const teamMembers = [
    {
      name: 'Mr. T.V. Srihari',
      title: 'Promoter Group Member',
      education: 'Chemical Engineer, Post-graduate in Economics',
      experience: '35+ years in Pharma Industry',
      specialization: 'Project Design & Implementation, USFDA Standards, Technology Scaling, Crisis Management',
      description: 'A goal-driven professional with rich experience across functions, with major thrust areas being Designing and Implementation of Projects, Processes & Pollutants Handling, and creating new capabilities in Business Development & Marketing.',
    },
    {
      name: 'Mr. Potluri Suresh Babu',
      title: 'Industry Veteran',
      education: 'Established Family Background in Bulk Drug Industries',
      experience: '30+ years in Bulk Drug and Pharma Industry',
      specialization: 'Manufacturing Equipment for Pharma and Bulk Drug Industries',
      description: 'Hailing from an established family with rich experience in bulk drug industries in Telangana and Andhra Pradesh, he owns a unit manufacturing equipment for Pharma and Bulk Drug industries.',
    },
    {
      name: 'Mr. Seetha Ram Vetcha',
      title: 'Banking & Finance Expert',
      education: 'Post Graduate in Science (Engineering), IRPM, Financial Advising',
      experience: '36 years in Banking (State Bank of India)',
      specialization: 'Banking Operations, Credit, International Banking, Fraud Monitoring',
      description: 'An ardent banker who served through all management cadres at State Bank of India, with extensive experience in Banking Operations, Inspection, Gold Banking, and Administration.',
    },
    {
      name: 'Mr. L. Meher Kumar',
      title: 'Business Development & Marketing Leader',
      education: 'M.Com, MBA (Marketing & Finance)',
      experience: '20 years with Top Organizations',
      specialization: 'Direct Marketing, Channel Management, Credit Operations, Business Development',
      description: 'Previously worked with Apple Credit Corporation, Bharti-Airtel, Vysya Bank, ICFAI, and GMR Hyderabad International Airport. Expertise in Dealer Networking, Receivables Management & Public Relations.',
    },
    {
      name: 'Mr. P Rammohan Patnaik',
      title: 'Financial Advisory & Project Finance',
      education: 'University Ranker in Industrial Relations, First Class in International Trade',
      experience: '20+ years in Banking (Public & Private Sector)',
      specialization: 'Project Finance Syndication, Recovery Management, Land Procurement',
      description: 'Served as Vice President heading Gujarat Zone, with expertise in Banking Operations, Credit, International Banking, and Liquidity Management Services. Currently serves as director on three company boards.',
    },
    {
      name: 'Ms. Kanchumarthi Vasanthi',
      title: 'Civil Engineering & Sustainability Expert',
      education: 'Transportation Engineering (Monash University, Australia), Civil Engineering',
      experience: 'Technical & Feasibility Studies, Environmental Impact Assessment',
      specialization: 'Infrastructure Design, Environmental Clearances, Sustainability Assessment',
      description: 'Strong engineering professional with proven work experience at Monash University and NIRD Hyderabad. Specializes in assessing sustainability and environmental impacts of projects.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <StickyContactButton />

      {/* Hero Section */}
      
      <HeroSection
        title="Our Team"
        // subtitle="Collective Expertise Driving Success"
        description="A diverse team of professionals with specialized experience across multiple domains, united by our commitment to excellence and sustainability."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      <AboutNavigation />

      {/* Team Overview */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container-width">
          <SectionHeader
            subtitle="Team Strength"
            title="200+ Man-Years of Combined Expertise"
            description="Our team represents a powerful combination of industry experience, academic excellence, and specialized knowledge across pharma, infrastructure, finance, and engineering domains."
            centered
            theme="default"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <Award className="w-8 h-8 text-blue-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2 group-hover:text-[gold] transition-all duration-200">200+</div>
              <div className="text-sm text-gray-600">Man-Years Experience</div>
            </div>
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <GraduationCap className="w-8 h-8 text-green-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2 group-hover:text-[gold] transition-all duration-200">30+</div>
              <div className="text-sm text-gray-600">Years Specialized Experience</div>
            </div>
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <Briefcase className="w-8 h-8 text-yellow-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <div className="text-3xl font-bold text-yellow-700 mb-2 group-hover:text-[gold] transition-all duration-200">7</div>
              <div className="text-sm text-gray-600">Senior Professionals</div>
            </div>
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <TrendingUp className="w-8 h-8 text-red-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <div className="text-3xl font-bold text-red-700 mb-2 group-hover:text-[gold] transition-all duration-200">100%</div>
              <div className="text-sm text-gray-600">Commitment to Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container-width">
          <SectionHeader
            subtitle="Meet Our Team"
            title="Professionals Driving Innovation"
            description="Each team member brings unique expertise and experience, contributing to our collective strength in delivering world-class projects."
            centered
            theme="default"
          />

          {/* Swipeable Card Stack for Team Members */}
          <div className="relative flex items-center justify-center min-h-[480px] md:min-h-[520px]">
            <SwipeableTeamCards teamMembers={teamMembers} />
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="section-padding bg-gradient-to-br from-yellow-50 via-white to-green-50">
        <div className="container-width">
          <SectionHeader
            subtitle="Our Culture"
            title="United by Purpose"
            description="Our team culture is built on collaboration, innovation, and a shared commitment to sustainable development and excellence in execution."
            theme="default"
          />

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <Award className="w-7 h-7 text-blue-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-blue-900 group-hover:text-[gold] transition-all duration-200">Excellence</h3>
              <p className="text-gray-600">Commitment to delivering the highest quality in every project and partnership.</p>
            </div>
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200" style={{ animationDelay: '150ms' }}>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <TrendingUp className="w-7 h-7 text-green-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-green-900 group-hover:text-[gold] transition-all duration-200">Innovation</h3>
              <p className="text-gray-600">Embracing new technologies and methodologies to stay ahead of industry trends.</p>
            </div>
            <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200" style={{ animationDelay: '300ms' }}>
              <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[gold]/20 transition-all duration-200">
                <Briefcase className="w-7 h-7 text-yellow-700 group-hover:text-[gold] transition-all duration-200" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-700 group-hover:text-[gold] transition-all duration-200">Collaboration</h3>
              <p className="text-gray-600">Working together across disciplines to achieve exceptional results.</p>
            </div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Excellence Card */}
  <div className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200">
    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-200">
      <img
        src="/images/excel.png"  // ✅ Replace with your actual path or URL
        alt="Excellence Icon"
        className="w-10 h-10 object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold mb-3 text-blue-900 transition-all duration-200">
      Excellence
    </h3>
    <p className="text-gray-600">
      Commitment to delivering the highest quality in every project and partnership.
    </p>
  </div>

  {/* Innovation Card */}
  <div
    className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200"
    style={{ animationDelay: '150ms' }}
  >
    <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-200">
      <img
        src="/images/inno.png"  // ✅ Replace with your actual path or URL
        alt="Innovation Icon"
        className="w-10 h-10 object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold mb-3 text-green-900 transition-all duration-200">
      Innovation
    </h3>
    <p className="text-gray-600">
      Embracing new technologies and methodologies to stay ahead of industry trends.
    </p>
  </div>

  {/* Collaboration Card */}
  <div
    className="text-center fade-in group border-2 border-transparent bg-white rounded-lg p-6 hover:border-[gold] hover:shadow-2xl transition-all duration-200"
    style={{ animationDelay: '300ms' }}
  >
    <div className="w-14 h-14 bg-blue-300 rounded-lg flex items-center justify-center mx-auto mb-4">
      <img
        src="/images/collab.png"  // ✅ Replace with your actual path or URL
        alt="Collaboration Icon"
        className="w-10 h-10 object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold mb-3 text-yellow-700 transition-all duration-200">
      Collaboration
    </h3>
    <p className="text-gray-600">
      Working together across disciplines to achieve exceptional results.
    </p>
  </div>
</div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
