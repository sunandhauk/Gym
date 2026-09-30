import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const StoreContext = createContext(null);

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem('ironpulse_' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  localStorage.setItem('ironpulse_' + key, JSON.stringify(value));
}

export const planPrices = {
  MONTHLY: { label: 'Monthly Plan', duration: '1 Month', price: 1999 },
  QUARTERLY: { label: '3 Month Plan', duration: '3 Months', price: 5499 },
  HALF_YEARLY: { label: '6 Month Plan', duration: '6 Months', price: 9999 },
  ANNUAL: { label: '1 Year Plan', duration: '12 Months', price: 17999 }
};

export function StoreProvider({ children }) {
  const [bookings, setBookingsState] = useState(() => readLS('bookings', []));
  const [workouts, setWorkoutsState] = useState(() => readLS('workouts', []));
  const [water, setWaterState] = useState(() => readLS('water', 0));
  const [membership, setMembershipState] = useState(() => readLS('membership', null));
  const [profile, setProfileState] = useState(() => readLS('profile', { bmi: null, cal: null, goal: 'Fat Loss' }));
  const [favorites, setFavoritesState] = useState(() => readLS('favorites', []));

  // ---- toast ----
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastShow(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2800);
  }, []);

  // ---- modals ----
  const [modal, setModal] = useState({ type: null, data: null });
  const openModal = useCallback((type, data = null) => setModal({ type, data }), []);
  const closeModal = useCallback(() => setModal({ type: null, data: null }), []);
  const [checkoutPlan, setCheckoutPlan] = useState('MONTHLY');
  const openCheckoutModal = useCallback((planName) => {
    setCheckoutPlan(planName || 'MONTHLY');
    setModal({ type: 'checkout', data: null });
  }, []);

  // ---- setters that also persist ----
  const setBookings = useCallback((updater) => {
    setBookingsState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      writeLS('bookings', next);
      return next;
    });
  }, []);
  const setWorkouts = useCallback((updater) => {
    setWorkoutsState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      writeLS('workouts', next);
      return next;
    });
  }, []);
  const setWater = useCallback((updater) => {
    setWaterState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const clamped = Math.max(0, Math.min(12, next));
      writeLS('water', clamped);
      if (clamped === 8) showToast('🎉 Hydration goal achieved for today!');
      return clamped;
    });
  }, [showToast]);
  const setMembership = useCallback((value) => {
    setMembershipState(value);
    writeLS('membership', value);
  }, []);
  const setProfile = useCallback((updater) => {
    setProfileState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      writeLS('profile', next);
      return next;
    });
  }, []);
  const setFavorites = useCallback((updater) => {
    setFavoritesState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      writeLS('favorites', next);
      return next;
    });
  }, []);

  // ---- domain actions ----
  const toggleFavorite = useCallback((id) => {
    let wasFav = false;
    setFavorites(prev => {
      wasFav = prev.includes(id);
      return wasFav ? prev.filter(f => f !== id) : [...prev, id];
    });
    showToast(wasFav ? 'Removed from favorites' : 'Saved to favorites! ★');
  }, [setFavorites, showToast]);

  const cancelBooking = useCallback((id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast('Booking cancelled.');
  }, [setBookings, showToast]);

  const toggleBookClass = useCallback((day, time, name, trainer, type) => {
    const key = day + '_' + time + '_' + name;
    let removed = false;
    setBookings(prev => {
      const idx = prev.findIndex(b => b.key === key);
      if (idx > -1) {
        removed = true;
        return prev.filter((_, i) => i !== idx);
      }
      return [...prev, {
        id: 'b_' + Date.now(),
        key,
        type: type + ' Class',
        title: name,
        time,
        day: day + 'day',
        trainer
      }];
    });
    showToast(removed ? 'Booking cancelled for ' + name : 'Class booked successfully!');
  }, [setBookings, showToast]);

  const bookConsultation = useCallback((trainerObj, date, slot) => {
    setBookings(prev => [...prev, {
      id: 'b_' + Date.now(),
      type: 'Trainer Consultation',
      title: '1-on-1 with ' + trainerObj.name,
      time: slot,
      day: date,
      trainer: trainerObj.name
    }]);
    showToast('Consultation booked with ' + trainerObj.name + ' for ' + date + '!');
  }, [setBookings, showToast]);

  const addWorkout = useCallback((title, mins, cals) => {
    setWorkouts(prev => [{
      id: 'w_' + Date.now(),
      title, mins, cals,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }, ...prev]);
    showToast('Workout session logged! Keep crushing it.');
  }, [setWorkouts, showToast]);

  const deleteWorkout = useCallback((id) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  }, [setWorkouts]);

  const saveBmiToPortal = useCallback((bmi, cals) => {
    setProfile(prev => ({ ...prev, bmi, cal: cals }));
    showToast('Fitness result saved!');
  }, [setProfile, showToast]);

  const setGoal = useCallback((goalTitle) => {
    setProfile(prev => ({ ...prev, goal: goalTitle }));
  }, [setProfile]);

  const completeCheckout = useCallback((name, plan) => {
    const memberId = 'IP-2026-' + Math.floor(1000 + Math.random() * 9000);
    const rec = { name, plan, id: memberId, joined: new Date().toLocaleDateString() };
    setMembership(rec);
    closeModal();
    setTimeout(() => openModal('pass'), 0);
    showToast('Welcome to Iron Pulse Fitness! Gym Pass generated.');
  }, [setMembership, closeModal, openModal, showToast]);

  const openPassModal = useCallback(() => {
    setMembershipState(prev => {
      if (prev) return prev;
      const guest = { name: 'Guest Member', plan: 'Monthly Plan', id: 'IP-2026-8842', joined: new Date().toLocaleDateString() };
      writeLS('membership', guest);
      return guest;
    });
    openModal('pass');
  }, [openModal]);

  const value = {
    bookings, workouts, water, membership, profile, favorites,
    showToast, toastMsg, toastShow,
    modal, openModal, closeModal, checkoutPlan, openCheckoutModal,
    toggleFavorite, cancelBooking, toggleBookClass, bookConsultation,
    addWorkout, deleteWorkout, setWater, saveBmiToPortal, setGoal,
    completeCheckout, openPassModal
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
