"use client";

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type DockItem = {
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
    active?: boolean;
    desktopOnly?: boolean;
};

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: DockItem[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: DockItem[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute left-full top-0 ml-4 flex flex-wrap gap-3 w-[65vw] max-w-[260px] p-2"
                    >
                        {items.filter(item => !item.desktopOnly).map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.5,
                                    x: -20,
                                    transition: {
                                        delay: idx * 0.02,
                                    },
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: idx * 0.05
                                }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                        setOpen(false);
                                    }}
                                    key={item.title}
                                    className={cn(
                                        "h-12 w-12 rounded-2xl bg-card border border-border flex flex-col items-center justify-center transition-all active:scale-95 shadow-2xl",
                                        item.active && "border-primary/50 bg-primary/20 shadow-[0_0_15px_rgba(0,191,207,0.2)]"
                                    )}
                                >
                                    <div className={cn("h-5 w-5 transition-colors", item.active ? "text-primary" : "text-foreground/70")}>
                                        {item.icon}
                                    </div>
                                    <span className="text-[7px] uppercase tracking-tighter mt-1 text-foreground/40 font-bold">
                                        {item.title.split(' ')[0]}
                                    </span >
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground/70 shadow-lg dark:shadow-[0_0_15px_rgba(0,191,207,0.1)]"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                            <X className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                            <Menu className="h-6 w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: DockItem[];
    className?: string;
}) => {
    let mouseY = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseY.set(e.pageY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className={cn(
                "hidden md:flex w-16 flex-col gap-4 items-center rounded-2xl bg-card border border-border px-3 py-4 shadow-xl dark:shadow-[0_0_20px_rgba(0,191,207,0.15)]",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseY={mouseY} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseY,
    title,
    icon,
    href,
    onClick,
    active,
}: {
    mouseY: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
    active?: boolean;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseY, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };

        return val - bounds.y - bounds.height / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthIconTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightIconTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn(
                    "aspect-square rounded-full flex items-center justify-center relative border transition-colors",
                    active
                        ? "border-primary/50 bg-primary/20"
                        : "bg-card/50 border-border hover:border-primary/50"
                )}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, y: "-50%" }}
                            animate={{ opacity: 1, x: 0, y: "-50%" }}
                            exit={{ opacity: 0, x: 2, y: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-popover border border-border text-popover-foreground absolute left-full ml-4 top-1/2 w-fit text-xs"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}
