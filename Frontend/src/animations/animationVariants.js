export const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Removed y translation
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};


