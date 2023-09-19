import React from "react";
import '../style/Loading.css';
import trackImg from '../media/track.png';
import { motion, AnimatePresence } from "framer-motion"

function Loading()
{
    return(
        <div class="loader-container bg-pink-400">
            <AnimatePresence>
                <motion.img 
                initial={{scale: 0}}
                animate={{scale: 1}}
                class="spinner" src={trackImg}></motion.img>
            </AnimatePresence>
        </div>
    )
}

export default Loading;