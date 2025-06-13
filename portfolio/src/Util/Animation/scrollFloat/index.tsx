import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top 80%',
  scrollEnd = 'bottom 60%',
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    const split = new SplitType(el, {
      types: 'chars',
      tagName: 'span',
    });

    const chars = el.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        yPercent: 100,
        scale: 0.9,
        willChange: 'transform',
      },
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        ease,
        stagger,
        duration: animationDuration,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 4,
        },
      }
    );

    return () => {
      split.revert();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={containerRef} className={`scroll-float ${containerClassName}`}>
      {children}
    </div>
  );
};

export default ScrollFloat;
