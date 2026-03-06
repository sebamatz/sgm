"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  MeshDistortMaterial,
  Sphere,
  Float,
  Environment,
} from "@react-three/drei";
import { ArrowRight } from "lucide-react";

// 1. Silent Interceptor: Kills the Clock deprecation warning specifically
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.("THREE.Clock: This module has been deprecated"))
      return;
    originalWarn(...args);
  };
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

const AnimatedBlob = () => (
  <Float speed={2} rotationIntensity={2} floatIntensity={2}>
    <Sphere visible args={[1, 100, 200]} scale={2.8} position={[2, 0, -1]}>
      <MeshDistortMaterial
        color="#1e293b"
        attach="material"
        distort={0.65}
        speed={1.2}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </Sphere>
  </Float>
);

export default function Hero({ translations }: { translations: any }) {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 1]} intensity={2} />
          <directionalLight
            position={[-2, -2, -1]}
            intensity={1}
            color="#2563eb"
          />
          <AnimatedBlob />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="w-full max-w-7xl relative z-10 mx-auto px-6 md:px-8 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-4xl mt-20">
          <motion.div
            initial={isMounted ? { y: 50, opacity: 0 } : false}
            animate={isMounted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: premiumEase, delay: 0.1 }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-black tracking-[-0.04em] mb-6 text-balance leading-[0.9] text-white">
              {translations.title}
            </h1>
          </motion.div>

          <motion.div
            initial={isMounted ? { y: 30, opacity: 0 } : false}
            animate={isMounted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: premiumEase, delay: 0.3 }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-zinc-400 mb-12 max-w-2xl font-medium tracking-tight leading-relaxed">
              {translations.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={isMounted ? { scale: 0.9, opacity: 0, y: 30 } : false}
            animate={isMounted ? { scale: 1, opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: premiumEase, delay: 0.5 }}
            style={{ y: yParallax, opacity: opacityFade }}
            className="pointer-events-auto flex items-center gap-6"
          >
            <button className="group relative flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-8 h-16 md:h-20 rounded-full text-lg font-semibold tracking-wide transition-all duration-500 hover:border-white/30 overflow-hidden">
              <span className="relative z-10">
                {translations.cta || "Explore Our Services"}
              </span>
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-110">
                <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
    </section>
  );
}
