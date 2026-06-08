export const SCHED = {
  1: {
    label: 'Upper Body', type: 'strength', icon: 'ti-barbell', time: '6:30am or 7pm',
    groups: [
      { name: 'Superset A — 3 rounds, 75s rest', items: [
        { n: 'Lat Pulldown', d: '3 × 10–12 · 20–25 kg', c: 'Pull to chest, squeeze lats. Control up slowly.' },
        { n: 'DB Shoulder Press', d: '3 × 10–12 · 6–8 kg/side', c: 'Core braced, press overhead without arching lower back.' },
      ]},
      { name: 'Superset B — 3 rounds, 75s rest', items: [
        { n: 'Seated Cable Row', d: '3 × 10–12 · 20–28 kg', c: 'Pull elbows past body, squeeze shoulder blades together.' },
        { n: 'DB Bicep Curl', d: '3 × 12 · 6–8 kg/side', c: '3 seconds down. No swinging. Elbows stay pinned at sides.' },
      ]},
      { name: 'Core — no back strain', items: [
        { n: 'Dead Bug', d: '3 × 10/side · Bodyweight', c: 'Back FLAT to floor. Opposite arm + leg. Never let back arch.' },
        { n: 'Pallof Press (cable)', d: '3 × 12/side · 8–12 kg', c: 'Stand sideways to cable. Press out, resist rotation. Anti-twist core.' },
        { n: 'Standing Oblique Crunch', d: '3 × 15/side · 5–8 kg DB', c: 'Side bend with weight. Slow and controlled. Love handle focus.' },
      ]},
    ],
  },
  2: {
    label: 'Glutes & Legs', type: 'strength', icon: 'ti-barbell', time: '6:30am or 7pm',
    groups: [
      { name: 'Warm-up', items: [
        { n: 'Incline Treadmill Walk', d: '8 min · 12% incline · 5.5 km/h', c: 'Gets glutes firing before lifting. Never skip this.' },
      ]},
      { name: 'Superset A — 3 rounds, 90s rest', items: [
        { n: 'Hip Thrust', d: '3 × 10–12 · 30–50 kg', c: "Drive through heels, squeeze glutes 1 sec at top. It's all glutes, not back." },
        { n: 'Cable Kickback', d: '3 × 12/side · 5–10 kg', c: 'Hips square throughout. Slow down on the lowering. Squeeze at top.' },
      ]},
      { name: 'Superset B — 3 rounds, 90s rest', items: [
        { n: 'Sumo Goblet Squat', d: '3 × 12 · 12–18 kg KB', c: 'Wide stance, toes out 45°. Deep squat. Knees track over toes.' },
        { n: 'Lateral Band Walk', d: '3 × 20 steps/side · light–medium band', c: 'Stay in half-squat the whole time. Outer glutes burning = working.' },
      ]},
      { name: 'Core — oblique focus', items: [
        { n: 'Reverse Crunch', d: '3 × 15 · Bodyweight', c: 'Curl tailbone toward ceiling. Lower abs. No neck strain at all.' },
        { n: 'Side Plank Hip Dip', d: '3 × 12/side · Bodyweight', c: 'Love handle killer. Dip hips down and drive up. Stay square.' },
      ]},
    ],
  },
  3: {
    label: 'Run or Pilates', type: 'cardio', icon: 'ti-run', time: 'Lunchtime or evening',
    groups: [
      { name: 'Option A — Easy Run', items: [
        { n: '5 km easy run', d: '30–35 min · conversational pace', c: "Not a race. Speak in sentences throughout. Victoria Park or Regent's Canal are perfect." },
      ]},
      { name: 'Option B — Pilates / Reformer', items: [
        { n: 'Reformer or mat Pilates class', d: '45–55 min', c: 'Deep core, posture and flexibility. Ideal midweek active recovery.' },
      ]},
    ],
  },
  4: {
    label: 'Hot Sculpt', type: 'class', icon: 'ti-flame', time: 'Evening class',
    groups: [
      { name: 'Psycle tips', items: [
        { n: 'Book your Hot Sculpt class', d: '55–60 min · Psycle', c: 'Form over weight — heat makes everything harder. Always stay for the stretch.' },
        { n: 'Hydration', d: '500ml before · sip throughout · 500ml+ after', c: 'Coconut water post-class for electrolytes.' },
        { n: 'Core focus', d: 'Brace abs throughout every exercise', c: 'Constant heat + tension = the magic. Never switch off between sets.' },
      ]},
    ],
  },
  5: {
    label: 'Active Rest', type: 'rest', icon: 'ti-walk', time: 'Evening',
    groups: [
      { name: 'Choose one — no gym needed', items: [
        { n: 'Outdoor walk', d: '45–60 min · 8,000+ steps total', c: 'Hampstead Heath, Victoria Park, Clapham Common. Low intensity = fat burning zone.' },
        { n: 'Foam roll + stretch', d: '20–30 min at home', c: 'Glutes, hip flexors, IT band, hamstrings. YouTube: Yoga with Adriene.' },
      ]},
    ],
  },
  6: {
    label: "Barry's / Tennis / Run", type: 'cardio', icon: 'ti-tennis', time: 'Morning',
    groups: [
      { name: "Option A — Barry's", items: [
        { n: "Barry's Bootcamp class", d: '50 min · full body', c: 'Tell trainer: no heavy deadlifts/bent rows — cable alternatives only for back.' },
      ]},
      { name: 'Option B — Tennis', items: [
        { n: 'Tennis session', d: '60–90 min · with a friend or coach', c: 'Incredible for lean legs, agility and core. Counts as your weekend cardio.' },
      ]},
      { name: 'Option C — Longer Run', items: [
        { n: 'Easy run', d: '5–8 km · easy pace', c: 'Fuel with banana 45 min before. This is not a race — keep it comfortable.' },
      ]},
    ],
  },
  0: {
    label: 'Full Body + Prep', type: 'strength', icon: 'ti-barbell', time: 'Mid-morning',
    groups: [
      { name: 'Full Body — 3 rounds', items: [
        { n: 'Goblet Squat', d: '3 × 12 · 14–18 kg KB', c: 'Heels down, chest up, squat deep. Beginner-friendly form, serious results.' },
        { n: 'DB Incline Chest Press', d: '3 × 10–12 · 8–10 kg/side', c: 'Bench at 30–45°. Control the lowering. Upper chest and shoulders.' },
        { n: 'Step-Up + Knee Drive', d: '3 × 12/side · 8–10 kg/side', c: 'Squeeze the working glute at top. Controlled step down. No rushing.' },
        { n: 'Lateral Raise', d: '3 × 12–15 · 4–6 kg/side', c: 'Arms to shoulder height ONLY. Control the down. Never swing.' },
      ]},
      { name: 'Core finisher', items: [
        { n: 'Forearm Plank', d: '3 × 40 sec · Bodyweight', c: 'Hips level, squeeze everything. Build to 60 sec over weeks.' },
        { n: 'Bicycle Crunches', d: '3 × 20 total · Bodyweight', c: 'Slow and controlled. Elbow to opposite knee. No neck pulling.' },
      ]},
      { name: 'After gym: Meal Prep', items: [
        { n: 'Sunday batch cook', d: '~60 min · sets up your whole week', c: 'Overnight oats × 5 jars · Roast chicken · Batch quinoa + rice · Roast veg trays · Date balls.' },
      ]},
    ],
  },
};

export const MEALS = [
  {
    time: '7am', name: 'Breakfast', desc: 'Overnight oats OR egg muffins',
    kcal: 420, p: 28, c: 48, f: 14,
    prep: 'OVERNIGHT OATS (makes 5 jars — prep Sunday):\n80g oats + 200ml oat milk + 150g Greek yoghurt + 1 tbsp chia seeds + frozen berries. Mix, jar, fridge. Done.\n\nEGG MUFFINS (makes 12 — prep Sunday):\n8 eggs + spinach + feta + mixed peppers + cherry tomatoes. Whisk, pour into muffin tin. 180°C for 20 min. Keeps 5 days in fridge.',
  },
  {
    time: '11am', name: 'Mid-morning snack', desc: 'Apple + almond butter OR rice cakes + cottage cheese',
    kcal: 180, p: 8, c: 22, f: 7,
    prep: "Keep a jar of almond butter at your desk. Wash and bag 5 apples on Sunday. That's all the prep needed.",
  },
  {
    time: '1pm', name: 'Lunch', desc: 'Protein + grain bowl (prepped Sunday)',
    kcal: 520, p: 42, c: 52, f: 14,
    prep: 'BATCH BOWLS (4–5 portions — prep Sunday):\nRoast 600g chicken breast at 200°C for 25 min, then slice.\nCook 300g quinoa.\nRoast 2 trays: peppers + courgette + cherry tomatoes + sweet potato.\nPortion into containers. Drizzle tahini + lemon + olive oil. Add rocket on top fresh each day.',
  },
  {
    time: '4pm', name: 'Afternoon snack', desc: 'Greek yoghurt + berries + granola',
    kcal: 220, p: 18, c: 24, f: 6,
    prep: 'Pre-portion into small jars on Sunday. Keep granola separate in a small zip bag so it stays crunchy. Grab and go.',
  },
  {
    time: '7pm', name: 'Dinner', desc: 'Lean protein + veg (15 min cook)',
    kcal: 560, p: 45, c: 40, f: 18,
    prep: 'WEEKLY ROTATION:\nMon: Salmon + roasted tenderstem + sweet potato mash\nTue: Turkey stir-fry + rice noodles + soy/ginger\nWed: Baked cod + couscous + Mediterranean veg\nThu: Chicken thighs + lentils + steamed greens\nFri: Go out — enjoy it\nSat: Pasta + homemade tomato + chicken or tuna\nSun: Eat from batch cook',
  },
  {
    time: 'Eve', name: 'Sweet fix', desc: 'Dark choc + tea OR date balls',
    kcal: 120, p: 2, c: 14, f: 6,
    prep: 'DATE BALLS (makes 15 — prep Sunday):\n10 Medjool dates + 3 tbsp peanut butter + 2 tbsp cocoa powder. Blend, roll, coat in desiccated coconut. Keep in fridge all week. Your nightly guilt-free sweet fix.',
  },
];

export const GROCERY = [
  { cat: 'Protein', icon: 'ti-meat', color: 'var(--tc)', items: ['Chicken breast (600g)', 'Salmon (2 fillets)', 'Cod (2 fillets)', 'Turkey mince (400g)', 'Smoked salmon (100g)', 'Eggs (12)', 'Greek yoghurt full fat (×2)', 'Cottage cheese', 'Feta (150g)', 'Protein powder'] },
  { cat: 'Carbs & Grains', icon: 'ti-bread', color: '#8B6F47', items: ['Oats (1 bag)', 'Quinoa (500g)', 'Brown rice (500g)', 'Sourdough (1 loaf)', 'Sweet potatoes (4)', 'Rice cakes', 'Granola (1 bag)', 'Rice noodles', 'Lentils (1 tin)', 'Whole wheat pasta'] },
  { cat: 'Veg & Fruit', icon: 'ti-leaf', color: 'var(--green)', items: ['Spinach (big bag)', 'Tenderstem broccoli', 'Courgettes (2)', 'Mixed peppers (5)', 'Cherry tomatoes (×2)', 'Cucumber', 'Kale (bag)', 'Rocket (bag)', 'Avocados (3)', 'Bananas (7)', 'Berries (fresh + frozen)', 'Apples (5)', 'Medjool dates', 'Lemons (3)'] },
  { cat: 'Fats & Flavour', icon: 'ti-droplet', color: 'var(--blue)', items: ['Almond butter', 'Peanut butter', 'Tahini', 'Extra virgin olive oil', 'Dark choc 85% (×2)', 'Almonds (200g)', 'Chia seeds', 'Coconut yoghurt', 'Desiccated coconut', 'Cocoa powder'] },
  { cat: 'Gut-Friendly', icon: 'ti-heart', color: '#9B59B6', items: ['Kefir (small bottle)', 'Kimchi (jar)', 'Peppermint tea', 'Fennel tea', 'Fresh ginger (root)', 'Garlic (bulb)', 'Bone broth (carton)', 'Apple cider vinegar'] },
];

export const GUT = [
  { icon: 'ti-search', title: 'Bloat triggers to identify', body: 'Most common: raw onion, garlic in large amounts, cruciferous veg (broccoli, cauliflower, brussels), beans and lentils if not rinsed, carbonated drinks, sugar alcohols (xylitol, sorbitol in "sugar-free" products), and gluten if sensitive. Cut one at a time for 2 weeks to isolate yours.' },
  { icon: 'ti-clock', title: 'Eating habits that reduce bloat', body: "Eat slowly — 20 mins minimum per meal. Chew properly (massively underrated). Don't talk while eating (swallows air). Sip water with meals rather than gulping. Sit upright 20 mins after eating. Smaller portions more frequently if bloating is severe." },
  { icon: 'ti-leaf', title: 'Foods that actively help', body: 'Ginger: anti-inflammatory, reduces gas — slice into hot water as tea. Fennel tea: directly reduces bloating and cramping. Peppermint tea: relaxes gut muscles. Kefir: live probiotics, one small glass daily. Apple cider vinegar: 1 tsp in water before meals aids digestion. Banana: potassium reduces water retention.' },
  { icon: 'ti-shield', title: "Why love handles don't budge", body: "Cortisol (stress hormone) directly causes fat storage around the belly and love handles. If you're sleeping under 7 hours, chronically stressed, or under-eating, your body holds onto this fat specifically. Sleep 7.5–8.5hrs, eat enough protein, manage stress. Training alone won't shift it." },
  { icon: 'ti-droplet', title: 'Hydration and bloat', body: 'Aim for 2.5–3L daily. Dehydration causes water retention and puffiness. Start every morning with 500ml water before anything else. Add a pinch of salt + squeeze of lemon for electrolytes. Max 2 coffees — excess caffeine is inflammatory and worsens bloat.' },
  { icon: 'ti-moon', title: 'Hormones and cycle bloating', body: 'Bloating is often worst 1–2 weeks before your period (luteal phase) due to progesterone. This is normal and not fat. Reduce salt slightly, increase potassium (banana, avocado), prioritise sleep, and go easier on intense training during these days. It will resolve. Not a failure of your diet.' },
  { icon: 'ti-flame', title: 'Gut inflammation and abs', body: 'Chronically inflamed gut = abs always hidden. Key triggers: ultra-processed food, excess alcohol, excess sugar, seed oils (sunflower, vegetable — swap for olive oil). Anti-inflammatory foods that genuinely help: oily fish, turmeric, ginger, dark leafy greens, berries, and green tea.' },
];
