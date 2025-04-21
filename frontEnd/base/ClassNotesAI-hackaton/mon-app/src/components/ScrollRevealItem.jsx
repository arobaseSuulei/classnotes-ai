import React from "react";
import { motion, useInView } from "framer-motion";

const ScrollRevealItem = ({ children, delay = 0 }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" }); // Détecte quand l'élément est visible

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }} // État initial (invisible et décalé vers le bas)
            animate={isInView ? { opacity: 1, y: 0 } : {}} // Animation quand visible
            transition={{ duration: 0.5, delay }} // Durée de l'animation et délai
        >
            {children}
        </motion.div>
    );
};

export default ScrollRevealItem;