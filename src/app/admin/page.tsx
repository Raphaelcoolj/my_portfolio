"use client";

import { useState, useEffect } from "react";
import { getPortfolioData, updatePortfolioData, uploadImage } from "@/lib/actions";
import { Plus, Trash, UploadCloud, Loader2 } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    const res = await getPortfolioData();
    if (res) {
      setData(res);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'project', index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const id = type === 'profile' ? 'profile' : `project-${index}`;
    setUploading(id);

    const formData = new FormData();
    formData.append("file", file);

    const res: any = await uploadImage(formData);
    setUploading(null);

    if (res.success) {
      if (type === 'profile') {
        setData({ ...data, image: res.url });
      } else if (typeof index === 'number') {
        const newProjects = [...data.projects];
        newProjects[index].image = res.url;
        setData({ ...data, projects: newProjects });
      }
    } else {
      alert("Upload failed: " + res.error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "oghenerurie@123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updatePortfolioData(data);
    setLoading(false);
    if (res.success) {
      alert("Portfolio updated successfully");
    } else {
      alert("Error updating portfolio");
    }
  };

  const handleAddProject = () => {
    setData({
      ...data,
      projects: [...(data.projects || []), { name: "", url: "", image: "", about: "" }],
    });
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    setData({ ...data, projects: newProjects });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-zinc-900 p-6 sm:p-8 rounded-xl w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold transition text-sm sm:text-base">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-blue-500">Portfolio Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-800 pb-2">Basic Info</h2>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Profile Image</label>
              <div className="flex flex-wrap items-center gap-4">
                {data.image && (
                  <img src={data.image} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover" />
                )}
                <label className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded cursor-pointer transition">
                  {uploading === 'profile' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <UploadCloud size={18} />
                  )}
                  <span>{uploading === 'profile' ? "Uploading..." : "Upload Image"}</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'profile')}
                    disabled={uploading !== null}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Name / Title</label>
              <input type="text" value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} className="w-full p-3 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Bio</label>
              <textarea value={data.bio || ""} onChange={e => setData({...data, bio: e.target.value})} rows={4} className="w-full p-3 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-800 pb-2">Skills & Roles (comma separated)</h2>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Roles</label>
              <input type="text" value={(data.roles || []).join(", ")} onChange={e => setData({...data, roles: e.target.value.split(",").map((s: string) => s.trim())})} className="w-full p-3 bg-zinc-800 rounded focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Languages</label>
              <input type="text" value={(data.languages || []).join(", ")} onChange={e => setData({...data, languages: e.target.value.split(",").map((s: string) => s.trim())})} className="w-full p-3 bg-zinc-800 rounded focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Technologies</label>
              <input type="text" value={(data.technologies || []).join(", ")} onChange={e => setData({...data, technologies: e.target.value.split(",").map((s: string) => s.trim())})} className="w-full p-3 bg-zinc-800 rounded focus:outline-none text-sm" />
            </div>
          </div>

          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold border-b border-zinc-800 pb-2">Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['linkedIn', 'github', 'x', 'email', 'phone', 'whatsapp'].map((social) => (
                <div key={social}>
                  <label className="block text-sm text-zinc-400 mb-1 capitalize">{social}</label>
                  <input type="text" value={data.socials?.[social] || ""} onChange={e => setData({...data, socials: {...data.socials, [social]: e.target.value}})} className="w-full p-3 bg-zinc-800 rounded focus:outline-none text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-2 gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold">Projects</h2>
              <button type="button" onClick={handleAddProject} className="flex items-center gap-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded">
                <Plus size={16} /> Add Project
              </button>
            </div>
            <div className="space-y-6">
              {(data.projects || []).map((project: any, index: number) => (
                <div key={index} className="p-4 border border-zinc-800 rounded-lg relative space-y-3">
                  <button type="button" onClick={() => handleRemoveProject(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-400">
                    <Trash size={18} />
                  </button>
                  <div className="pr-10">
                    <label className="block text-sm text-zinc-400 mb-1">Project Name</label>
                    <input type="text" value={project.name || ""} onChange={e => {
                      const newProjects = [...data.projects];
                      newProjects[index].name = e.target.value;
                      setData({...data, projects: newProjects});
                    }} className="w-full p-2 bg-zinc-800 rounded focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Project URL</label>
                    <input type="text" value={project.url || ""} onChange={e => {
                      const newProjects = [...data.projects];
                      newProjects[index].url = e.target.value;
                      setData({...data, projects: newProjects});
                    }} className="w-full p-2 bg-zinc-800 rounded focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">About</label>
                    <textarea value={project.about || ""} rows={3} onChange={e => {
                      const newProjects = [...data.projects];
                      newProjects[index].about = e.target.value;
                      setData({...data, projects: newProjects});
                    }} className="w-full p-2 bg-zinc-800 rounded focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Project Image</label>
                    <div className="flex flex-wrap items-center gap-4">
                      {project.image && (
                        <img src={project.image} alt="Project" className="w-20 h-14 sm:w-24 sm:h-16 rounded object-cover" />
                      )}
                      <label className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded text-sm cursor-pointer transition">
                        {uploading === `project-${index}` ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <UploadCloud size={16} />
                        )}
                        <span>{uploading === `project-${index}` ? "Uploading..." : "Upload Image"}</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'project', index)}
                          disabled={uploading !== null}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
