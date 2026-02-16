"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CyberGridProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export const Vortex = ({ children, className, containerClassName }: CyberGridProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
            const starCount = window.innerWidth < 768 ? 50 : 150;
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height * 0.6,
                    size: Math.random() * 1.2,
                    burst: Math.random() * Math.PI * 2,
                    speed: 0.05 + Math.random() * 0.1 // Random slow speed
                });
            }
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background Deep Black
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const horizon = canvas.height * 0.45;

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
                ctx.fillStyle = `rgba(255, 255, 255, ${flicker * 0.4})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Add a subtle nebula/glow at the horizon
            const nebula = ctx.createRadialGradient(
                canvas.width / 2, horizon, 0,
                canvas.width / 2, horizon, canvas.width
            );
            nebula.addColorStop(0, "rgba(0, 191, 207, 0.05)");
            nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = nebula;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gridSpacing = 40;
            offset += 0.8; // Speed of movement
            if (offset >= gridSpacing) offset = 0;

            ctx.save();

            // Draw Perspective Grid
            for (let i = -canvas.width; i <= canvas.width * 2; i += gridSpacing) {
                // Vertical Lines
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0, 191, 207, 0.08)";
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

            // Horizon Gradient Mask
            const gradient = ctx.createLinearGradient(0, horizon, 0, horizon + 100);
            gradient.addColorStop(0, "#050505");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, horizon, canvas.width, 100);

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
