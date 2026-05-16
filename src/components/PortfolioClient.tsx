"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function generateWhatsAppLink(phone: string) {
  if (!phone) return "#";
  const cleaned = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleaned}`;
}

function ensureAbsoluteUrl(url: string) {
  if (!url || url === "#") return "#";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return url;
  }
  return `https://${url}`;
}

export default function PortfolioClient({ data }: { data: any }) {
  const dummyData = {
    title: "John Doe",
    bio: "I am a passionate developer creating beautiful and functional web experiences. I love to build things that make a difference.",
    roles: ["Full Stack Developer", "UI/UX Designer", "Software Engineer"],
    languages: ["JavaScript", "TypeScript", "Python", "Go"],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "",
    projects: [
      { name: "Project Alpha", url: "#", image: "", about: "A sleek dashboard application for managing data." },
      { name: "Project Beta", url: "#", image: "", about: "An e-commerce platform with amazing animations." },
      { name: "Project Gamma", url: "#", image: "", about: "A real-time chat application." }
    ],
    socials: {
      linkedIn: "#",
      github: "#",
      x: "#",
      email: "dummy@example.com",
      phone: "+1234567890",
      whatsapp: "+1234567890"
    }
  };

  const pData = data?.title ? data : dummyData;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-8">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl relative mx-auto group">
              {pData.image ? (
                <img src={pData.image} alt={pData.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image</div>
              )}
            </div>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            {pData.title}
          </motion.h1>
          
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-3 mb-8">
            {pData.roles?.map((role: string, i: number) => (
              <span key={i} className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-full text-zinc-300 text-sm md:text-base backdrop-blur-sm">
                {role}
              </span>
            ))}
          </motion.div>
          
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            {pData.bio}
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
            {pData.socials?.linkedIn && (
              <a href={ensureAbsoluteUrl(pData.socials.linkedIn)} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 hover:bg-blue-600 rounded-full transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
            {pData.socials?.github && (
              <a href={ensureAbsoluteUrl(pData.socials.github)} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 hover:bg-zinc-700 rounded-full transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
            )}
            {pData.socials?.x && (
              <a href={ensureAbsoluteUrl(pData.socials.x)} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 hover:bg-zinc-700 rounded-full transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
              </a>
            )}
            {pData.socials?.email && (
              <a href={`mailto:${pData.socials.email}`} className="p-3 bg-zinc-900 hover:bg-red-500 rounded-full transition-colors duration-300">
                <Mail size={24} />
              </a>
            )}
            {pData.socials?.whatsapp && (
              <a href={generateWhatsAppLink(pData.socials.whatsapp)} target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 hover:bg-green-500 rounded-full transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            )}
            {pData.socials?.phone && (
              <a href={`tel:${pData.socials.phone}`} className="p-3 bg-zinc-900 hover:bg-emerald-600 rounded-full transition-colors duration-300">
                <Phone size={24} />
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                Languages
              </h2>
              <div className="flex flex-wrap gap-3">
                {pData.languages?.map((lang: string, i: number) => (
                  <span key={i} className="px-5 py-3 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-300 font-medium hover:border-blue-500/50 transition-colors">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {pData.technologies?.map((tech: string, i: number) => (
                  <span key={i} className="px-5 py-3 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-300 font-medium hover:border-purple-500/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">A collection of projects I've built that show my passion for development and design.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pData.projects?.map((project: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500/30 transition-colors flex flex-col h-full"
              >
                <div className="h-48 bg-zinc-950 w-full relative overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 flex-grow">{project.about}</p>
                  
                  {project.url && project.url !== "#" && (
                    <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                      View Project
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-500 border-t border-zinc-900">
        <p>© {new Date().getFullYear()} {pData.title}. All rights reserved.</p>
        <Link href="/admin" className="text-xs mt-2 inline-block hover:text-zinc-300">Admin Area</Link>
      </footer>
    </div>
  );
}
