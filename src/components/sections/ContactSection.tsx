"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle,
  Mail,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Copy,
  Check,
  Instagram,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactEmail = "contact.gansputra@gmail.com";
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.links.whatsapp;

  // Live WIB / Jakarta Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Message from Portfolio: ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const waMessage = `Hi Ganang, my name is ${formData.name} (${formData.email}). %0A%0AMessage: ${formData.message}`;
        window.open(
          `https://wa.me/${whatsappNumber}?text=${waMessage}`,
          "_blank"
        );
      }
    } catch {
      const waMessage = `Hi Ganang, my name is ${formData.name} (${formData.email}). %0A%0AMessage: ${formData.message}`;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${waMessage}`,
        "_blank"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Mail size={14} />
            <span>Collaboration & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-tight mb-3">
            Let&apos;s Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
              Extraordinary
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
            Have a project in mind, freelance opportunity, or creative collaboration? Send a message or connect through my direct channels.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (7 cols): Modern Glass Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-card/85 border border-border/80 shadow-2xl backdrop-blur-2xl p-7 sm:p-10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-16 flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary shadow-neon">
                    <CheckCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Thank you for reaching out. I&apos;ll review your message and reply as soon as possible.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Your Name
                      </label>
                      <input
                        required
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background/70 border border-border/80 rounded-2xl px-4 py-3.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/40"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background/70 border border-border/80 rounded-2xl px-4 py-3.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/40"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Project Details / Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-background/70 border border-border/80 rounded-2xl px-4 py-3.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background outline-none transition-all resize-none placeholder:text-muted-foreground/40"
                      placeholder="Tell me about your project, goals, or inquiry..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-[0_4px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.22)] transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "SENDING INQUIRY..." : "SEND MESSAGE"}</span>
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column (5 cols): Bento Information & Availability Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-4 w-full"
          >
            {/* Bento Card 1: Live Status & Indonesia Timezone */}
            <div className="p-6 rounded-3xl bg-card/85 border border-border/80 shadow-xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Current Status
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for Work
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                  <Clock size={18} className="text-primary" />
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground block uppercase">
                      Local Time (WIB • GMT+7)
                    </span>
                    <span className="text-xl font-mono font-black text-foreground">
                      {localTime || "Loading..."}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground/70 text-right">
                  Jakarta, ID
                </span>
              </div>
            </div>

            {/* Bento Card 2: One-Click Copy Email */}
            <div className="p-6 rounded-3xl bg-card/85 border border-border/80 shadow-xl backdrop-blur-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-background/60 border border-border/70">
                <span className="text-xs sm:text-sm font-mono text-foreground font-semibold truncate">
                  {contactEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 border",
                    copiedEmail
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : "bg-white/10 hover:bg-white/20 border-white/15 text-foreground"
                  )}
                >
                  {copiedEmail ? (
                    <>
                      <Check size={12} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bento Card 3: Direct Social Links */}
            {/* Bento Card 3: Instant Chat & DM */}
            <div className="p-6 rounded-3xl bg-card/85 border border-border/80 shadow-xl backdrop-blur-xl flex flex-col gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Direct Messaging
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-card/60 hover:bg-card border border-border/80 hover:border-emerald-500/40 text-foreground flex items-center justify-between transition-all group backdrop-blur-md shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <MessageSquare size={14} />
                    </div>
                    <span className="text-xs font-semibold tracking-wide">WhatsApp</span>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-card/60 hover:bg-card border border-border/80 hover:border-pink-500/40 text-foreground flex items-center justify-between transition-all group backdrop-blur-md shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      <Instagram size={14} />
                    </div>
                    <span className="text-xs font-semibold tracking-wide">Instagram DM</span>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
