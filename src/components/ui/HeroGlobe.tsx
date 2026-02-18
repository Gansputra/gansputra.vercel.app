"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useMusicTheme } from "@/context/MusicThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "next-themes";

const BasicGridGlobe = ({ isHeroActive }: { isHeroActive: boolean }) => {
    const { theme: musicTheme, analyzer } = useMusicTheme();
    const { theme: uiTheme } = useTheme();
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const isDark = uiTheme === "dark";

    // Reusable objects for performance
    const targetScaleVec = useMemo(() => new THREE.Vector3(), []);

    // Audio data buffer
    const dataArray = useMemo(() => analyzer ? new Uint8Array(analyzer.frequencyBinCount) : null, [analyzer]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame((state, delta) => {
        // PERFORMANCE: If not in hero, only do basic rotation, skip expensive audio visual crunching
        if (!isHeroActive) {
            if (meshRef.current) {
                meshRef.current.rotation.y += delta * 0.08;
            }
            return;
        }

        let bass = 0;
        if (analyzer && dataArray) {
            analyzer.getByteFrequencyData(dataArray);
            // Average of first few bins (bass)
            const bassBins = dataArray.slice(0, 10);
            bass = bassBins.reduce((a: number, b: number = 0) => a + b, 0) / bassBins.length;
        }

        const normalizedBass = bass / 255; // 0 to 1

        if (meshRef.current) {
            const targetScale = 1 + normalizedBass * 0.15;
            targetScaleVec.set(targetScale, targetScale, targetScale);
            meshRef.current.scale.lerp(targetScaleVec, 0.1);

            const rotationSpeed = 0.08 + normalizedBass * 0.4;
            meshRef.current.rotation.y += delta * rotationSpeed;
        }

        if (lightRef.current) {
            const baseIntensity = isDark ? 10 : 2;
            lightRef.current.intensity = baseIntensity + normalizedBass * 50;
        }

        if (materialRef.current) {
            const baseOpacity = isDark ? 0.3 : 0.6;
            materialRef.current.opacity = baseOpacity + normalizedBass * 0.4;
        }
    });

    const initialRotationY = -(113.92 * Math.PI / 180) - Math.PI / 2;
    const initialRotationX = (15 * Math.PI / 180);

    const radius = mounted ? (isMobile ? 20 : 25) : 20;
    const positionY = mounted ? (isMobile ? -18 : -22) : -18;

    const gridColor = isDark ? musicTheme.color : "#333333";
    const markerColor = musicTheme.color;

    return (
        <group position={[0, positionY, 0]} rotation={[initialRotationX, 0, 0]}>
            <mesh ref={meshRef} rotation={[0, initialRotationY, 0]}>
                <sphereGeometry args={[radius, 40, 40]} />

                <meshBasicMaterial
                    ref={materialRef}
                    wireframe
                    color={gridColor}
                    transparent
                />

                <group rotation={[-(0.78 * Math.PI / 180), (113.92 * Math.PI / 180), 0]}>
                    <mesh position={[0, 0, radius + 0.05]}>
                        <sphereGeometry args={[radius * 0.025, 16, 16]} />
                        <meshBasicMaterial color={markerColor} />
                    </mesh>
                    <pointLight
                        ref={lightRef}
                        color={markerColor}
                        intensity={isDark ? 10 : 2}
                        distance={radius * 2}
                        position={[0, 0, radius + 1]}
                    />
                </group>
            </mesh>
        </group>
    );
};

import { motion } from "framer-motion";

export const HeroGlobe = ({ isHeroActive = true }: { isHeroActive?: boolean }) => {
    const { theme: uiTheme } = useTheme();
    const isDark = uiTheme === "dark";

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1]
            }}
            className="w-full h-full absolute inset-0 z-0"
        >
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={50} />
                <BasicGridGlobe isHeroActive={isHeroActive} />
                {isDark && <Stars radius={150} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />}
            </Canvas>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_20%,var(--background)_90%)] pointer-events-none" />
        </motion.div>
    );
};
