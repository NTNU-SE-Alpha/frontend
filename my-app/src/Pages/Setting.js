import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 100 }}
        transition={{
          type: 'spring',
          duration: 0.3,
          stiffness: 150,
        }}
      >
        Setting Page
      </motion.div>
      <motion.div>content</motion.div>

      <motion.div initial={{ y: -100 }} animate={{ y: 100 }}>
        Setting Page
      </motion.div>
    </>
  );
}
