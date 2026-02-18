"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useMusicTheme } from "@/context/MusicThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "next-themes";

const BasicGridGlobe = () => {
    const { theme: musicTheme } = useMusicTheme();
    const { theme: uiTheme } = useTheme();
    const meshRef = useRef<THREE.Mesh>(null);

    const [mounted, setMounted] = useState(false);
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const isDark = uiTheme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.08;
        }
    });

    const initialRotationY = -(113.92 * Math.PI / 180) - Math.PI / 2;
    const initialRotationX = (15 * Math.PI / 180);

    const radius = mounted ? (isMobile ? 4 : 12) : 4;
    const positionY = mounted ? (isMobile ? -3.5 : -11.5) : -3.5;

    const gridColor = isDark ? musicTheme.color : "#333333";
    const gridOpacity = isDark ? 0.3 : 0.6;
    const markerColor = musicTheme.color;

    return (
        <group position={[0, positionY, 0]} rotation={[initialRotationX, 0, 0]}>
            <mesh ref={meshRef} rotation={[0, initialRotationY, 0]}>
                <sphereGeometry args={[radius, 40, 40]} />

                <meshBasicMaterial
                    wireframe
                    color={gridColor}
                    transparent
                    opacity={gridOpacity}
                />

                <group rotation={[-(0.78 * Math.PI / 180), (113.92 * Math.PI / 180), 0]}>
                    <mesh position={[0, 0, radius + 0.05]}>
                        <sphereGeometry args={[radius * 0.025, 16, 16]} />
                        <meshBasicMaterial color={markerColor} />
                    </mesh>
                    <pointLight
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

export const HeroGlobe = () => {
    const { theme: uiTheme } = useTheme();
    const isDark = uiTheme === "dark";

    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={50} />
                <BasicGridGlobe />
                {isDark && <Stars radius={150} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />}
            </Canvas>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_20%,var(--background)_90%)] pointer-events-none" />
        </div>
    );
};
