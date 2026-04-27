// Mock data for StrawPoll clone

export const navLinks = [
  { label: 'Create Poll', path: '/create' },
  { label: 'Schedule Meeting', path: '/meetings' },
  { label: 'Demo', path: '/demo' },
  { label: 'Pricing', path: '/pricing' },
];

export const stats = [
  { label: 'Users', value: '2.3M+' },
  { label: 'Polls', value: '13M+' },
  { label: 'Votes', value: '290M+' },
];

export const features = [
  {
    title: 'Fake Detection',
    description: 'By default, bots and VPN users are blocked from voting on straw polls.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Deadlines',
    description: 'Our polls run indefinitely. You can change that by setting a deadline.',
    icon: 'Clock',
  },
  {
    title: 'Emoji Support',
    description: 'We support all Emojis natively. Feel free to use as many as you want!',
    icon: 'Smile',
  },
  {
    title: 'Live Results',
    description: 'Evaluate your poll results in a pie chart or bar graph in real-time.',
    icon: 'BarChart3',
  },
  {
    title: 'Poll API',
    description: 'We provide an easy to use API for poll creation and result analysis.',
    icon: 'Code2',
  },
  {
    title: 'Active Development',
    description: 'We are continuously working on new features and QoL updates.',
    icon: 'Rocket',
  },
];

export const pricingPlans = [
  {
    name: 'Basic',
    price: 0,
    period: 'forever',
    description: 'For everyone who wants to create simple polls',
    features: [
      'Unlimited polls',
      'Up to 30 options per poll',
      'Basic poll customization',
      'Real-time results',
      'Ads supported',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: 9,
    period: 'month',
    description: 'For power users who need more features',
    features: [
      'Everything in Basic',
      'No ads',
      'Custom branding',
      'Advanced analytics',
      'Export results (CSV/PDF)',
      'Priority support',
    ],
    cta: 'Upgrade now',
    highlight: true,
  },
  {
    name: 'Business',
    price: 29,
    period: 'month',
    description: 'For teams and organizations',
    features: [
      'Everything in Premium',
      'Team management',
      'SSO / SAML',
      'API access',
      'White-label polls',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    highlight: false,
  },
];

export const templates = [
  { id: 't1', title: 'Meeting scheduler', category: 'Work', icon: 'CalendarDays', color: 'from-indigo-500 to-purple-500', description: 'Find the best time for your next team meeting.' },
  { id: 't2', title: 'Event planning', category: 'Social', icon: 'PartyPopper', color: 'from-pink-500 to-rose-500', description: 'Decide on a date, location, and activities.' },
  { id: 't3', title: 'Favorite movie', category: 'Entertainment', icon: 'Film', color: 'from-amber-500 to-orange-500', description: 'Let your audience vote on their favorite films.' },
  { id: 't4', title: 'Team lunch', category: 'Work', icon: 'UtensilsCrossed', color: 'from-emerald-500 to-teal-500', description: 'Where should we grab lunch today?' },
  { id: 't5', title: 'Customer feedback', category: 'Business', icon: 'MessageSquare', color: 'from-blue-500 to-cyan-500', description: 'Collect honest feedback from your customers.' },
  { id: 't6', title: 'Best programming language', category: 'Tech', icon: 'Code', color: 'from-violet-500 to-fuchsia-500', description: 'Start a friendly debate among developers.' },
  { id: 't7', title: 'Weekend plans', category: 'Social', icon: 'Sun', color: 'from-yellow-500 to-orange-400', description: 'What should we do this weekend?' },
  { id: 't8', title: 'Product roadmap vote', category: 'Business', icon: 'Map', color: 'from-red-500 to-pink-500', description: 'Let users prioritize upcoming features.' },
];

export const samplePolls = [
  {
    id: 'eNg6RNDvjgA',
    title: 'What is the best pizza topping?',
    description: 'A classic debate. Cast your vote!',
    author: 'FoodieFan',
    createdAt: '2025-06-02',
    totalVotes: 4821,
    multiple: false,
    options: [
      { id: 'o1', label: 'Pepperoni', votes: 1823 },
      { id: 'o2', label: 'Mushroom', votes: 712 },
      { id: 'o3', label: 'Pineapple', votes: 934 },
      { id: 'o4', label: 'Margherita', votes: 852 },
      { id: 'o5', label: 'BBQ Chicken', votes: 500 },
    ],
  },
  {
    id: 'demo-1',
    title: 'Which programming language do you prefer in 2025?',
    description: 'Vote for your favorite. Multiple choice allowed.',
    author: 'DevCommunity',
    createdAt: '2025-05-20',
    totalVotes: 12984,
    multiple: true,
    options: [
      { id: 'o1', label: 'JavaScript / TypeScript', votes: 4210 },
      { id: 'o2', label: 'Python', votes: 3980 },
      { id: 'o3', label: 'Rust', votes: 1820 },
      { id: 'o4', label: 'Go', votes: 1254 },
      { id: 'o5', label: 'Swift', votes: 520 },
      { id: 'o6', label: 'Kotlin', votes: 1200 },
    ],
  },
  {
    id: 'kogjvr2m2g6',
    title: 'Team meeting availability — week of July 15',
    description: 'Select all times that work for you.',
    author: 'ProjectLead',
    createdAt: '2025-07-08',
    totalVotes: 42,
    multiple: true,
    options: [
      { id: 'o1', label: 'Mon 10:00 AM', votes: 8 },
      { id: 'o2', label: 'Tue 2:00 PM', votes: 12 },
      { id: 'o3', label: 'Wed 11:00 AM', votes: 10 },
      { id: 'o4', label: 'Thu 3:00 PM', votes: 7 },
      { id: 'o5', label: 'Fri 9:00 AM', votes: 5 },
    ],
  },
  {
    id: 'poll-4',
    title: 'Best streaming service right now?',
    description: 'Which one do you actually use most?',
    author: 'BingeWatcher',
    createdAt: '2025-06-18',
    totalVotes: 2341,
    multiple: false,
    options: [
      { id: 'o1', label: 'Netflix', votes: 842 },
      { id: 'o2', label: 'Disney+', votes: 421 },
      { id: 'o3', label: 'Prime Video', votes: 512 },
      { id: 'o4', label: 'HBO Max', votes: 366 },
      { id: 'o5', label: 'Apple TV+', votes: 200 },
    ],
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    quote: 'StrawPoll made it so easy to gather team feedback. We use it every sprint planning.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Community Lead',
    quote: 'I run polls for my 50k-member community. Fast, clean, and it just works.',
    avatar: 'MJ',
  },
  {
    name: 'Elena Rossi',
    role: 'Event Organizer',
    quote: 'Scheduling meetings used to be a nightmare. Now it takes 30 seconds.',
    avatar: 'ER',
  },
];

// localStorage helpers
const POLLS_KEY = 'strawpoll_polls';
const VOTES_KEY = 'strawpoll_votes';
const AUTH_KEY = 'strawpoll_auth';

export const getStoredPolls = () => {
  try {
    const raw = localStorage.getItem(POLLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const savePoll = (poll) => {
  const polls = getStoredPolls();
  polls.unshift(poll);
  localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
};

export const findPoll = (id) => {
  const all = [...getStoredPolls(), ...samplePolls];
  return all.find(p => p.id === id);
};

export const recordVote = (pollId, optionIds) => {
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  votes[pollId] = optionIds;
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));

  // update stored polls
  const polls = getStoredPolls();
  const idx = polls.findIndex(p => p.id === pollId);
  if (idx >= 0) {
    optionIds.forEach(oid => {
      const opt = polls[idx].options.find(o => o.id === oid);
      if (opt) opt.votes += 1;
    });
    polls[idx].totalVotes += optionIds.length;
    localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
  } else {
    // update sample polls in-memory (cloned)
    const sample = samplePolls.find(p => p.id === pollId);
    if (sample) {
      optionIds.forEach(oid => {
        const opt = sample.options.find(o => o.id === oid);
        if (opt) opt.votes += 1;
      });
      sample.totalVotes += optionIds.length;
    }
  }
};

export const getUserVote = (pollId) => {
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  return votes[pollId] || null;
};

export const getAuth = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch { return null; }
};
export const setAuth = (user) => localStorage.setItem(AUTH_KEY, JSON.stringify(user));
export const clearAuth = () => localStorage.removeItem(AUTH_KEY);

export const generateId = () => Math.random().toString(36).substring(2, 11);
