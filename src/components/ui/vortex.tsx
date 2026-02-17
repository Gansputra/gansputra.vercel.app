"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CyberGridProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    particleCount?: number;
    rangeY?: number;
    baseHue?: number;
    rangeHue?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    backgroundColor?: string;
    showDust?: boolean;
}

export const Vortex = ({ children, className, containerClassName, ...props }: CyberGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const themeRef = useRef(theme);
    const dustParticles = useRef<any[]>([]);
    const auroraTime = useRef(0);

    const initDust = (width: number, height: number) => {
        const count = 50;
        dustParticles.current = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -Math.random() * 0.5 - 0.2,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5,
        }));
    };

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let offset = 0;
        const stars: { x: number; y: number; size: number; burst: number; speed: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Generate Stars
            stars.length = 0;
            const starCount = props.particleCount || (window.innerWidth < 768 ? 50 : 150);
            const rangeY = props.rangeY || canvas.height * 0.6;

            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * rangeY,
                    size: Math.random() * 1.2,
                    burst: Math.random() * Math.PI * 2,
                    speed: 0.05 + Math.random() * 0.1 // Random slow speed
                });
            }

            if (props.showDust) {
                initDust(canvas.width, canvas.height);
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = themeRef.current === "dark";
            auroraTime.current += 0.005;

            // Draw a global background gradient for depth
            if (isDark) {
                const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                bgGradient.addColorStop(0, "#0a0a0a");
                bgGradient.addColorStop(0.5, "#050505");
                bgGradient.addColorStop(1, "#020202");
                ctx.fillStyle = bgGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else {
                // Option B: Liquid Aurora for Light Mode
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const aurora1X = canvas.width * (0.5 + Math.cos(auroraTime.current) * 0.2);
                const aurora1Y = canvas.height * (0.3 + Math.sin(auroraTime.current * 0.8) * 0.1);
                const g1 = ctx.createRadialGradient(aurora1X, aurora1Y, 0, aurora1X, aurora1Y, canvas.width * 0.6);
                g1.addColorStop(0, "rgba(0, 191, 207, 0.08)");
                g1.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const aurora2X = canvas.width * (0.3 + Math.sin(auroraTime.current * 0.5) * 0.2);
                const aurora2Y = canvas.height * (0.6 + Math.cos(auroraTime.current * 0.7) * 0.1);
                const g2 = ctx.createRadialGradient(aurora2X, aurora2Y, 0, aurora2X, aurora2Y, canvas.width * 0.5);
                g2.addColorStop(0, "rgba(168, 85, 247, 0.05)");
                g2.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            const bgColorCenter = isDark ? "#050505" : "#fafafa";
            const bgAlpha = isDark ? "rgba(5, 5, 5, 0)" : "rgba(250, 250, 250, 0)";
            const primaryColor = "rgba(0, 191, 207, 1)";

            const horizon = canvas.height * 0.45;

            // Draw Ethereal Dust (Option A) in Light Mode
            if (!isDark && props.showDust) {
                dustParticles.current.forEach(p => {
                    p.y += p.vy;
                    p.x += p.vx;
                    if (p.y < -10) p.y = canvas.height + 10;
                    if (p.x < -10) p.x = canvas.width + 10;
                    if (p.x > canvas.width + 10) p.x = -10;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 191, 207, ${p.opacity * 0.4})`;
                    ctx.fill();
                });
            }

            // Draw and Update Stars (Parallax Drift)
            stars.forEach(star => {
                // Update position
                star.y += star.speed;
                // Periodic horizontal drift
                star.x += Math.sin(Date.now() * 0.0005 + star.burst) * 0.05;

                // Reset star if it goes too low (near horizon)
                if (star.y > horizon) {
                    star.y = -10;
                    star.x = Math.random() * canvas.width;
                }

                const flicker = Math.sin(Date.now() * 0.001 + star.burst) * 0.3 + 0.7;
                ctx.beginPath();
                // ONLY stars in dark mode
                if (isDark) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${flicker * 0.4})`;
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Add a subtle atmospheric nebula/glow at the horizon
            const nebula = ctx.createRadialGradient(
                canvas.width / 2, horizon, 0,
                canvas.width / 2, horizon, canvas.width * 0.8
            );

            if (isDark) {
                nebula.addColorStop(0, "rgba(0, 191, 207, 0.05)");
                nebula.addColorStop(1, "rgba(5, 5, 5, 0)");
            } else {
                nebula.addColorStop(0, "rgba(0, 191, 207, 0.03)");
                nebula.addColorStop(1, "rgba(250, 250, 250, 0)");
            }

            ctx.fillStyle = nebula;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gridSpacing = 40;
            offset += isDark ? 0.8 : 0.4; // Slower movement in light mode for "calm" feel
            if (offset >= gridSpacing) offset = 0;

            ctx.save();

            if (isDark) {
                // Draw Perspective Grid
                for (let i = -canvas.width; i <= canvas.width * 2; i += gridSpacing) {
                    // Vertical Lines
                    const vGradient = ctx.createLinearGradient(0, horizon, 0, canvas.height);
                    const opacity = 0.08;
                    vGradient.addColorStop(0, "rgba(0, 191, 207, 0)");
                    vGradient.addColorStop(0.2, `rgba(0, 191, 207, ${opacity * 0.3})`);
                    vGradient.addColorStop(1, `rgba(0, 191, 207, ${opacity})`);

                    ctx.beginPath();
                    ctx.strokeStyle = vGradient;
                    ctx.lineWidth = 1;

                    const xStart = i;
                    const xEnd = canvas.width / 2 + (i - canvas.width / 2) * 4;

                    ctx.moveTo(xStart, horizon);
                    ctx.lineTo(xEnd, canvas.height);
                    ctx.stroke();
                }

                for (let j = 0; j <= canvas.height - horizon; j += gridSpacing) {
                    // Horizontal Lines
                    const yPos = horizon + ((j + offset) % (canvas.height - horizon));
                    const relativePos = (yPos - horizon) / (canvas.height - horizon);

                    const opacity = relativePos * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 191, 207, ${opacity})`;
                    ctx.lineWidth = 1;

                    ctx.moveTo(0, yPos);
                    ctx.lineTo(canvas.width, yPos);
                    ctx.stroke();
                }

                // Horizon Gradient Mask - Fades the grid out as it approaches the horizon
                const maskHeight = 200;
                const gradient = ctx.createLinearGradient(0, horizon, 0, horizon + maskHeight);
                const maskColor = bgColorCenter;

                gradient.addColorStop(0, maskColor);
                gradient.addColorStop(0.4, maskColor);
                gradient.addColorStop(1, bgAlpha);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, horizon, canvas.width, maskHeight);
            }

            ctx.restore();

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("relative h-full w-full overflow-hidden", containerClassName)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 h-full w-full pointer-events-none"
            />
            <div className={cn("relative z-10", className)}>
                {children}
            </div>
        </div>
    );
};
