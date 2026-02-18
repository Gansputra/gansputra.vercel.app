"use client";

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Text, Float, Environment, ContactShadows, OrbitControls, PerspectiveCamera, Stars, Torus } from "@react-three/drei";
import * as THREE from "three";
import { projectData } from "@/data/projectData";
import { Project } from "@/types/project";
import { motion } from "framer-motion";

function Project3DCard({
    project,
    index,
    total,
    radius,
    onPreview,
}: {
    project: Project;
    index: number;
    total: number;
    radius: number;
    onPreview: (p: Project) => void;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Calculate position in circle
    const angle = (index / total) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    useFrame((state) => {
        if (!meshRef.current) return;

        // Cards should face the center of the orbit
        meshRef.current.lookAt(0, 0, 0);

        // Gentle floating animation
        if (!hovered) {
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2;
        }
    });

    return (
        <group
            ref={meshRef}
            position={[x, 0, z]}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
            onClick={(e) => {
                e.stopPropagation();
                onPreview(project);
            }}
        >
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
                {/* Main Card Mesh - High contrast */}
                <mesh scale={[3.8, 5.2, 0.1]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        color={hovered ? "#333" : "#121212"}
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#00bfcf"
                        emissiveIntensity={hovered ? 0.2 : 0.05}
                    />
                </mesh>

                {/* Project Image */}
                <Suspense fallback={<mesh position={[0, 1.2, 0.06]}><planeGeometry args={[3.5, 2.5]} /><meshBasicMaterial color="#222" /></mesh>}>
                    <Image
                        url={project.previewImage}
                        scale={[3.5, 2.5]}
                        position={[0, 1.2, 0.06]}
                        transparent
                        opacity={hovered ? 1 : 0.8}
                    />
                </Suspense>

                {/* Project Info Panel */}
                <group position={[0, -1.0, 0.06]}>
                    <Text
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        maxWidth={3.2}
                        textAlign="center"
                    >
                        {project.title.toUpperCase()}
                    </Text>

                    <group position={[0, -0.7, 0]}>
                        {project.stack.slice(0, 3).map((tech, i) => (
                            <Text
                                key={tech}
                                fontSize={0.1}
                                color="#00bfcf"
                                position={[(i - 1) * 0.8, 0, 0]}
                            >
                                {tech}
                            </Text>
                        ))}
                    </group>
                </group>

                {/* Interaction Glow Layer */}
                {hovered && (
                    <mesh position={[0, 0, -0.05]} scale={[4.2, 5.6, 0.01]}>
                        <planeGeometry />
                        <meshBasicMaterial color="#00bfcf" transparent opacity={0.2} />
                    </mesh>
                )}
            </Float>
        </group>
    );
}

function DebugSentinel() {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    });
    return (
        <group ref={ref}>
            <Torus args={[2, 0.05, 16, 100]} rotation={[0, 0, 0]}>
                <meshBasicMaterial color="#00bfcf" transparent opacity={0.3} />
            </Torus>
            <Torus args={[2.2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
            </Torus>
        </group>
    );
}

function Scene({ onPreview }: { onPreview: (p: Project) => void }) {
    const orbitRef = useRef<THREE.Group>(null);
    const radius = 12;

    useFrame((state, delta) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <>
            {/* Camera pointing at center */}
            <PerspectiveCamera makeDefault position={[0, 15, 30]} fov={40} />
            <OrbitControls
                autoRotate={false}
                enablePan={false}
                enableZoom={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
            />

            <ambientLight intensity={1} />
            <pointLight position={[20, 20, 20]} intensity={2} color="#00bfcf" />
            <pointLight position={[-20, 20, -20]} intensity={2} color="#8b5cf6" />

            {/* Orbiting Gallery */}
            <group ref={orbitRef}>
                {projectData.map((project, index) => (
                    <Project3DCard
                        key={project.id}
                        project={project}
                        index={index}
                        total={projectData.length}
                        radius={radius}
                        onPreview={onPreview}
                    />
                ))}
            </group>

            {/* Central Visual Anchor */}
            <DebugSentinel />

            <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={50} blur={2.5} far={20} color="#000" />

            <Suspense fallback={null}>
                <Environment preset="city" />
            </Suspense>

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </>
    );
}

export const Project3DGallery = ({ onPreview }: { onPreview: (p: Project) => void }) => {
    return (
        <div
            className="w-full h-[700px] relative mt-10 rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-2xl"
            data-cursor="white"
        >
            {/* Essential UI */}
            <div className="absolute top-10 left-10 z-10 pointer-events-none">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-xs font-black uppercase tracking-[0.6em] text-primary">3D Neural Network Expo</span>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas shadows dpr={[1, 2]}>
                    <Scene onPreview={onPreview} />
                </Canvas>
            </div>

            {/* Drag Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center gap-6 shadow-2xl">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">Interact to Explore</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                    </div>
                </div>
            </div>

            {/* Modern Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
};
