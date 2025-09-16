import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiEdit2, FiUpload, FiPlus, FiX, FiLogOut } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

// Minimal shape used here (keeps your AuthContext compatible)
type UserWithExtras = {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  skills?: string[];
};

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const auth: any = useAuth();
  const { user, logout } = auth;
  const updateUser: ((p: Partial<UserWithExtras>) => void) | undefined = auth.updateUser;

  // redirect if not logged in
  useEffect(() => {
    if (!user) {
      Swal.fire({ icon: 'info', title: 'Login required', text: 'Please login to view your profile.', timer: 1600, showConfirmButton: false });
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // --- Edit Modal State (only used inside the modal) ---
  const [form, setForm] = useState<UserWithExtras>({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    avatarUrl: user.avatarUrl || '',
    skills: user.skills || [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dlgRef = useRef<HTMLDialogElement | null>(null);

  const openEdit = () => {
    setForm({ name: user.name, email: user.email, bio: user.bio || '', avatarUrl: user.avatarUrl || '', skills: user.skills || [] });
    setSkillInput('');
    setAvatarPreview(null);
    dlgRef.current?.showModal();
  };
  const closeEdit = () => dlgRef.current?.close();

  const handleAvatarPick = () => fileRef.current?.click();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatarPreview(url);
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (form.skills?.includes(s)) return;
    setForm((p) => ({ ...p, skills: [...(p.skills || []), s] }));
    setSkillInput('');
  };
  const removeSkill = (s: string) => setForm((p) => ({ ...p, skills: (p.skills || []).filter((x) => x !== s) }));

  const onSave = () => {
    const patch: Partial<UserWithExtras> = {
      name: form.name,
      bio: form.bio,
      skills: form.skills,
      avatarUrl: avatarPreview ?? form.avatarUrl,
    };
    if (updateUser) {
      updateUser(patch);
      Swal.fire({ icon: 'success', title: 'Saved', timer: 1200, showConfirmButton: false });
    } else {
      Swal.fire({ icon: 'info', title: 'No updateUser in AuthContext', text: 'Add updateUser to persist changes.', timer: 2000, showConfirmButton: false });
    }
    closeEdit();
  };

  // --- VIEW (read-first) ---
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>User Profile • Micro Freelance</title>
      </Helmet>

      {/* Hero Card */}
      <section className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative group">
              <img
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true`}
                alt="avatar"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100 transition-transform group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight truncate">{user.name}</h1>
              <p className="mt-1 text-base-content/70 truncate">{user.email}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn btn-primary gap-2" onClick={openEdit}><FiEdit2 className="w-4 h-4"/> Edit Profile</button>
                <button className="btn btn-ghost gap-2" onClick={logout}><FiLogOut className="w-4 h-4"/> Logout</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="mt-6">
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl">
          <div className="card-body">
            <h2 className="card-title">About</h2>
            <p className="text-base-content/80 whitespace-pre-line leading-relaxed">
              {user.bio && user.bio.trim().length > 0 ? user.bio : 'No bio yet.'}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-6">
        <div className="card bg-base-100 border border-base-300 shadow-sm rounded-2xl">
          <div className="card-body">
            <h2 className="card-title">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(user.skills || []).length === 0 ? (
                <span className="text-base-content/60">No skills.</span>
              ) : (
                user.skills!.map((s: string) => (
                  <span
                    key={s}
                    className="badge badge-outline px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                    title={s}
                  >
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EDIT MODAL */}
      <dialog ref={dlgRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl rounded-2xl">
          <h3 className="font-bold text-lg">Edit Profile</h3>

          <div className="mt-5 grid gap-6">
            {/* avatar picker */}
            <div className="flex items-center gap-4">
              <img
                src={
                  avatarPreview ||
                  form.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random&rounded=true`
                }
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100"
              />
              <div className="flex gap-2">
                <button onClick={handleAvatarPick} className="btn btn-sm">
                  <FiUpload className="w-4 h-4"/> Upload New
                </button>
                {avatarPreview && (
                  <button onClick={() => setAvatarPreview(null)} className="btn btn-sm btn-ghost">Reset</button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            {/* name */}
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-medium">Full Name</span></div>
              <input className="input input-bordered w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>

            {/* email (read only) */}
            <label className="form-control w-full opacity-80">
              <div className="label"><span className="label-text font-medium">Email</span></div>
              <input className="input input-bordered w-full" value={form.email} disabled />
            </label>

            {/* bio */}
            <label className="form-control w-full">
              <div className="label"><span className="label-text font-medium">Bio</span></div>
              <textarea className="textarea textarea-bordered min-h-28" placeholder="Write a short bio..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </label>

            {/* skills add/remove */}
            <div className="space-y-2">
              <div className="label"><span className="label-text font-medium">Skills</span></div>
              <div className="flex flex-wrap gap-2">
                {(form.skills || []).map((s) => (
                  <span key={s} className="badge badge-outline px-3 py-3 rounded-xl gap-1">
                    {s}
                    <button type="button" aria-label={`remove ${s}`} onClick={() => removeSkill(s)} className="ml-1">
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {(form.skills || []).length === 0 && (
                  <span className="text-base-content/60">Add your first skill.</span>
                )}
              </div>
              <div className="join">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="e.g. Java, React, DSA"
                  className="input input-bordered join-item w-full md:w-96"
                />
                <button className="btn join-item" onClick={addSkill}><FiPlus className="w-4 h-4"/> Add</button>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={onSave}>Save</button>
            <button className="btn btn-ghost" onClick={closeEdit}>Cancel</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UserProfile;
