import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react"

export default function AnimationReveal({left = false, right = false, up = false, down = false, children})
{
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true })
    const animator = useAnimation();

    useEffect(() => {
        if (isInView)
        {
            animator.start("visible")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{position: 'relative', width: "full", overflow: 'hidden'}}>
            <motion.div
                variants={{
                    hidden: { 
                        opacity: 0, 
                        y: up ? 75 : down ? -75 : 0, 
                        x: left ? -100 : right ? 75: 0 
                    },
                    visible: { opacity: 1, y: 0, x: 0 }
                }}
                initial="hidden"
                animate={animator}
                transition={{duration: 0.5, delay: 0.25}}
            >
                {children}
            </motion.div>
        </div>
    )
}