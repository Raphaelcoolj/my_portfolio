import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  url: { type: String, default: "" },
  image: { type: String, default: "" },
  about: { type: String, default: "" },
});

const SocialsSchema = new mongoose.Schema({
  linkedIn: { type: String, default: "" },
  github: { type: String, default: "" },
  x: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
});

const PortfolioSchema = new mongoose.Schema({
  image: { type: String, default: "" },
  bio: { type: String, default: "" },
  title: { type: String, default: "" },
  roles: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  socials: { type: SocialsSchema, default: () => ({}) },
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

export default Portfolio;
