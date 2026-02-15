"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";

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
            // Menggunakan Web3Forms (Lebih dermawan jatah gratisnya: 250/bulan)
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
                // Fallback if API Error: Use WhatsApp (100% Free & Unlimited)
                const waMessage = `Hi Ganang, my name is ${formData.name} (${formData.email}). %0A%0AMessage: ${formData.message}`;
                window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
            }
        } catch (error) {
            // If offline or error, fallback to WhatsApp
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
        <section id="contact" className="py-24 px-6 bg-[#050505]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Let's Collaborate</h2>
                    <p className="text-white/50">
                        Have a project in mind or just want to say hi? My inbox is always open.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="glass-morphism p-8 md:p-12 rounded-3xl"
                >
                    {isSubmitted ? (
                        <div className="text-center py-12 flex flex-col items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                                <CheckCircle size={40} className="text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                            <p className="text-white/50">Thank you, I will get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="secondary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "SENDING..." : "SEND MESSAGE"} <Send size={18} />
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
