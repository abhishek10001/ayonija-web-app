import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  Target, 
  Heart, 
  ArrowRight,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  

const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-std via-primary-dark to-primary-dark text-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-12 md:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 text-sm font-medium">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Trusted by healthcare professionals worldwide
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">About <span className="text-white/90">PharmaHealth</span></h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                We're dedicated to improving global healthcare through innovation, quality, and accessibility. 
                For over two decades, PharmaHealth has been delivering trusted pharmaceutical products to healthcare 
                professionals and patients worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-white text-primary-dark font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">
                  Get in Touch
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="#our-story" className="inline-flex items-center px-6 py-3 bg-transparent border border-white/30 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                  Our Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="md:w-1/3 md:pl-12 flex justify-center">
              <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full shadow-xl">
                <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-center p-8 overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-5xl font-bold">20+</p>
                    <p className="text-sm uppercase tracking-wider mt-1">Years of Excellence</p>
                  </div>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="our-story" className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-12 bg-primary-std"></div>
                <span className="text-primary-std font-medium">WHO WE ARE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-dark">Our Mission & Vision</h2>
              
              <div className="space-y-10">
                <div className="relative pl-8 border-l-2 border-primary-std">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-std flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Our Mission</h3>
                  <p className="text-neutral-std leading-relaxed">
                    To enhance health outcomes through accessible and affordable pharmaceutical solutions, ensuring that 
                    healthcare needs are met with products of the highest quality and efficacy. We strive to be a trusted 
                    partner in the healthcare journey of our customers.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-primary-std">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-std flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-neutral-dark">Our Vision</h3>
                  <p className="text-neutral-std leading-relaxed">
                    To be a global leader in pharmaceutical innovation, recognized for our commitment to improving health 
                    and well-being through sustainable practices, scientific research, and customer-centric approaches to 
                    healthcare solutions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex items-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-neutral-light rounded-2xl overflow-hidden shadow-md">
                  <img src="/api/placeholder/600/600" alt="Laboratory research" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-neutral-light rounded-2xl overflow-hidden shadow-md translate-y-8">
                  <img src="/api/placeholder/600/600" alt="Healthcare professional" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-neutral-light rounded-2xl overflow-hidden shadow-md -translate-y-8">
                  <img src="/api/placeholder/600/600" alt="Patient care" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-neutral-light rounded-2xl overflow-hidden shadow-md">
                  <img src="/api/placeholder/600/600" alt="Pharmaceutical manufacturing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary-std"></div>
              <span className="text-primary-std font-medium uppercase tracking-wider text-sm">Our Principles</span>
              <div className="h-px w-8 bg-primary-std"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-neutral-dark">Our Core Values</h2>
            <p className="text-neutral-std max-w-2xl mx-auto text-lg">
              These principles guide our operations, shape our culture, and define our commitment to our customers,
              partners, and the healthcare community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary-std" />,
                title: 'Integrity',
                description: 'We uphold the highest ethical standards in all our operations, ensuring transparency and honesty in our interactions.'
              },
              {
                icon: <Award className="h-10 w-10 text-primary-std" />,
                title: 'Excellence',
                description: 'We are committed to delivering products and services of exceptional quality that exceed industry standards.'
              },
              {
                icon: <Users className="h-10 w-10 text-primary-std" />,
                title: 'Collaboration',
                description: 'We believe in the power of partnerships and teamwork to achieve shared goals and drive innovation.'
              },
              {
                icon: <Clock className="h-10 w-10 text-primary-std" />,
                title: 'Reliability',
                description: 'We are dependable partners who deliver on our promises, ensuring consistency in all we do.'
              },
              {
                icon: <Target className="h-10 w-10 text-primary-std" />,
                title: 'Innovation',
                description: 'We continuously explore new ideas and approaches to advance healthcare solutions.'
              },
              {
                icon: <Heart className="h-10 w-10 text-primary-std" />,
                title: 'Compassion',
                description: 'We approach healthcare with empathy, understanding the human impact of our work.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-neutral-light p-8 rounded-2xl shadow-md border border-neutral-light hover:shadow-xl transition-all group hover:-translate-y-1">
                <div className="rounded-2xl bg-primary-light w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-primary-std/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-dark group-hover:text-primary-std transition-colors">{value.title}</h3>
                <p className="text-neutral-std leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary-std"></div>
              <span className="text-primary-std font-medium uppercase tracking-wider text-sm">Our History</span>
              <div className="h-px w-8 bg-primary-std"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-neutral-dark">Our Journey</h2>
            <p className="text-neutral-std max-w-2xl mx-auto text-lg">
              From humble beginnings to industry leadership, explore the key milestones that have shaped our company over two decades.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-neutral-std/20 hidden md:block"></div>
            
            <div className="space-y-20 relative">
              {[
                {
                  year: '2003',
                  title: 'Foundation',
                  description: 'PharmaHealth was founded with a vision to provide affordable healthcare solutions.',
                  side: 'left'
                },
                {
                  year: '2008',
                  title: 'Research Expansion',
                  description: 'Established our first state-of-the-art research facility focused on innovative therapeutic areas.',
                  side: 'right'
                },
                {
                  year: '2013',
                  title: 'Global Reach',
                  description: 'Expanded operations to 15 countries, establishing a global presence in key healthcare markets.',
                  side: 'left'
                },
                {
                  year: '2018',
                  title: 'Innovation Leadership',
                  description: 'Received multiple awards for our breakthrough developments in chronic disease management.',
                  side: 'right'
                },
                {
                  year: '2023',
                  title: 'Sustainable Future',
                  description: 'Launched our sustainability initiative to ensure environmentally responsible practices across all operations.',
                  side: 'left'
                }
              ].map((milestone, index) => (
                <div key={index} className={`flex flex-col ${milestone.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className={`md:w-1/2 ${milestone.side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-neutral-light hover:shadow-lg transition-all max-w-lg mx-auto md:mx-0 mb-8 md:mb-0">
                      <span className="inline-block text-sm font-semibold text-primary-std mb-2 uppercase tracking-wider">
                        <Calendar className="inline-block mr-2 h-4 w-4" />
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl font-bold mb-4 text-neutral-dark">{milestone.title}</h3>
                      <p className="text-neutral-std">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-[60px] relative">
                    <div className="hidden md:block absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary-std text-white flex items-center justify-center shadow-lg z-10">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary-std"></div>
              <span className="text-primary-std font-medium uppercase tracking-wider text-sm">Meet Our Team</span>
              <div className="h-px w-8 bg-primary-std"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-neutral-dark">Our Leadership Team</h2>
            <p className="text-neutral-std max-w-2xl mx-auto text-lg">
              Meet the experienced professionals who guide our organization with vision, expertise, and a commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: 'Dr. Sarah Johnson',
                position: 'Chief Executive Officer',
                bio: 'With over 25 years in pharmaceutical leadership, Dr. Johnson brings strategic vision and industry expertise.',
                social: {twitter: '#', linkedin: '#'}
              },
              {
                name: 'Dr. Michael Chen',
                position: 'Chief Research Officer',
                bio: 'Leading our research initiatives with a focus on innovative therapeutic solutions and clinical excellence.',
                social: {twitter: '#', linkedin: '#'}
              },
              {
                name: 'Rebecca Williams',
                position: 'Chief Operations Officer',
                bio: 'Ensures operational efficiency and excellence across our global manufacturing and distribution network.',
                social: {twitter: '#', linkedin: '#'}
              }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-neutral-light rounded-2xl shadow-md overflow-hidden transition-all group-hover:shadow-xl">
                  <div className="aspect-[3/4] bg-neutral-std/10 relative overflow-hidden">
                    <img src="/api/placeholder/600/800" alt={member.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-6 text-white">
                        <div className="flex gap-4">
                          <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-primary-std transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                          </a>
                          <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-primary-std transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-dark group-hover:text-primary-std transition-colors">{member.name}</h3>
                    <p className="text-primary-std font-medium mb-4">{member.position}</p>
                    <p className="text-neutral-std">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/carriers" className="inline-flex items-center px-8 py-4 bg-primary-std text-white font-medium rounded-lg shadow-md hover:bg-primary-dark transition-all hover:shadow-lg">
              Join Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-primary-std text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/3 blur-3xl"></div>
          <div className="absolute left-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 -translate-x-1/4 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner with PharmaHealth?</h2>
          <p className="max-w-2xl mx-auto mb-10 text-white/90 text-lg">
            Whether you're a healthcare provider, pharmacy, or potential collaborator, we're here to support your needs
            with our pharmaceutical expertise and quality products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-white/80 mb-4">Send us your inquiries</p>
              <a href="mailto:contact@pharmahealth.com" className="text-white font-medium hover:underline">contact@pharmahealth.com</a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-white/80 mb-4">Mon-Fri, 9am-5pm EST</p>
              <a href="tel:+18005551234" className="text-white font-medium hover:underline">+1 (800) 555-1234</a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-white/80 mb-4">Our headquarters</p>
              <address className="text-white font-medium not-italic">123 Pharma Way, Health City</address>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-primary-dark font-medium rounded-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/products" className="inline-flex items-center px-8 py-4 bg-transparent border border-white/30 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/10 transition-all">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
        </div>
    <Footer />
    </>
  );
};

export default AboutUs;