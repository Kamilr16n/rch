"use client";
import type { SpringOptions } from "framer-motion";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedFeatureCard({
  icon,
  title,
  description,
  containerHeight = "260px",
  containerWidth = "100%",
  scaleOnHover = 1.06,
  rotateAmplitude = 12,
}: TiltedFeatureCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex items-center justify-center"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-colors hover:border-green-300"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mb-4">
          {icon}
        </div>
        <div className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</div>
        <div className="text-gray-600 text-center leading-relaxed text-base">{description}</div>
      </motion.div>
    </motion.section>
  );
} 