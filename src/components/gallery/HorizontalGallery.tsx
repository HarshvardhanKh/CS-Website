'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scroller.current) return;

    const sections = gsap.utils.toArray<HTMLElement>('.skill-set');

    const animation = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scroller.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: () => '+=' + window.innerWidth,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={scroller}
        className="flex w-[400vw] h-screen bg-black text-white relative"
      >
        {/* SECTION 1 */}
        <section className="skill-set relative w-screen h-full flex items-center justify-center px-12">
          <div className="relative w-[70vw] h-[60vh]">
            <Image
              src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg"
              alt="Image 1"
              fill
              className="object-contain"
              sizes="70vw"
              priority
            />
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="skill-set relative w-screen h-full flex items-center justify-center px-12">
          <div className="relative w-[70vw] h-[60vh]">
            <Image
              src="https://images.pexels.com/photos/2902536/pexels-photo-2902536.jpeg"
              alt="Image 2"
              fill
              className="object-contain"
              sizes="70vw"
            />
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="skill-set relative w-screen h-full flex items-center justify-center px-12">
          <div className="relative w-[70vw] h-[60vh]">
            <Image
              src="https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg"
              alt="Image 3"
              fill
              className="object-contain"
              sizes="70vw"
            />
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="skill-set relative w-screen h-full flex items-center justify-center px-12">
          <div className="relative w-[70vw] h-[60vh]">
            <Image
              src="https://images.pexels.com/photos/1601775/pexels-photo-1601775.jpeg"
              alt="Image 4"
              fill
              className="object-contain"
              sizes="70vw"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
