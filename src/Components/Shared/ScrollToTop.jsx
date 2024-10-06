import React from 'react'
import { useEffect, useState } from "react";




const ScrollToTop = () => {



    const [isVisible, setIsVisible] = useState(false);

    const toggleVisiblitiy = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisiblitiy);

        return () => {
            window.removeEventListener('scroll', toggleVisiblitiy)
        };
    }, []);



    return (
        <div className="scrollToTop">
            {isVisible && (
                <button onClick={scrollToTop}>
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
            )}
        </div>
    )
}

export default ScrollToTop