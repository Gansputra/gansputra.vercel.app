"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { ThreeLanyard } from "@/components/ui/ThreeLanyard";

export const ContactSection = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

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
                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
            }
        } catch (error) {
            const waMessage = `Hi Ganang, my name is ${formData.name} (${formData.email}). %0A%0AMessage: ${formData.message}`;
            window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="py-24 px-6 min-h-screen flex items-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-12">
                            <h2 className="text-5xl font-bold text-foreground mb-4 tracking-tighter uppercase">Let's Collaborate</h2>
                            <p className="text-foreground/40 text-lg max-w-md">
                                Have a project in mind or just want to say hi? My inbox is always open.
                            </p>
                        </div>

                        <div className="glass-morphism p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group border border-border shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-12 flex flex-col items-center gap-6 relative z-10"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
                                        >
                                            <CheckCircle size={48} className="text-primary" />
                                        </motion.div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-bold text-foreground uppercase tracking-tighter">Message Sent!</h3>
                                            <p className="text-foreground/50">Thank you, I will get back to you as soon as possible.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6 relative z-10"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/30 ml-2">Name</label>
                                                <input
                                                    required
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary/50 focus:bg-card/80 outline-none transition-all placeholder:text-foreground/20"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/30 ml-2">Email</label>
                                                <input
                                                    required
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary/50 focus:bg-card/80 outline-none transition-all placeholder:text-foreground/20"
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/30 ml-2">Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary/50 focus:bg-card/80 outline-none transition-all resize-none placeholder:text-foreground/20"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="secondary"
                                                size="lg"
                                                className="w-full group/btn py-6 rounded-2xl"
                                                disabled={isSubmitting}
                                            >
                                                <span className="relative z-10 flex items-center gap-2 font-bold tracking-widest px-4">
                                                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                                                    <Send size={18} className={cn("transition-transform duration-500", isSubmitting ? "translate-x-10 opacity-0" : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1")} />
                                                </span>
                                            </Button>
                                        </motion.div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Right Side: ID Card (Motion Version for Stability) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative w-full min-h-[500px] flex items-center justify-center order-first lg:order-last"
                    >
                        <Suspense fallback={null}>
                            <ThreeLanyard />
                        </Suspense>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
