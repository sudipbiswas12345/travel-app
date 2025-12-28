'use client';
import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");
  
    setTimeout(() => {
      setStatus("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  }, []);

  return (
    <>
      <section className="relative h-[65vh]">
        <img
          src="/images/slider1.jpg"
          alt="Contact banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-cyan-800/60" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Ready to plan your dream vacation? We'd love to hear from you. 
              Our travel experts are here to make your journey unforgettable.
            </p>
          </div>
        </div>
      </section>

     
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-4 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-8">
             
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="group p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mt-1 flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <p className="text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                        info@travelly.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mt-1 flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors">+91 123 456 7890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS EMBED */}
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Our Location
                  </h3>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15039011.807474006!2d53.83643931660158!3d23.037216400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e851ea3fca093%3A0xfcf05534e5a8057a!2sTrip123!5e0!3m2!1sen!2sus!4v1766207348965!5m2!1sen!2sus" width="600" height="300" loading="lazy"></iframe>
              </div>

             
              <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl border border-emerald-200/50 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🕒 Office Hours</h3>
                <p className="text-sm text-gray-600">Mon - Fri: 9AM - 8PM | Sat - Sun: 10AM - 6PM</p>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-400 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-700"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-400 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-700"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-400 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-700"
                    placeholder="What can we help you with?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-400 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 resize-vertical transition-all duration-200 bg-white/50 backdrop-blur-sm text-gray-700"
                    placeholder="Tell us about your dream vacation..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-700 hover:to-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </button>
                {status && (
                  <div className={`p-4 rounded-2xl text-center font-semibold border ${
                    status.includes("Thank") 
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
