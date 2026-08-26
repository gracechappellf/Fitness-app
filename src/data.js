export const SCHED = {
  1: {
    label: 'Upper Body Pull', type: 'strength', icon: 'ti-barbell', time: '6:30am or 7pm',
    groups: [
      { name: 'Superset A — 3 rounds, 75s rest', items: [
        { n: 'Lat Pulldown', d: '3 × 10–12 · 20–27 kg', c: 'Pull bar to chest, squeeze lats hard. 3-second return. University cable machine.' },
        { n: 'DB Shoulder Press', d: '3 × 10–12 · 8–10 kg/side', c: 'Core braced, press overhead without arching lower back. Control the lowering.' },
      ]},
      { name: 'Superset B — 3 rounds, 75s rest', items: [
        { n: 'Seated Cable Row', d: '3 × 10–12 · 25–32 kg', c: 'Pull elbows past body, squeeze shoulder blades together. Pause 1 sec at peak.' },
        { n: 'DB Bicep Curl', d: '3 × 12 · 8–10 kg/side', c: '3 seconds down. No swinging. Elbows stay pinned at sides.' },
      ]},
      { name: 'Superset C — 3 rounds, 60s rest', items: [
        { n: 'Face Pull (cable)', d: '3 × 15 · 10–14 kg', c: 'Rope attachment, pull to face. Rear delts and rotator cuff. Posture work.' },
        { n: 'Tricep Pushdown (cable)', d: '3 × 12 · 12–18 kg', c: 'Elbows glued to sides. Full extension at bottom. Squeeze.' },
      ]},
      { name: 'Core finisher', items: [
        { n: 'Dead Bug', d: '3 × 10/side · Bodyweight', c: 'Back FLAT to floor. Opposite arm + leg extend. Never let lower back lift.' },
        { n: 'Pallof Press (cable)', d: '3 × 12/side · 8–12 kg', c: 'Stand sideways to cable. Press out, resist rotation. Anti-twist core strength.' },
      ]},
    ],
  },
  2: {
    label: 'Glutes & Legs', type: 'strength', icon: 'ti-barbell', time: '6:30am or 7pm',
    groups: [
      { name: 'Warm-up', items: [
        { n: 'Incline Treadmill Walk', d: '8 min · 12% incline · 5.5 km/h', c: 'Gets glutes firing before lifting. Never skip — cold glutes = wasted session.' },
      ]},
      { name: 'Superset A — 3 rounds, 90s rest', items: [
        { n: 'Barbell Hip Thrust', d: '3 × 10–12 · 40–60 kg', c: 'Shoulders on bench, drive through heels. Squeeze glutes 1 sec at top. Not your back.' },
        { n: 'Cable Kickback', d: '3 × 12/side · 5–10 kg', c: 'Hips square. Slow descent. Squeeze hard at top. Use the university cable station.' },
      ]},
      { name: 'Superset B — 3 rounds, 90s rest', items: [
        { n: 'Barbell Back Squat', d: '3 × 10 · 30–50 kg', c: 'Bar on upper traps, chest up, squat below parallel. Drive knees out.' },
        { n: 'Lateral Band Walk', d: '3 × 20 steps/side · medium band', c: 'Half squat throughout. Outer glutes on fire = working. Short steps, controlled.' },
      ]},
      { name: 'Romanian Deadlift — 3 rounds', items: [
        { n: 'Romanian Deadlift (barbell)', d: '3 × 10 · 30–45 kg', c: 'Hinge at hips, soft knee bend, bar close to legs. Feel hamstrings stretch deeply.' },
      ]},
      { name: 'Core finisher', items: [
        { n: 'Reverse Crunch', d: '3 × 15 · Bodyweight', c: 'Curl tailbone toward ceiling. Lower abs doing the work. No neck tension.' },
        { n: 'Side Plank Hip Dip', d: '3 × 12/side · Bodyweight', c: 'Dip hips to floor and drive back up. Obliques burning = working. Stay square.' },
      ]},
    ],
  },
  3: {
    label: 'Swim Session', type: 'cardio', icon: 'ti-ripple', time: 'Morning or lunchtime',
    groups: [
      { name: 'Warm-up', items: [
        { n: 'Easy swim', d: '4 × 50m freestyle · 30s rest between', c: 'Relaxed pace. Focus on breathing rhythm. Get comfortable before the work sets.' },
      ]},
      { name: 'Main set — 3 rounds', items: [
        { n: 'Freestyle intervals', d: '4 × 100m · 45s rest · moderate effort', c: 'Aim for consistent splits. Breathe every 3 strokes. Long reach, high elbow pull.' },
        { n: 'Kickboard sprint', d: '2 × 50m · 30s rest · hard effort', c: 'Legs only. Great for glutes and hip flexors. Kick from the hip, not the knee.' },
      ]},
      { name: 'Cool-down', items: [
        { n: 'Backstroke cool-down', d: '4 × 50m backstroke · easy', c: 'Opens chest and shoulders. Zero pressure — just move and breathe.' },
        { n: 'Pool stretches', d: '5 min · hold onto lane rope', c: "Hip flexor stretch, calf stretch, shoulder across body. Great while you're warm." },
      ]},
    ],
  },
  4: {
    label: 'Push & Core', type: 'strength', icon: 'ti-barbell', time: '6:30am or 7pm',
    groups: [
      { name: 'Superset A — 4 rounds, 90s rest', items: [
        { n: 'Barbell Bench Press', d: '4 × 8–10 · 25–40 kg', c: 'Feet flat, arch minimal, bar to lower chest. Elbows 45° from body. Control the down.' },
        { n: 'Incline DB Press', d: '4 × 10 · 10–14 kg/side', c: "Bench at 30°. Upper chest focus. Don't lock elbows at top — keep tension." },
      ]},
      { name: 'Superset B — 3 rounds, 75s rest', items: [
        { n: 'Lateral Raise (DB)', d: '3 × 15 · 5–8 kg/side', c: 'Arms to shoulder height ONLY. Thumbs slightly down. 3-second lower. No swinging.' },
        { n: 'Cable Chest Fly', d: '3 × 12 · 8–12 kg/side', c: 'Wide arc, slight elbow bend throughout. Squeeze at center. Stretch at the sides.' },
      ]},
      { name: 'Core circuit — 3 rounds, no rest between', items: [
        { n: 'Cable Crunch', d: '3 × 15 · 12–18 kg', c: "Kneel facing cable. Crunch down, contract abs hard. Don't just pull with arms." },
        { n: 'Hanging Knee Raise', d: '3 × 12 · Bodyweight', c: 'Hang from bar. Bring knees to chest, curl pelvis up. Controlled descent. Lower abs.' },
        { n: 'Ab Wheel Rollout', d: '3 × 8–10 · Bodyweight', c: 'Slow rollout to near floor, pull back with abs not arms. Stop if back arches.' },
      ]},
    ],
  },
  5: {
    label: 'Tennis or Volleyball', type: 'class', icon: 'ti-tennis', time: 'Intramurals or rec courts',
    groups: [
      { name: 'Tennis tips', items: [
        { n: 'Intramural or rec court session', d: '60–90 min · rallying + points', c: 'Incredible for agility, lean legs, reaction time. Counts as full cardio. Show up.' },
        { n: 'Serve practice', d: '10 min · consistent toss + contact', c: 'Toss in front of your hitting shoulder. Trophy position before swinging through.' },
        { n: 'Footwork drill', d: '5 min · side shuffles to each corner', c: 'Ready position between every shot. Split step when opponent contacts the ball.' },
      ]},
      { name: 'Volleyball intramurals', items: [
        { n: 'Intramural volleyball match', d: '60 min · full game', c: 'Core stability from every dig and spike. Explosive jumps = full body conditioning.' },
        { n: 'Post-match stretch', d: '10 min · hip flexors + shoulders', c: "Volleyball is hard on shoulders and hips. Don't skip this — it prevents injury." },
      ]},
    ],
  },
  6: {
    label: 'Full Body Power', type: 'strength', icon: 'ti-barbell', time: 'Morning',
    groups: [
      { name: 'Big lifts — 4 rounds, 2 min rest', items: [
        { n: 'Conventional Deadlift', d: '4 × 6–8 · 50–80 kg', c: 'Bar over mid-foot. Hip hinge. Drive through floor. Brace core before EVERY rep.' },
        { n: 'Barbell Walking Lunge', d: '4 × 10/side · 20–30 kg', c: 'Big step, front knee over toes, back knee to floor. Upright torso throughout.' },
      ]},
      { name: 'Superset — 3 rounds, 90s rest', items: [
        { n: 'Pull-ups (or Assisted)', d: '3 × max reps · Bodyweight or machine', c: "Dead hang start. Pull chin over bar. If you can't yet, use the assisted machine daily." },
        { n: 'DB Bulgarian Split Squat', d: '3 × 10/side · 10–14 kg/side', c: "Rear foot elevated. Front knee doesn't cave in. Harder than it looks — good." },
      ]},
      { name: 'Conditioning AMRAP — 10 min', items: [
        { n: 'AMRAP circuit', d: '10 min: 10 kettlebell swings + 10 push-ups + 10 jump squats', c: 'As many rounds as possible. Rest only when you must. Track rounds for next week.' },
      ]},
    ],
  },
  0: {
    label: 'Active Rest + Prep', type: 'rest', icon: 'ti-walk', time: 'Morning',
    groups: [
      { name: 'Active recovery', items: [
        { n: 'Campus walk', d: '30–45 min · 6,000+ steps', c: 'Explore campus or the neighborhood. Low intensity zone = active fat burning. No rush.' },
        { n: 'Foam roll & stretch', d: '20–30 min · floor session', c: 'Glutes, hip flexors, IT band, upper back. YouTube: Yoga with Adriene 20-min Sunday stretch.' },
      ]},
      { name: 'Sunday meal prep — low carb batch cook', items: [
        { n: 'Protein batch cook', d: '~60 min · sets up your whole week', c: 'Roast 700g chicken breast · season ground turkey and brown · hard-boil 8 eggs · bake 12 egg muffins.' },
        { n: 'Veg prep', d: '20 min · wash and chop', c: 'Portion cucumber + bell peppers + cherry tomatoes into snack containers. Roast broccoli + zucchini for dinners.' },
        { n: 'Portion lunches', d: '10 min · 5 containers', c: 'Layer chicken + avocado + greens + olive oil into 5 containers. Grab and go all week.' },
      ]},
    ],
  },
};

export const MEALS = [
  {
    time: '7am', name: 'Breakfast', desc: 'Greek yoghurt protein bowl',
    kcal: 380, p: 42, c: 18, f: 14,
    prep: 'GREEK YOGHURT BOWL:\n200g full-fat Greek yoghurt + 1 scoop vanilla protein powder (mix in well) + handful of blueberries/raspberries + 1 tbsp almond butter + sprinkle of cinnamon.\n\nMEAL-PREP: Portion yoghurt into 5 small containers Sunday. Keep berries and almond butter separate. Stir together in 60 seconds each morning. High protein, zero cooking.',
  },
  {
    time: '10:30am', name: 'Mid-morning snack', desc: 'Hard-boiled eggs + string cheese',
    kcal: 190, p: 22, c: 2, f: 10,
    prep: 'BOILED EGGS (prep Sunday):\nBoil 8 eggs for 10 minutes. Cool, peel, store in fridge. Grab 2 with a stick of string cheese — 22g protein, zero prep each day. Keep a small salt + pepper packet in your bag.',
  },
  {
    time: '1pm', name: 'Lunch', desc: 'Chicken + avocado greens bowl',
    kcal: 480, p: 48, c: 10, f: 26,
    prep: 'BATCH BOWLS (5 portions — prep Sunday):\nRoast 700g chicken breast at 200°C for 25 min with olive oil + garlic powder + paprika. Slice and cool.\nLayer in containers: big handful baby spinach + arugula → sliced chicken → ½ avocado (sliced day-of) → cherry tomatoes → cucumber.\nDressing: 1 tbsp olive oil + lemon juice + salt + pepper. Dress day-of to keep greens fresh.',
  },
  {
    time: '4pm', name: 'Afternoon snack', desc: 'Cottage cheese + cucumber slices',
    kcal: 160, p: 24, c: 6, f: 4,
    prep: '150g cottage cheese + sliced cucumber + cracked black pepper + pinch of sea salt. Pre-portion cottage cheese into small containers Sunday. Add cucumber fresh each day — takes 1 minute. High protein, keeps you full until dinner.',
  },
  {
    time: '7pm', name: 'Dinner', desc: 'Ground turkey + roasted veg (20 min cook)',
    kcal: 480, p: 48, c: 14, f: 22,
    prep: 'WEEKLY ROTATION:\nMon: Ground turkey + zucchini noodles + marinara (no pasta)\nTue: Chicken breast + roasted broccoli + cauliflower mash\nWed: Salmon fillet + roasted asparagus + side salad\nThu: Shrimp stir-fry + bok choy + no-rice cauliflower rice\nFri: Go out — pick protein + veg options\nSat: Beef burger (no bun) + lettuce wrap + roasted sweet potato fries (small)\nSun: Eat from Sunday batch protein + roasted veg',
  },
  {
    time: 'Eve', name: 'Evening snack', desc: 'Cottage cheese + berries OR dark choc',
    kcal: 140, p: 18, c: 8, f: 4,
    prep: '100g cottage cheese + handful of blueberries + drizzle of vanilla extract. High-protein pre-bed snack that actually aids muscle repair overnight. OR 2 squares 85%+ dark choc with herbal tea — under 5g carbs.',
  },
];

export const GROCERY = [
  { cat: 'Protein', icon: 'ti-meat', color: 'var(--tc)', items: ['Chicken breast (700g)', 'Ground turkey (500g)', 'Salmon fillets (×4)', 'Shrimp/prawns (300g)', 'Eggs (18)', 'Greek yoghurt full fat (×3)', 'Cottage cheese (large tub)', 'String cheese (pack)', 'Protein powder (vanilla)', 'Beef burgers (×4 patties)'] },
  { cat: 'Veg & Salad', icon: 'ti-leaf', color: 'var(--green)', items: ['Baby spinach (large bag)', 'Arugula/rocket (bag)', 'Broccoli (2 heads)', 'Zucchini / courgette (3)', 'Asparagus (bunch)', 'Bok choy (2)', 'Cauliflower (1 head)', 'Cherry tomatoes (×2 punnets)', 'Cucumber (2)', 'Bell peppers (4 mixed)', 'Avocados (5)', 'Fresh garlic (bulb)', 'Lemons (4)'] },
  { cat: 'Fats & Flavour', icon: 'ti-droplet', color: 'var(--blue)', items: ['Extra virgin olive oil', 'Almond butter', 'Almonds (200g)', 'Walnuts (bag)', 'Dark choc 85%+ (×2)', 'Coconut oil', 'Feta cheese (150g)', 'Parmesan (small block)'] },
  { cat: 'Dairy & Eggs', icon: 'ti-heart', color: '#9B59B6', items: ['Greek yoghurt (full fat × 3)', 'Cottage cheese (large)', 'Cream cheese (small)', 'Butter (unsalted)', 'Heavy cream (small carton)', 'Cheddar slices (pack)'] },
  { cat: 'Pantry', icon: 'ti-package', color: '#8B6F47', items: ['Canned tuna in water (×4)', 'Marinara sauce (low sugar)', 'Chicken broth (carton)', 'Paprika · garlic powder · cumin', 'Salt · pepper · cinnamon', 'Almond flour (small bag)', 'Peppermint tea · green tea'] },
];

// ── Meal plan rotations ──────────────────────────────────────────────────────

const MEALS_B = [
  {
    time: '7am', name: 'Breakfast', desc: 'Smoked salmon scrambled eggs',
    kcal: 360, p: 38, c: 4, f: 20,
    prep: 'SCRAMBLED EGGS WITH SMOKED SALMON:\n3 eggs + 1 extra egg white scrambled low and slow in 1 tsp butter. Top with 80g smoked salmon + capers + squeeze of lemon. Season with cracked black pepper.\n\nMEAL-PREP OPTION: Make egg + smoked salmon muffins Sunday — 8 eggs + 80g chopped smoked salmon + dill + 2 tbsp cream cheese. Pour into muffin tin. 180°C for 20 min. Grab 2 each morning.',
  },
  {
    time: '10:30am', name: 'Mid-morning snack', desc: 'Tuna + avocado lettuce cups',
    kcal: 200, p: 26, c: 4, f: 10,
    prep: 'Open 1 can tuna, drain well. Mash with ½ small avocado + squeeze of lemon + salt + pepper. Serve in 2–3 romaine lettuce leaves. Takes 3 minutes. Can be prepped the night before and kept sealed in fridge.',
  },
  {
    time: '1pm', name: 'Lunch', desc: 'Salmon + cucumber salad bowls',
    kcal: 460, p: 44, c: 8, f: 26,
    prep: 'SALMON BOWLS (4 portions — prep Sunday):\nBake 4 salmon fillets at 200°C for 18 min with olive oil + lemon + dill. Flake and cool.\nBase: baby spinach + cucumber + cherry tomatoes + red onion (thin slices).\nDressing: 2 tbsp olive oil + 1 tbsp red wine vinegar + 1 tsp Dijon mustard + salt.\nLayer and seal. Add avocado slices day-of.',
  },
  {
    time: '4pm', name: 'Afternoon snack', desc: 'Greek yoghurt + berries',
    kcal: 180, p: 20, c: 12, f: 6,
    prep: '150g plain full-fat Greek yoghurt + handful of raspberries or blueberries + cinnamon. Pre-portioned Sunday into small jars. Takes 30 seconds to grab from fridge. High protein, anti-inflammatory.',
  },
  {
    time: '7pm', name: 'Dinner', desc: 'Fish rotation (20 min cook)',
    kcal: 460, p: 46, c: 8, f: 24,
    prep: 'WEEKLY FISH ROTATION:\nMon: Baked salmon + roasted asparagus + garlic butter\nTue: Shrimp stir-fry + bok choy + tamari (low-sodium soy)\nWed: Baked cod + roasted broccoli + lemon herb sauce\nThu: Tuna steak + cucumber salad + olive oil dressing\nFri: Go out — fish taco bowl without the tortilla\nSat: Smoked salmon + poached eggs + avocado (brunch plate)\nSun: Shrimp + cauliflower rice + roasted peppers',
  },
  {
    time: 'Eve', name: 'Evening snack', desc: 'String cheese + almonds',
    kcal: 150, p: 12, c: 3, f: 10,
    prep: '1–2 sticks string cheese + small handful (20g) almonds. Zero prep, pure protein + fat. Keeps you satiated without spiking blood sugar before bed.',
  },
];

const MEALS_C = [
  {
    time: '7am', name: 'Breakfast', desc: 'Egg muffins (batch cooked Sunday)',
    kcal: 300, p: 30, c: 4, f: 18,
    prep: 'EGG MUFFINS (makes 12 — prep Sunday):\n8 eggs + 2 egg whites. Whisk with: 100g chopped spinach + ½ cup diced peppers + 50g feta or cheddar + garlic powder + salt + pepper.\nPour into greased muffin tin. 180°C for 22 min. Makes 12 — eat 2–3 each morning.\nKeeps 5 days in fridge, freezes well. Cheapest high-protein breakfast going.',
  },
  {
    time: '10:30am', name: 'Mid-morning snack', desc: 'Canned tuna + celery sticks',
    kcal: 150, p: 28, c: 2, f: 2,
    prep: 'Open 1 small can of tuna in water, drain well. Season with lemon juice + black pepper + a dash of hot sauce. Eat with celery sticks for crunch. Zero prep. 28g protein for basically nothing. Keep cans at your desk or in a dorm room cabinet.',
  },
  {
    time: '1pm', name: 'Lunch', desc: 'Ground turkey + roasted veg (prepped Sunday)',
    kcal: 420, p: 44, c: 12, f: 18,
    prep: 'BATCH COOK (5 portions — prep Sunday):\nBrown 500g ground turkey in a skillet with olive oil + garlic + paprika + cumin + salt + pepper. Drain.\nRoast 2 trays: broccoli + zucchini + peppers at 200°C for 25 min with olive oil + salt.\nPortion into 5 containers. Drizzle with olive oil + splash of lemon. Done for the week.',
  },
  {
    time: '4pm', name: 'Afternoon snack', desc: 'Cottage cheese + cucumber + hot sauce',
    kcal: 140, p: 22, c: 5, f: 3,
    prep: "150g cottage cheese in a bowl. Slice cucumber on top. Add hot sauce (Tabasco or Frank's RedHot). Seriously filling and high protein. Buy a big tub — it's one of the cheapest protein sources per gram. Done in 60 seconds.",
  },
  {
    time: '7pm', name: 'Dinner', desc: 'Budget protein rotation (20 min cook)',
    kcal: 440, p: 46, c: 14, f: 18,
    prep: 'BUDGET WEEKLY ROTATION:\nMon: Ground turkey + zucchini noodles (use peeler or buy pre-spiralized)\nTue: Eggs × 4 scrambled + sautéed peppers + spinach + hot sauce (breakfast-for-dinner)\nWed: Canned tuna + avocado + romaine salad + olive oil\nThu: Chicken breast + cauliflower rice (microwave bag) + broccoli\nFri: Go out or campus dining — protein plate\nSat: Turkey meatballs + marinara + zucchini noodles\nSun: Egg muffins × 3 + avocado + hot sauce',
  },
  {
    time: 'Eve', name: 'Evening snack', desc: 'Peanut butter + celery OR dark choc',
    kcal: 130, p: 6, c: 8, f: 9,
    prep: '1 tbsp peanut butter (natural, no added sugar) on celery sticks. Crunchy, satisfying, and actually good. OR 2 squares 85% dark choc with herbal tea. Either keeps you under 10g carbs and curbs late-night cravings.',
  },
];

export const MEAL_PLANS = {
  A: MEALS,
  B: MEALS_B,
  C: MEALS_C,
};

// ── Grocery plan rotations ───────────────────────────────────────────────────

export const GROCERY_PLANS = {
  A: GROCERY,
  B: [
    { cat: 'Protein', icon: 'ti-meat', color: 'var(--tc)', items: ['Salmon fillets (×6)', 'Shrimp/prawns (400g)', 'Smoked salmon (150g)', 'Cod fillets (×2)', 'Tuna steaks (×2)', 'Canned tuna in water (×4)', 'Eggs (12)', 'Greek yoghurt full fat (×3)', 'String cheese (pack)', 'Protein powder'] },
    { cat: 'Veg & Salad', icon: 'ti-leaf', color: 'var(--green)', items: ['Baby spinach (large bag)', 'Romaine lettuce (2 heads)', 'Asparagus (bunch)', 'Bok choy (3)', 'Broccoli (2 heads)', 'Cucumber (3)', 'Cherry tomatoes (×2)', 'Bell peppers (4)', 'Red onion (2)', 'Avocados (5)', 'Fresh dill + parsley', 'Lemons (5)', 'Limes (2)'] },
    { cat: 'Fats & Flavour', icon: 'ti-droplet', color: 'var(--blue)', items: ['Extra virgin olive oil', 'Unsalted butter', 'Capers (jar)', 'Dijon mustard', 'Tamari / low-sodium soy sauce', 'Red wine vinegar', 'Garlic (bulb)', 'Dark choc 85%+ (×2)', 'Almonds (200g)'] },
    { cat: 'Pantry', icon: 'ti-package', color: '#8B6F47', items: ['Cream cheese (small)', 'Feta cheese (150g)', 'Chicken broth (carton)', 'Dill (fresh or dried)', 'Paprika · garlic powder', 'Salt · pepper · chili flakes', 'Peppermint tea · green tea'] },
    { cat: 'Gut-Friendly', icon: 'ti-heart', color: '#9B59B6', items: ['Kefir (small bottle)', 'Miso paste (small tub)', 'Apple cider vinegar', 'Ginger root (fresh)', 'Turmeric powder', 'Bone broth (carton)'] },
  ],
  C: [
    { cat: 'Protein', icon: 'ti-meat', color: 'var(--tc)', items: ['Eggs (18 — key to this plan)', 'Ground turkey (500g)', 'Canned tuna in water (×8)', 'Chicken breast (500g)', 'Cottage cheese (large tub × 2)', 'String cheese (pack × 2)', 'Peanut butter (natural)', 'Protein powder (1 bag)'] },
    { cat: 'Veg & Salad', icon: 'ti-leaf', color: 'var(--green)', items: ['Spinach (large bag)', 'Romaine lettuce (2 heads)', 'Celery (bunch)', 'Broccoli (3 heads)', 'Zucchini / courgette (4)', 'Cauliflower (1 head)', 'Bell peppers (6)', 'Cherry tomatoes (×2)', 'Cucumber (2)', 'Avocados (4)'] },
    { cat: 'Fats & Flavour', icon: 'ti-droplet', color: 'var(--blue)', items: ["Extra virgin olive oil", "Hot sauce (Frank's or Tabasco)", 'Garlic powder · paprika · cumin', 'Lemon juice (bottle or fresh)', 'Cheddar cheese (block)', 'Feta (small pack)', 'Dark choc 85%+ (×2)', 'Almonds (small bag)'] },
    { cat: 'Pantry', icon: 'ti-package', color: '#8B6F47', items: ['Marinara sauce (low sugar)', 'Canned tuna × 8', 'Chicken broth', 'Salt · pepper · chili flakes', 'Cooking spray or coconut oil', 'Peppermint tea · herbal tea'] },
    { cat: 'Gut-Friendly', icon: 'ti-heart', color: '#9B59B6', items: ['Apple cider vinegar', 'Ginger root', 'Peppermint tea', 'Kimchi (jar)', 'Kefir (small bottle)'] },
  ],
};

// ── Diary ────────────────────────────────────────────────────────────────────

export const DIARY_SYMPTOM_TAGS = [
  'Bloating', 'Gas', 'Cramping', 'Nausea', 'Tired', 'Brain fog',
  'Headache', 'Skin flare', 'Good energy', 'Great mood', 'Constipation', 'Loose stools',
];

export const GUT = [
  { icon: 'ti-search', title: 'Bloat triggers to identify', body: 'Most common: raw onion, garlic in large amounts, cruciferous veg (broccoli, cauliflower, brussels), beans and lentils if not rinsed, carbonated drinks, sugar alcohols (xylitol, sorbitol in "sugar-free" products), and gluten if sensitive. Cut one at a time for 2 weeks to isolate yours.' },
  { icon: 'ti-clock', title: 'Eating habits that reduce bloat', body: "Eat slowly — 20 mins minimum per meal. Chew properly (massively underrated). Don't talk while eating (swallows air). Sip water with meals rather than gulping. Sit upright 20 mins after eating. Smaller portions more frequently if bloating is severe." },
  { icon: 'ti-leaf', title: 'Foods that actively help', body: 'Ginger: anti-inflammatory, reduces gas — slice into hot water as tea. Fennel tea: directly reduces bloating and cramping. Peppermint tea: relaxes gut muscles. Kefir: live probiotics, one small glass daily. Apple cider vinegar: 1 tsp in water before meals aids digestion. Avocado: healthy fats reduce inflammation.' },
  { icon: 'ti-shield', title: "Why love handles don't budge", body: "Cortisol (stress hormone) directly causes fat storage around the belly and love handles. If you're sleeping under 7 hours, chronically stressed, or under-eating, your body holds onto this fat specifically. Sleep 7.5–8.5hrs, eat enough protein (aim for 130–150g daily), and stay in a moderate calorie deficit. Training alone won't shift it." },
  { icon: 'ti-droplet', title: 'Hydration on a low-carb plan', body: 'Low carb = more water excreted. Aim for 2.5–3L daily and add electrolytes. Start every morning with 500ml water + pinch of sea salt + squeeze of lemon. Headaches in the first week of low carb are almost always dehydration. Max 2 coffees — excess caffeine increases cortisol and worsens cravings.' },
  { icon: 'ti-moon', title: 'Hormones and cycle bloating', body: 'Bloating is often worst 1–2 weeks before your period (luteal phase) due to progesterone. This is normal and not fat. Reduce sodium slightly, increase potassium (avocado, leafy greens), prioritise sleep, and go easier on intense training during these days. It will resolve. Not a failure of your diet.' },
  { icon: 'ti-flame', title: 'Low carb and fat loss science', body: 'Keeping net carbs under 70–80g daily lowers insulin, which is the primary fat-storage hormone. When insulin stays low, your body shifts to burning fat for fuel. High protein (130–150g) preserves muscle while you lose fat. The low-carb fatigue in week 1 is temporary — push through it. By week 3 energy is better than before.' },
];
