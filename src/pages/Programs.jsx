import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useReveal } from '../hooks/useReveal';
import { programs, goalData } from '../data/programs';
import Testimonials from '../components/Testimonials';
import FinalCta from '../components/FinalCta';

const CATS = ['all', 'Strength', 'Fat Loss', 'Muscle', 'Cardio'];
const GOALS = [
  { key: 'fat', icon: '🔥', label: 'LOSE FAT' },
  { key: 'muscle', icon: '💪', label: 'BUILD MUSCLE' },
  { key: 'strength', icon: '🏋️', label: 'GET STRONGER' },
  { key: 'fitness', icon: '⚡', label: 'IMPROVE FITNESS' }
];
function GoalIcon({ name }) {
  const icons = {
    fat: <><path d="M12 3c2.7 3.1 4.9 5.9 4.9 9.6A4.9 4.9 0 1 1 7.1 12.6C7.1 9.4 9.4 6.1 12 3Z" /><path d="M10.1 15.3c.3-1.7 1.3-3.1 2.9-4.2.8 1.7.7 3.4-.3 4.8" /></>,
    muscle: <><path d="M7.2 10.2h2.2l1.3-2.6 1.6 1.7v3.1h2.2l1.4-1.5h1.8c1.1 0 2 .9 2 2v1.4c0 2.1-1.7 3.8-3.8 3.8h-4.7c-2.6 0-4.8-2.1-4.8-4.8v-3.1c0-1 .8-1.8 1.8-1.8Z" /><path d="M9.4 10.2v2.1" /></>,
    strength: <><path d="M5 9v6M8 7v10M16 7v10M19 9v6M3 10.5h18v3H3z" /><path d="M12 6v12" /></>,
    fitness: <><path d="m13.5 2-8 11.2h5L10.5 22l8-11.2h-5L13.5 2Z" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

const TRANSFORMATIONS = [
  { name: 'Arjun R.', weeks: '12 Weeks', goal: 'Goal: Fat Loss — Lost 9kg', quote: 'The coaches adjusted my plan every two weeks. First time a gym actually tracked my progress.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80' },
  { name: 'Priya S.', weeks: '16 Weeks', goal: 'Goal: Muscle Building — Gained 4kg lean mass', quote: "Never thought I'd enjoy lifting. The programming made every session feel worth showing up for.", img: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=700&q=80' },
  { name: 'Karthik M.', weeks: '20 Weeks', goal: 'Goal: Get Stronger — +40kg on deadlift', quote: "Went from barely finishing sessions to hitting numbers I'd only seen in videos.", img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80' }
];

export default function Programs() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, openCheckoutModal, setGoal, saveBmiToPortal } = useStore();
  useReveal([]);

  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return programs.filter(p => {
      const matchCat = cat === 'all' || p.cat === cat;
      const matchSearch = p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [cat, search]);

  const [activeGoal, setActiveGoal] = useState(null);
  function pickGoal(key) {
    setActiveGoal(key);
    setGoal(goalData[key].title);
  }

  // BMI calculator
  const [form, setForm] = useState({ age: '', gender: 'male', height: '', weight: '', activity: '1.55' });
  const [result, setResult] = useState(null);

  function handleCalc(e) {
    e.preventDefault();
    const age = parseFloat(form.age);
    const height = parseFloat(form.height);
    const weight = parseFloat(form.weight);
    const activity = parseFloat(form.activity);
    if (!age || !height || !weight) return;

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let bmiTag = 'Healthy Range', rec = '';
    if (bmi < 18.5) { bmiTag = 'Underweight'; rec = "You're in the underweight range — a lean muscle-building plan with a calorie surplus would suit you best."; }
    else if (bmi < 25) { bmiTag = 'Healthy Range'; rec = "You're in a healthy BMI range. A balanced strength and conditioning program will help you build on that."; }
    else if (bmi < 30) { bmiTag = 'Overweight'; rec = "You're in the overweight range — our Fat Loss program paired with the calorie target above is a strong starting point."; }
    else { bmiTag = 'Obese Range'; rec = "You're in the obese range — we'd recommend starting with our Fat Loss program and a coach-guided nutrition plan."; }

    let bmr;
    if (form.gender === 'male') bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    else bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    const calories = Math.round(bmr * activity);

    setResult({ bmi: bmi.toFixed(1), cals: calories, tag: bmiTag, rec });
  }

  return (
    <>
      <main>
        <section className="programs" id="programs">
          <div className="wrap section-pad">
            <div className="section-head reveal">
              <span className="eyebrow-free-label">Programs</span>
              <h2>Pick your fight.</h2>
              <p>Search or filter six focused tracks, each built around a specific outcome.</p>
            </div>

            <div className="section-toolbar reveal">
              <div className="filter-pills">
                {CATS.map(c => (
                  <button key={c} className={'filter-pill' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>
                    {c === 'all' ? 'All Programs' : c}
                  </button>
                ))}
              </div>
              <div className="input-group" style={{ maxWidth: '280px' }}>
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search programs..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="program-grid">
              {filtered.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No matching programs found.</div>
              )}
              {filtered.map(p => {
                const isFav = favorites.includes(p.id);
                return (
                  <div className="program-card" key={p.id}>
                    <div className="program-media">
                      <span className="program-level">{p.level}</span>
                      <button className={'fav-btn' + (isFav ? ' active' : '')} onClick={() => toggleFavorite(p.id)}>★</button>
                      <img src={p.img} alt={p.title} />
                    </div>
                    <div className="program-body">
                      <h3>{p.title}</h3>
                      <div className="program-meta"><span>{p.duration}</span><span>{p.freq}</span></div>
                      <p>{p.desc}</p>
                      <div className="program-actions">
                        <button className="program-link" onClick={() => navigate(`/programs/${p.id}`)}>View Details &amp; Split →</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="goal section-pad" id="goal">
          <div className="wrap">
            <div className="goal-box reveal">
              <h2>WHAT'S YOUR GOAL?</h2>
              <div className="goal-options">
                {GOALS.map(g => (
                  <button key={g.key} className={'goal-opt' + (activeGoal === g.key ? ' active' : '')} onClick={() => pickGoal(g.key)}>
                    <div className="goal-opt-icon"><GoalIcon name={g.key} /></div><span>{g.label}</span>
                  </button>
                ))}
              </div>
              {activeGoal && (
                <div className="goal-result show">
                  <h4>{goalData[activeGoal].title}</h4>
                  <p>{goalData[activeGoal].desc}</p>
                  <div className="goal-plan-list">
                    {goalData[activeGoal].tags.map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                  <button onClick={() => openCheckoutModal('MONTHLY')} className="btn btn-primary">GET MY PLAN</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="calc section-pad" id="calculator">
          <div className="wrap calc-grid">
            <div className="reveal">
              <span className="eyebrow-free-label">Fitness Calculator</span>
              <h2 style={{ fontSize: 'clamp(30px,4vw,44px)', marginBottom: '18px' }}>Know your numbers.</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '36px', lineHeight: 1.6 }}>Enter your details for an instant BMI reading and a daily calorie estimate to guide your plan.</p>
              <form className="calc-form" onSubmit={handleCalc}>
                <div className="field"><label htmlFor="age">Age</label>
                  <input type="number" id="age" min="10" max="90" placeholder="28" required value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
                </div>
                <div className="field"><label htmlFor="gender">Gender</label>
                  <select id="gender" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                    <option value="male">Male</option><option value="female">Female</option>
                  </select>
                </div>
                <div className="field"><label htmlFor="height">Height (cm)</label>
                  <input type="number" id="height" min="120" max="230" placeholder="175" required value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))} />
                </div>
                <div className="field"><label htmlFor="weight">Weight (kg)</label>
                  <input type="number" id="weight" min="30" max="220" placeholder="72" required value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
                </div>
                <div className="field full"><label htmlFor="activity">Activity Level</label>
                  <select id="activity" value={form.activity} onChange={e => setForm(f => ({ ...f, activity: e.target.value }))}>
                    <option value="1.2">Sedentary — little to no exercise</option>
                    <option value="1.375">Light — exercise 1–3 days/week</option>
                    <option value="1.55">Moderate — exercise 3–5 days/week</option>
                    <option value="1.725">Active — exercise 6–7 days/week</option>
                    <option value="1.9">Very Active — physical job + training</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary calc-btn">CALCULATE &amp; SAVE</button>
              </form>
            </div>
            <div className="calc-result reveal">
              {!result ? (
                <div className="calc-result-empty">Fill in your details to see your BMI, daily calories, and a fitness recommendation.</div>
              ) : (
                <div>
                  <div className="calc-metric"><span>Body Mass Index</span><b>{result.bmi}</b></div>
                  <div className="calc-metric"><span>Estimated Daily Calories</span><b>{result.cals.toLocaleString('en-IN')} kcal</b></div>
                  <span className="calc-tag">{result.tag}</span>
                  <p className="calc-note">{result.rec}</p>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: '16px', width: '100%' }} onClick={() => saveBmiToPortal(result.bmi, result.cals)}>
                    Save Fitness Result
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-pad" id="transformations">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow-free-label">Transformations</span>
              <h2>Real members. Real progress.</h2>
            </div>
            <div className="transform-grid">
              {TRANSFORMATIONS.map((t, i) => (
                <div className="transform-card reveal" key={i}>
                  <div className="transform-media"><span className="badge">{t.weeks}</span><img src={t.img} alt={'Member transformation photo — ' + t.name} /></div>
                  <div className="transform-body">
                    <h4>{t.name}</h4>
                    <div className="transform-goal">{t.goal}</div>
                    <p>"{t.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Testimonials />
      <FinalCta />
    </>
  );
}
