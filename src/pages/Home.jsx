import React from 'react';
import { useStore } from '../context/StoreContext';
import { useReveal } from '../hooks/useReveal';
import Testimonials from '../components/Testimonials';
import FinalCta from '../components/FinalCta';

export default function Home() {
  const { openCheckoutModal } = useStore();
  useReveal([]);

  return (
    <>
      <main>
        <header className="hero" id="home">
          <div className="wrap hero-inner">
            <span className="hero-tag">CHENNAI'S HIGH-PERFORMANCE TRAINING STUDIO</span>
            <h1>
              <span className="line"><span className="line-inner">BUILD THE BODY.</span></span>
              <span className="line"><span className="line-inner d2">BREAK THE LIMITS.</span></span>
            </h1>
            <p className="hero-sub">Train smarter. Move stronger. Become unstoppable.</p>
            <div className="hero-ctas">
            <button onClick={() => openCheckoutModal('MONTHLY')} className="btn btn-primary">START YOUR JOURNEY</button>
              <a href="/programs" className="btn btn-ghost">EXPLORE PROGRAMS</a>
            </div>
            <div className="hero-bottom">
              <div className="hero-stats">
                <div className="stat"><b data-count="12">0</b><span>Expert Trainers</span></div>
                <div className="stat"><b data-count="500">0</b><span>Active Members</span></div>
                <div className="stat"><b data-count="25">0</b><span>Training Programs</span></div>
                <div className="stat"><b data-count="8">0</b><span>Years Experience</span></div>
              </div>
              <div className="scroll-ind"><span>SCROLL</span><div className="scroll-line"></div></div>
            </div>
          </div>
        </header>

        <section className="about section-pad" id="about">
          <div className="wrap about-grid">
            <div className="about-media reveal">
              <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80" alt="Athletes training inside Iron Pulse Fitness studio" />
              <div className="about-media-tag">Est. 2018 · Chennai</div>
            </div>
            <div className="about-copy reveal">
              <h2>MORE THAN A GYM.<br />IT'S YOUR NEXT LEVEL.</h2>
              <p>Iron Pulse was built for people who train with intent. No wandering between machines, no guesswork — every session here is coached, measured, and pointed at a goal you actually chose.</p>
              <p>Our floor runs on community as much as equipment. You'll know your coach's name, your coach will know your numbers, and the person next to you on the rack will know your name too.</p>
              <div className="feature-grid">
                <div className="feature-card"><span className="num">01</span><h4>Expert Coaching</h4><p>Certified coaches program and correct every rep, every session.</p></div>
                <div className="feature-card"><span className="num">02</span><h4>Personalized Programs</h4><p>Plans built around your goal, schedule, and starting point.</p></div>
                <div className="feature-card"><span className="num">03</span><h4>Modern Equipment</h4><p>Competition-grade racks, plates, and conditioning gear.</p></div>
                <div className="feature-card"><span className="num">04</span><h4>Real Results</h4><p>Progress tracked in numbers, not vibes — reviewed monthly.</p></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Testimonials />
      <FinalCta />
    </>
  );
}
