import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, Settings2, Sparkles, Loader2, Crown, Lock,
  Image, List, GripVertical, CalendarClock, Check, X, Star,
  ChevronRight, Upload
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { savePoll, generateId, getAuth, isPremiumUser, upgradeToPremium } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

/* ── Poll Types Definition ─────────────────────────────────── */
const POLL_TYPES = [
  {
    id: 'basic',
    label: 'Standard Poll',
    icon: List,
    description: 'Classic multiple-choice poll',
    premium: false,
    color: 'indigo',
  },
  {
    id: 'image',
    label: 'Image Poll',
    icon: Image,
    description: 'Options with images — visual voting',
    premium: true,
    color: 'violet',
  },
  {
    id: 'ranking',
    label: 'Ranking Poll',
    icon: GripVertical,
    description: 'Voters rank options in order',
    premium: true,
    color: 'pink',
  },
  {
    id: 'meeting',
    label: 'Schedule Meeting',
    icon: CalendarClock,
    description: 'Find the best time for a group',
    premium: true,
    color: 'amber',
  },
];

/* ── Upgrade Modal ─────────────────────────────────────────── */
function UpgradeModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    const user = getAuth();
    if (!user) {
      navigate('/signup');
      return;
    }
    setLoading(true);
    try {
      await upgradeToPremium();
      toast({ title: '🎉 Welcome to Premium!', description: 'You now have access to all premium poll types.' });
      onSuccess();
    } catch (err) {
      toast({ title: 'Upgrade failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Upgrade to Premium</h2>
          <p className="mt-2 text-purple-200 text-sm">Unlock advanced poll types and powerful features</p>
        </div>

        {/* Price */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-5xl font-extrabold text-slate-900">$9</span>
            <div className="text-slate-500">
              <div className="text-sm font-medium">/month</div>
              <div className="text-xs">Cancel anytime</div>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {[
              { icon: Image,       text: 'Image Polls — visual voting with pictures' },
              { icon: GripVertical, text: 'Ranking Polls — rank options in order' },
              { icon: CalendarClock, text: 'Schedule Meeting — find the best time' },
              { icon: Star,        text: 'No ads, priority support' },
              { icon: Check,       text: 'Unlimited premium polls' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                {text}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full h-13 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-base"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
            ) : (
              <><Crown className="w-5 h-5 text-yellow-300" /> Buy Premium — $9/month</>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400 pb-6">30-day money-back guarantee · No credit card fraud risk</p>
        </div>
      </div>
    </div>
  );
}

/* ── Poll Type Selector ─────────────────────────────────────── */
function PollTypeSelector({ selected, onChange }) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [pendingType, setPendingType] = useState(null);
  const premium = isPremiumUser();

  const handleSelect = (type) => {
    if (type.premium && !premium) {
      setPendingType(type);
      setShowUpgrade(true);
    } else {
      onChange(type.id);
    }
  };

  const colorMap = {
    indigo: 'border-indigo-300 bg-indigo-50 text-indigo-700',
    violet: 'border-violet-300 bg-violet-50 text-violet-700',
    pink:   'border-pink-300 bg-pink-50 text-pink-700',
    amber:  'border-amber-300 bg-amber-50 text-amber-700',
  };

  const ringMap = {
    indigo: 'ring-indigo-500 border-indigo-500',
    violet: 'ring-violet-500 border-violet-500',
    pink:   'ring-pink-500 border-pink-500',
    amber:  'ring-amber-500 border-amber-500',
  };

  return (
    <>
      {showUpgrade && (
        <UpgradeModal
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => {
            setShowUpgrade(false);
            if (pendingType) onChange(pendingType.id);
          }}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {POLL_TYPES.map((type) => {
          const isSelected = selected === type.id;
          const locked = type.premium && !premium;
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSelect(type)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all active:scale-[0.97] ${
                isSelected
                  ? `ring-2 ring-offset-1 ${ringMap[type.color]} ${colorMap[type.color]}`
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {locked && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                  <Lock className="w-2.5 h-2.5 text-amber-900" />
                </span>
              )}
              {type.premium && !locked && (
                <span className="absolute top-2 right-2">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </span>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? '' : 'bg-slate-100'}`}>
                <Icon className={`w-5 h-5 ${isSelected ? '' : 'text-slate-500'}`} />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{type.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ── Basic Poll Options ─────────────────────────────────────── */
function BasicOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '' }]);
  const remove = (id) => { if (options.length > 2) setOptions(options.filter(o => o.id !== id)); };
  const update = (id, val) => setOptions(options.map(o => o.id === id ? { ...o, label: val } : o));

  return (
    <div className="space-y-3">
      {options.map((o, i) => (
        <div key={o.id} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
          <Input value={o.label} onChange={e => update(o.id, e.target.value)} placeholder={`Option ${i + 1}`} className="h-11" maxLength={80} />
          <button type="button" onClick={() => remove(o.id)} disabled={options.length <= 2} className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <Button type="button" onClick={addOption} variant="outline" className="mt-1 rounded-lg border-dashed border-slate-300 text-indigo-600 hover:text-indigo-700">
        <Plus className="w-4 h-4 mr-1" /> Add option
      </Button>
    </div>
  );
}

/* ── Image Poll Options ─────────────────────────────────────── */
function ImageOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '', imageUrl: '' }]);
  const remove = (id) => { if (options.length > 2) setOptions(options.filter(o => o.id !== id)); };
  const update = (id, field, val) => setOptions(options.map(o => o.id === id ? { ...o, [field]: val } : o));

  const handleFileUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 800;
        const maxH = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxW) {
            height *= maxW / width;
            width = maxW;
          }
        } else {
          if (height > maxH) {
            width *= maxH / height;
            height = maxH;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        update(id, 'imageUrl', dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {options.map((o, i) => (
        <div key={o.id} className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Option {i + 1}</span>
            <button type="button" onClick={() => remove(o.id)} disabled={options.length <= 2} className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
          <Input value={o.label} onChange={e => update(o.id, 'label', e.target.value)} placeholder="Option label" className="h-10" />
          
          <div className="flex items-center gap-3">
            <Input value={o.imageUrl} onChange={e => update(o.id, 'imageUrl', e.target.value)} placeholder="Image URL (https://...)" className="flex-1 h-10" />
            <div className="text-slate-400 text-xs font-semibold uppercase">OR</div>
            <label className="flex items-center justify-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 hover:text-indigo-600 transition-colors shrink-0">
              <Upload className="w-4 h-4" /> Upload
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, o.id)} className="hidden" />
            </label>
          </div>

          {o.imageUrl && (
            <img src={o.imageUrl} alt="" className="w-full h-32 object-cover rounded-lg border border-slate-200" onError={e => e.target.style.display='none'} />
          )}
        </div>
      ))}
      <Button type="button" onClick={addOption} variant="outline" className="rounded-lg border-dashed border-slate-300 text-violet-600 hover:text-violet-700">
        <Plus className="w-4 h-4 mr-1" /> Add image option
      </Button>
    </div>
  );
}

/* ── Ranking Poll Options ───────────────────────────────────── */
function RankingOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '' }]);
  const remove = (id) => { if (options.length > 2) setOptions(options.filter(o => o.id !== id)); };
  const update = (id, val) => setOptions(options.map(o => o.id === id ? { ...o, label: val } : o));
  const move = (idx, dir) => {
    const arr = [...options];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setOptions(arr);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">Voters will drag these items to rank them. Set the default order below.</p>
      {options.map((o, i) => (
        <div key={o.id} className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20"><ChevronRight className="w-3 h-3 -rotate-90" /></button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === options.length - 1} className="p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20"><ChevronRight className="w-3 h-3 rotate-90" /></button>
          </div>
          <div className="w-7 h-7 rounded-full bg-pink-50 text-pink-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
          <Input value={o.label} onChange={e => update(o.id, e.target.value)} placeholder={`Item ${i + 1}`} className="h-11" maxLength={80} />
          <button type="button" onClick={() => remove(o.id)} disabled={options.length <= 2} className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <Button type="button" onClick={addOption} variant="outline" className="mt-1 rounded-lg border-dashed border-slate-300 text-pink-600 hover:text-pink-700">
        <Plus className="w-4 h-4 mr-1" /> Add item
      </Button>
    </div>
  );
}

/* ── Meeting Scheduler Options ──────────────────────────────── */
function MeetingOptions({ options, setOptions }) {
  const addSlot = () => setOptions([...options, { id: generateId(), label: '', date: '', time: '' }]);
  const remove = (id) => { if (options.length > 1) setOptions(options.filter(o => o.id !== id)); };
  const update = (id, field, val) => setOptions(options.map(o => o.id === id ? { ...o, [field]: val, label: `${field === 'date' ? val : o.date} ${field === 'time' ? val : o.time}`.trim() } : o));

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-3">Add time slots. Participants will select which times they're available.</p>
      {options.map((o, i) => (
        <div key={o.id} className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
          <input type="date" value={o.date} onChange={e => update(o.id, 'date', e.target.value)}
            className="flex-1 h-11 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400" />
          <input type="time" value={o.time} onChange={e => update(o.id, 'time', e.target.value)}
            className="w-32 h-11 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400" />
          <button type="button" onClick={() => remove(o.id)} disabled={options.length <= 1} className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <Button type="button" onClick={addSlot} variant="outline" className="mt-1 rounded-lg border-dashed border-slate-300 text-amber-600 hover:text-amber-700">
        <Plus className="w-4 h-4 mr-1" /> Add time slot
      </Button>
    </div>
  );
}

/* ── Main CreatePollPage ─────────────────────────────────────── */
export default function CreatePollPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pollType, setPollType] = useState('basic');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
    { id: generateId(), label: '' },
    { id: generateId(), label: '' },
  ]);
  const [multiple, setMultiple] = useState(false);
  const [requireName, setRequireName] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset options when switching poll type
  const handleTypeChange = (type) => {
    setPollType(type);
    if (type === 'meeting') {
      setOptions([{ id: generateId(), label: '', date: '', time: '' }]);
    } else if (type === 'image') {
      setOptions([
        { id: generateId(), label: '', imageUrl: '' },
        { id: generateId(), label: '', imageUrl: '' },
      ]);
    } else {
      setOptions([
        { id: generateId(), label: '' },
        { id: generateId(), label: '' },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a poll title.', variant: 'destructive' });
      return;
    }
    const validOptions = options.filter(o => (o.label || o.date || '').trim());
    if (pollType !== 'meeting' && validOptions.length < 2) {
      toast({ title: 'Not enough options', description: 'Add at least 2 options.', variant: 'destructive' });
      return;
    }
    if (pollType === 'meeting' && validOptions.length < 1) {
      toast({ title: 'No time slots', description: 'Add at least 1 time slot.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const user = getAuth();
      const poll = {
        title: title.trim(),
        description: description.trim(),
        author: user?.name || 'Anonymous',
        multiple,
        requireName,
        pollType,
        options: validOptions.map(o => ({
          label: o.label?.trim() || `${o.date} ${o.time}`.trim(),
          imageUrl: o.imageUrl || undefined,
          votes: 0,
        })),
      };
      const saved = await savePoll(poll);
      toast({ title: 'Poll created! 🎉', description: 'Your poll is live and ready to share.' });
      navigate(`/polls/${saved._id || saved.id}`);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create poll. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const currentType = POLL_TYPES.find(t => t.id === pollType);
  const accentColor = {
    basic: 'indigo', image: 'violet', ranking: 'pink', meeting: 'amber'
  }[pollType];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">New Poll</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Create a new poll</h1>
          <p className="mt-2 text-slate-600">Choose your poll type and fill out the details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Type Selector */}
          <Card className="p-6 border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              Poll Type
              {isPremiumUser() && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold"><Crown className="w-3 h-3" /> Premium</span>}
            </h3>
            <PollTypeSelector selected={pollType} onChange={handleTypeChange} />
          </Card>

          {/* Title & Description */}
          <Card className="p-6 border-slate-200">
            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-slate-800">
                  {pollType === 'meeting' ? 'Meeting title' : 'Poll title'} <span className="text-red-500">*</span>
                </Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder={pollType === 'meeting' ? 'Team sync — week of May 5' : "What's your question?"}
                  className="mt-2 h-12 text-base" maxLength={150} />
                <p className="mt-1 text-xs text-slate-400">{title.length}/150</p>
              </div>
              <div>
                <Label htmlFor="desc" className="text-sm font-semibold text-slate-800">Description (optional)</Label>
                <Textarea id="desc" value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Add more context..." className="mt-2 min-h-20" maxLength={500} />
              </div>
            </div>
          </Card>

          {/* Options (varies by type) */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                {currentType?.icon && <currentType.icon className="w-4 h-4" />}
                {pollType === 'meeting' ? 'Time slots' : 'Answer options'}
              </h3>
              <span className="text-xs text-slate-500">{options.length} {pollType === 'meeting' ? 'slots' : 'options'}</span>
            </div>

            {pollType === 'basic' && <BasicOptions options={options} setOptions={setOptions} />}
            {pollType === 'image' && <ImageOptions options={options} setOptions={setOptions} />}
            {pollType === 'ranking' && <RankingOptions options={options} setOptions={setOptions} />}
            {pollType === 'meeting' && <MeetingOptions options={options} setOptions={setOptions} />}
          </Card>

          {/* Settings (hide for meeting type) */}
          {pollType !== 'meeting' && (
            <Card className="p-6 border-slate-200">
              <div className="flex items-center gap-2 mb-5">
                <Settings2 className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900">Settings</h3>
              </div>
              <div className="space-y-4">
                <SettingRow title="Allow multiple answers" description="Voters can select more than one option." checked={multiple} onChange={setMultiple} />
                <SettingRow title="Require name" description="Voters must enter a name before voting." checked={requireName} onChange={setRequireName} />
              </div>
            </Card>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>Cancel</Button>
            <Button type="submit" disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 h-11 font-semibold shadow-md">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating…</> : 'Create poll'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all ${
        checked ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <label htmlFor={id} className="flex-1 cursor-pointer select-none">
        <div className={`font-semibold text-sm transition-colors ${checked ? 'text-indigo-900' : 'text-slate-800'}`}>{title}</div>
        <div className={`text-xs mt-1 transition-colors ${checked ? 'text-indigo-700/80' : 'text-slate-500'}`}>{description}</div>
      </label>
      <Switch type="button" id={id} checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-indigo-600 shadow-sm shrink-0" />
    </div>
  );
}
