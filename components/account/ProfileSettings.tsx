"use client";

// ─── components/account/ProfileSettings.tsx ──────────────────────────────────
// Form for updating display name and password via PUT /api/account.

import { useState } from "react";
import { CheckCircle2, Loader2, KeyRound, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProfileSettingsProps {
  initialName: string;
  email: string;
}

export function ProfileSettings({ initialName, email }: ProfileSettingsProps) {
  // Name update state
  const [name, setName] = useState(initialName);
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  // Password update state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNew, setConfirmNew] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setNameError("Name must be at least 2 characters.");
    setNameLoading(true);
    setNameError(null);
    setNameSuccess(false);
    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Update failed.");
      setNameSuccess(true);
      setTimeout(() => setNameSuccess(false), 3000);
    } catch (err) {
      setNameError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(false);
    if (!currentPassword) return setPwError("Current password is required.");
    if (newPassword.length < 8) return setPwError("New password must be at least 8 characters.");
    if (newPassword !== confirmNew) return setPwError("Passwords do not match.");

    setPwLoading(true);
    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Password update failed.");
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNew("");
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-light tracking-tight text-[--color-foreground]">
          Account Settings
        </h1>
        <p className="text-xs text-[--color-muted-foreground] font-sans mt-1">
          Manage your personal information and security credentials.
        </p>
      </div>

      {/* Profile info card */}
      <div className="bg-[--color-card] rounded-3xl border border-[--color-border] shadow-[--shadow-card] overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[--color-border] bg-[--color-muted]/20">
          <User className="size-4 text-[--color-accent]" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground]">
            Personal Information
          </h2>
        </div>
        <form onSubmit={handleNameUpdate} className="p-6 flex flex-col gap-5">
          {nameError && (
            <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">{nameError}</div>
          )}
          {nameSuccess && (
            <div className="bg-emerald-50 text-emerald-700 text-xs px-4 py-3 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="size-3.5" /> Name updated successfully.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold font-sans text-[--color-foreground]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold font-sans text-[--color-foreground]">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="h-10 px-4 rounded-xl border border-[--color-border] text-sm bg-[--color-muted]/30 text-[--color-muted-foreground] cursor-not-allowed"
              />
              <p className="text-[10px] text-[--color-muted-foreground] font-sans">Email cannot be changed.</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" className="rounded-full" disabled={nameLoading}>
              {nameLoading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Saving...</> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Password card */}
      <div className="bg-[--color-card] rounded-3xl border border-[--color-border] shadow-[--shadow-card] overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[--color-border] bg-[--color-muted]/20">
          <KeyRound className="size-4 text-[--color-accent]" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-[--color-foreground]">
            Change Password
          </h2>
        </div>
        <form onSubmit={handlePasswordUpdate} className="p-6 flex flex-col gap-5">
          {pwError && (
            <div className="bg-red-50 text-red-700 text-xs px-4 py-3 rounded-xl border border-red-200">{pwError}</div>
          )}
          {pwSuccess && (
            <div className="bg-emerald-50 text-emerald-700 text-xs px-4 py-3 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="size-3.5" /> Password updated successfully.
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold font-sans text-[--color-foreground]">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold font-sans text-[--color-foreground]">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 number, 1 symbol"
                  className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold font-sans text-[--color-foreground]">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNew}
                  onChange={(e) => setConfirmNew(e.target.value)}
                  placeholder="Repeat new password"
                  className="h-10 px-4 rounded-xl border border-[--color-border] text-sm focus:border-[--color-ring] focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" className="rounded-full" disabled={pwLoading}>
              {pwLoading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Updating...</> : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
