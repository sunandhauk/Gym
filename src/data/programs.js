export const programs = [
  {
    id: 'p1', title: 'Strength & Conditioning', cat: 'Strength', level: 'Advanced', duration: '60 min', freq: '4x / week',
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=700&q=80',
    desc: 'Barbell-focused programming to build raw strength and power output. Designed around heavy squats, deadlifts, and overhead presses.',
    split: [
      { day: 'Day 1', focus: 'Lower Body Strength', ex: 'Back Squats 4x5, Romanian Deadlifts 3x8' },
      { day: 'Day 2', focus: 'Upper Body Power', ex: 'Bench Press 4x5, Overhead Press 3x6' },
      { day: 'Day 3', focus: 'Posterior Chain', ex: 'Conventional Deadlift 3x5, Hip Thrusts 4x8' },
      { day: 'Day 4', focus: 'Accessories & Core', ex: 'Pull-ups 4xMax, Dips 3x10' }
    ]
  },
  {
    id: 'p2', title: 'Fat Loss Circuit', cat: 'Fat Loss', level: 'Beginner', duration: '45 min', freq: '5x / week',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80',
    desc: 'Metabolic circuits and cardio conditioning for sustainable calorie burn and cardiovascular health.',
    split: [
      { day: 'Day 1', focus: 'HIIT Conditioning', ex: 'Kettlebell Swings, Assault Bike Sprints' },
      { day: 'Day 2', focus: 'Full Body Endurance', ex: 'Dumbbell Thrusters, Box Jumps' },
      { day: 'Day 3', focus: 'Core & Cardio', ex: 'Plank Variations, Rowing Intervals' }
    ]
  },
  {
    id: 'p3', title: 'Muscle Building Hypertrophy', cat: 'Muscle', level: 'Intermediate', duration: '60 min', freq: '5x / week',
    img: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=700&q=80',
    desc: 'Hypertrophy-focused volume splits with mechanical tension and progressive overload tracking.',
    split: [
      { day: 'Push', focus: 'Chest, Shoulders & Triceps', ex: 'Incline DB Press, Lateral Raises, Tricep Pushdowns' },
      { day: 'Pull', focus: 'Back & Biceps', ex: 'Lat Pulldowns, Barbell Rows, Hammer Curls' },
      { day: 'Legs', focus: 'Quads & Calves', ex: 'Leg Press, Hamstring Curls, Calf Raises' }
    ]
  },
  {
    id: 'p4', title: 'Cross Training Challenge', cat: 'Strength', level: 'Advanced', duration: '50 min', freq: '4x / week',
    img: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=700&q=80',
    desc: 'Varied high-intensity workouts blending gymnastics, Olympic weightlifting, and metabolic conditioning.',
    split: [
      { day: 'Session 1', focus: 'Olympic Lifts', ex: 'Clean & Jerk Work, Ring Dips' },
      { day: 'Session 2', focus: 'Gymnastic Skill', ex: 'Toes to Bar, Handstand Pushups' }
    ]
  },
  {
    id: 'p5', title: '1-on-1 Personal Training', cat: 'Personal', level: 'All Levels', duration: '60 min', freq: 'Flexible',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80',
    desc: 'Dedicated single-coach training customized for your specific posture, strength goals, and lifestyle schedule.',
    split: [
      { day: 'Custom', focus: 'Tailored Assessment', ex: 'Movement Screening, Targeted Conditioning' }
    ]
  },
  {
    id: 'p6', title: 'Functional Fitness', cat: 'Cardio', level: 'Beginner', duration: '45 min', freq: '3x / week',
    img: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=700&q=80',
    desc: 'Movement patterns that carry over directly into daily mobility, joint health, and overall athleticism.',
    split: [
      { day: 'Session 1', focus: 'Mobility & Core', ex: 'TRX Rows, Goblet Squats, Single-leg Deadlifts' }
    ]
  }
];

export const goalData = {
  fat: { title: 'Fat Loss Plan', desc: 'A calorie-controlled, high-frequency plan pairing metabolic circuits with strength work.', tags: ['4-5 sessions/week', 'Metabolic circuits', 'Nutrition guidance'] },
  muscle: { title: 'Muscle Building Plan', desc: 'A hypertrophy split with progressive overload tracking, built to add size.', tags: ['5 sessions/week', 'Split training', 'Progress tracking'] },
  strength: { title: 'Get Stronger Plan', desc: 'Barbell-focused strength programming centered on the big lifts.', tags: ['4 sessions/week', 'Barbell focus', 'PR tracking'] },
  fitness: { title: 'Improve Fitness Plan', desc: 'A varied conditioning plan mixing cardio, mobility, and functional movement.', tags: ['3-4 sessions/week', 'Cardio + mobility', 'Functional movement'] }
};
