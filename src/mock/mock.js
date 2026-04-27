// Mock data for StrawPoll clone

export const navLinks = [
  { label: 'Create Poll', path: '/create' },
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

// API helpers
const API_URL = '/api';

/** Returns auth header object if user is logged in, else empty object */
const authHeaders = () => {
  const user = getAuth();
  if (user?.token) return { Authorization: `Bearer ${user.token}` };
  return {};
};

/**
 * Fetch the logged-in user's own polls from /api/polls/mine.
 * Returns [] if not logged in or backend fails.
 */
export const getStoredPolls = async () => {
  try {
    const user = getAuth();
    if (!user?.token) return [];
    const res = await fetch(`${API_URL}/polls/mine`, {
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch polls');
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

/**
 * Create a new poll.
 * If logged in, sends the JWT so the poll is linked to that user.
 * If not logged in, the poll is anonymous (won't show in any dashboard).
 */
export const savePoll = async (poll) => {
  try {
    const res = await fetch(`${API_URL}/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(poll),
    });
    if (!res.ok) throw new Error('Failed to create poll');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Delete a poll by ID. Requires auth.
 */
export const deletePoll = async (pollId) => {
  try {
    const res = await fetch(`${API_URL}/polls/${pollId}`, {
      method: 'DELETE',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to delete poll');
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const findPoll = async (id) => {
  try {
    const res = await fetch(`${API_URL}/polls/${id}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.error(err);
  }
  // Fallback to sample polls for demo purposes
  return samplePolls.find(p => p.id === id || p._id === id);
};

export const recordVote = async (pollId, optionIds) => {
  // Track locally so the UI knows what the user voted
  const VOTES_KEY = 'strawpoll_votes';
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  votes[pollId] = optionIds;
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));

  const res = await fetch(`${API_URL}/polls/${pollId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ optionIds }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Failed to record vote');
  return data;
};

export const getUserVote = (pollId) => {
  const VOTES_KEY = 'strawpoll_votes';
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '{}');
  return votes[pollId] || null;
};

const AUTH_KEY = 'strawpoll_auth';

export const getAuth = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch { return null; }
};
export const setAuth = (user) => localStorage.setItem(AUTH_KEY, JSON.stringify(user));
export const clearAuth = () => localStorage.removeItem(AUTH_KEY);

/** Returns true if current logged-in user has premium */
export const isPremiumUser = () => {
  const u = getAuth();
  return u?.isPremium === true;
};

/**
 * Upgrade the current user to premium (1-click).
 * Calls /api/auth/upgrade, gets a fresh JWT with isPremium:true, saves it.
 */
export const upgradeToPremium = async () => {
  const user = getAuth();
  if (!user?.token) throw new Error('Not logged in');
  const res = await fetch('/api/auth/upgrade', {
    method: 'POST',
    headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || 'Upgrade failed');
  // Store the new token that contains isPremium: true
  setAuth({ name: data.user.name, email: data.user.email, token: data.token, isPremium: true });
  return data;
};

export const generateId = () => Math.random().toString(36).substring(2, 11);
