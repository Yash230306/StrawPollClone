import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus, Trash2, Settings2, Sparkles, Loader2, Crown, Lock,
  Image, List, GripVertical, CalendarClock, Check, X, Star,
  ChevronRight, Upload } from
'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { savePoll, generateId, getAuth, isPremiumUser, upgradeToPremium } from '../mock/mock';
import { useToast } from '../hooks/use-toast';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";


const POLL_TYPES = [
{
  id: 'basic',
  label: 'Standard Poll',
  icon: List,
  description: 'Classic multiple-choice poll',
  premium: false,
  color: 'indigo'
},
{
  id: 'image',
  label: 'Image Poll',
  icon: Image,
  description: 'Options with images — visual voting',
  premium: true,
  color: 'violet'
},
{
  id: 'ranking',
  label: 'Ranking Poll',
  icon: GripVertical,
  description: 'Voters rank options in order',
  premium: true,
  color: 'pink'
},
{
  id: 'meeting',
  label: 'Schedule Meeting',
  icon: CalendarClock,
  description: 'Find the best time for a group',
  premium: true,
  color: 'amber'
}];



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
    _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children:
      _jsxs("div", { className: "bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden", children: [

        _jsxs("div", { className: "bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-center relative", children: [
          _jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors", children:
            _jsx(X, { className: "w-4 h-4" }) }
          ),
          _jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4", children:
            _jsx(Crown, { className: "w-8 h-8 text-yellow-300" }) }
          ),
          _jsx("h2", { className: "text-2xl font-extrabold text-white", children: "Upgrade to Premium" }),
          _jsx("p", { className: "mt-2 text-purple-200 text-sm", children: "Unlock advanced poll types and powerful features" })] }
        ),


        _jsxs("div", { className: "px-8 pt-6", children: [
          _jsxs("div", { className: "flex items-center justify-center gap-2 mb-6", children: [
            _jsx("span", { className: "text-5xl font-extrabold text-slate-900", children: "$9" }),
            _jsxs("div", { className: "text-slate-500", children: [
              _jsx("div", { className: "text-sm font-medium", children: "/month" }),
              _jsx("div", { className: "text-xs", children: "Cancel anytime" })] }
            )] }
          ),


          _jsx("ul", { className: "space-y-3 mb-6", children:
            [
            { icon: Image, text: 'Image Polls — visual voting with pictures' },
            { icon: GripVertical, text: 'Ranking Polls — rank options in order' },
            { icon: CalendarClock, text: 'Schedule Meeting — find the best time' },
            { icon: Star, text: 'No ads, priority support' },
            { icon: Check, text: 'Unlimited premium polls' }].
            map(({ icon: Icon, text }) =>
            _jsxs("li", { className: "flex items-center gap-3 text-sm text-slate-700", children: [
              _jsx("div", { className: "w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0", children:
                _jsx(Icon, { className: "w-3.5 h-3.5 text-indigo-600" }) }
              ),
              text] }, text
            )
            ) }
          ),

          _jsx("button", {
            type: "button",
            onClick: handleUpgrade,
            disabled: loading,
            className: "w-full h-13 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-base", children:

            loading ?
            _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), " Processing\u2026"] }) :

            _jsxs(_Fragment, { children: [_jsx(Crown, { className: "w-5 h-5 text-yellow-300" }), " Buy Premium \u2014 $9/month"] }) }

          ),
          _jsx("p", { className: "mt-3 text-center text-xs text-slate-400 pb-6", children: "30-day money-back guarantee \xB7 No credit card fraud risk" })] }
        )] }
      ) }
    ));

}


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
    pink: 'border-pink-300 bg-pink-50 text-pink-700',
    amber: 'border-amber-300 bg-amber-50 text-amber-700'
  };

  const ringMap = {
    indigo: 'ring-indigo-500 border-indigo-500',
    violet: 'ring-violet-500 border-violet-500',
    pink: 'ring-pink-500 border-pink-500',
    amber: 'ring-amber-500 border-amber-500'
  };

  return (
    _jsxs(_Fragment, { children: [
      showUpgrade &&
      _jsx(UpgradeModal, {
        onClose: () => setShowUpgrade(false),
        onSuccess: () => {
          setShowUpgrade(false);
          if (pendingType) onChange(pendingType.id);
        } }
      ),

      _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children:
        POLL_TYPES.map((type) => {
          const isSelected = selected === type.id;
          const locked = type.premium && !premium;
          const Icon = type.icon;
          return (
            _jsxs("button", {

              type: "button",
              onClick: () => handleSelect(type),
              className: `relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all active:scale-[0.97] ${
              isSelected ?
              `ring-2 ring-offset-1 ${ringMap[type.color]} ${colorMap[type.color]}` :
              'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`, children: [


              locked &&
              _jsx("span", { className: "absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center", children:
                _jsx(Lock, { className: "w-2.5 h-2.5 text-amber-900" }) }
              ),

              type.premium && !locked &&
              _jsx("span", { className: "absolute top-2 right-2", children:
                _jsx(Crown, { className: "w-3.5 h-3.5 text-amber-400" }) }
              ),

              _jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? '' : 'bg-slate-100'}`, children:
                _jsx(Icon, { className: `w-5 h-5 ${isSelected ? '' : 'text-slate-500'}` }) }
              ),
              _jsxs("div", { children: [
                _jsx("div", { className: "text-xs font-bold leading-tight", children: type.label }),
                _jsx("div", { className: "text-[10px] text-slate-400 mt-0.5 leading-tight", children: type.description })] }
              )] }, type.id
            ));

        }) }
      )] }
    ));

}


function BasicOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '' }]);
  const remove = (id) => {if (options.length > 2) setOptions(options.filter((o) => o.id !== id));};
  const update = (id, val) => setOptions(options.map((o) => o.id === id ? { ...o, label: val } : o));

  return (
    _jsxs("div", { className: "space-y-3", children: [
      options.map((o, i) =>
      _jsxs("div", { className: "flex items-center gap-3", children: [
        _jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0", children: i + 1 }),
        _jsx(Input, { value: o.label, onChange: (e) => update(o.id, e.target.value), placeholder: `Option ${i + 1}`, className: "h-11", maxLength: 80 }),
        _jsx("button", { type: "button", onClick: () => remove(o.id), disabled: options.length <= 2, className: "p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }, o.id
      )
      ),
      _jsxs(Button, { type: "button", onClick: addOption, variant: "outline", className: "mt-1 rounded-lg border-dashed border-slate-300 text-indigo-600 hover:text-indigo-700", children: [
        _jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add option"] }
      )] }
    ));

}


function ImageOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '', imageUrl: '' }]);
  const remove = (id) => {if (options.length > 2) setOptions(options.filter((o) => o.id !== id));};
  const update = (id, field, val) => setOptions(options.map((o) => o.id === id ? { ...o, [field]: val } : o));

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
    _jsxs("div", { className: "space-y-4", children: [
      options.map((o, i) =>
      _jsxs("div", { className: "rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50", children: [
        _jsxs("div", { className: "flex items-center justify-between", children: [
          _jsxs("span", { className: "text-sm font-semibold text-slate-700", children: ["Option ", i + 1] }),
          _jsx("button", { type: "button", onClick: () => remove(o.id), disabled: options.length <= 2, className: "p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] }
        ),
        _jsx(Input, { value: o.label, onChange: (e) => update(o.id, 'label', e.target.value), placeholder: "Option label", className: "h-10" }),

        _jsxs("div", { className: "flex items-center gap-3", children: [
          _jsx(Input, { value: o.imageUrl, onChange: (e) => update(o.id, 'imageUrl', e.target.value), placeholder: "Image URL (https://...)", className: "flex-1 h-10" }),
          _jsx("div", { className: "text-slate-400 text-xs font-semibold uppercase", children: "OR" }),
          _jsxs("label", { className: "flex items-center justify-center gap-2 px-4 h-10 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 hover:text-indigo-600 transition-colors shrink-0", children: [
            _jsx(Upload, { className: "w-4 h-4" }), " Upload",
            _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleFileUpload(e, o.id), className: "hidden" })] }
          )] }
        ),

        o.imageUrl &&
        _jsx("img", { src: o.imageUrl, alt: "", className: "w-full h-32 object-cover rounded-lg border border-slate-200", onError: (e) => e.target.style.display = 'none' })] }, o.id

      )
      ),
      _jsxs(Button, { type: "button", onClick: addOption, variant: "outline", className: "rounded-lg border-dashed border-slate-300 text-violet-600 hover:text-violet-700", children: [
        _jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add image option"] }
      )] }
    ));

}


function RankingOptions({ options, setOptions }) {
  const addOption = () => setOptions([...options, { id: generateId(), label: '' }]);
  const remove = (id) => {if (options.length > 2) setOptions(options.filter((o) => o.id !== id));};
  const update = (id, val) => setOptions(options.map((o) => o.id === id ? { ...o, label: val } : o));
  const move = (idx, dir) => {
    const arr = [...options];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setOptions(arr);
  };

  return (
    _jsxs("div", { className: "space-y-2", children: [
      _jsx("p", { className: "text-xs text-slate-500 mb-3", children: "Voters will drag these items to rank them. Set the default order below." }),
      options.map((o, i) =>
      _jsxs("div", { className: "flex items-center gap-3", children: [
        _jsxs("div", { className: "flex flex-col gap-0.5", children: [
          _jsx("button", { type: "button", onClick: () => move(i, -1), disabled: i === 0, className: "p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20", children: _jsx(ChevronRight, { className: "w-3 h-3 -rotate-90" }) }),
          _jsx("button", { type: "button", onClick: () => move(i, 1), disabled: i === options.length - 1, className: "p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20", children: _jsx(ChevronRight, { className: "w-3 h-3 rotate-90" }) })] }
        ),
        _jsx("div", { className: "w-7 h-7 rounded-full bg-pink-50 text-pink-600 text-xs font-bold flex items-center justify-center shrink-0", children: i + 1 }),
        _jsx(Input, { value: o.label, onChange: (e) => update(o.id, e.target.value), placeholder: `Item ${i + 1}`, className: "h-11", maxLength: 80 }),
        _jsx("button", { type: "button", onClick: () => remove(o.id), disabled: options.length <= 2, className: "p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }, o.id
      )
      ),
      _jsxs(Button, { type: "button", onClick: addOption, variant: "outline", className: "mt-1 rounded-lg border-dashed border-slate-300 text-pink-600 hover:text-pink-700", children: [
        _jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add item"] }
      )] }
    ));

}


function MeetingOptions({ options, setOptions }) {
  const addSlot = () => setOptions([...options, { id: generateId(), label: '', date: '', time: '' }]);
  const remove = (id) => {if (options.length > 1) setOptions(options.filter((o) => o.id !== id));};
  const update = (id, field, val) => setOptions(options.map((o) => o.id === id ? { ...o, [field]: val, label: `${field === 'date' ? val : o.date} ${field === 'time' ? val : o.time}`.trim() } : o));

  return (
    _jsxs("div", { className: "space-y-3", children: [
      _jsx("p", { className: "text-xs text-slate-500 mb-3", children: "Add time slots. Participants will select which times they're available." }),
      options.map((o, i) =>
      _jsxs("div", { className: "flex items-center gap-3", children: [
        _jsx("div", { className: "w-7 h-7 rounded-full bg-amber-50 text-amber-600 text-xs font-bold flex items-center justify-center shrink-0", children: i + 1 }),
        _jsx("input", { type: "date", value: o.date, onChange: (e) => update(o.id, 'date', e.target.value),
          className: "flex-1 h-11 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400" }),
        _jsx("input", { type: "time", value: o.time, onChange: (e) => update(o.id, 'time', e.target.value),
          className: "w-32 h-11 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400" }),
        _jsx("button", { type: "button", onClick: () => remove(o.id), disabled: options.length <= 1, className: "p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }, o.id
      )
      ),
      _jsxs(Button, { type: "button", onClick: addSlot, variant: "outline", className: "mt-1 rounded-lg border-dashed border-slate-300 text-amber-600 hover:text-amber-700", children: [
        _jsx(Plus, { className: "w-4 h-4 mr-1" }), " Add time slot"] }
      )] }
    ));

}


export default function CreatePollPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [pollType, setPollType] = useState('basic');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
  { id: generateId(), label: '' },
  { id: generateId(), label: '' }]
  );
  const [multiple, setMultiple] = useState(false);
  const [requireName, setRequireName] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && POLL_TYPES.find((t) => t.id === typeParam)) {
      handleTypeChange(typeParam);
    }

  }, []);


  const handleTypeChange = (type) => {
    setPollType(type);
    if (type === 'meeting') {
      setOptions([{ id: generateId(), label: '', date: '', time: '' }]);
    } else if (type === 'image') {
      setOptions([
      { id: generateId(), label: '', imageUrl: '' },
      { id: generateId(), label: '', imageUrl: '' }]
      );
    } else {
      setOptions([
      { id: generateId(), label: '' },
      { id: generateId(), label: '' }]
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a poll title.', variant: 'destructive' });
      return;
    }
    const validOptions = options.filter((o) => (o.label || o.date || '').trim());
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
        options: validOptions.map((o) => ({
          label: o.label?.trim() || `${o.date} ${o.time}`.trim(),
          imageUrl: o.imageUrl || undefined,
          votes: 0
        }))
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

  const currentType = POLL_TYPES.find((t) => t.id === pollType);
  const accentColor = {
    basic: 'indigo', image: 'violet', ranking: 'pink', meeting: 'amber'
  }[pollType];

  return (
    _jsx("div", { className: "bg-slate-50 min-h-screen py-12", children:
      _jsxs("div", { className: "max-w-3xl mx-auto px-5 lg:px-8", children: [

        _jsxs("div", { className: "mb-8", children: [
          _jsxs("div", { className: "flex items-center gap-2 text-indigo-600 mb-2", children: [
            _jsx(Sparkles, { className: "w-5 h-5" }),
            _jsx("span", { className: "text-sm font-semibold tracking-wide uppercase", children: "New Poll" })] }
          ),
          _jsx("h1", { className: "text-4xl font-extrabold text-slate-900", children: "Create a new poll" }),
          _jsx("p", { className: "mt-2 text-slate-600", children: "Choose your poll type and fill out the details below." })] }
        ),

        _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [

          _jsxs(Card, { className: "p-6 border-slate-200", children: [
            _jsxs("h3", { className: "font-bold text-slate-900 mb-4 flex items-center gap-2", children: ["Poll Type",

              isPremiumUser() && _jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold", children: [_jsx(Crown, { className: "w-3 h-3" }), " Premium"] })] }
            ),
            _jsx(PollTypeSelector, { selected: pollType, onChange: handleTypeChange })] }
          ),


          _jsx(Card, { className: "p-6 border-slate-200", children:
            _jsxs("div", { className: "space-y-5", children: [
              _jsxs("div", { children: [
                _jsxs(Label, { htmlFor: "title", className: "text-sm font-semibold text-slate-800", children: [
                  pollType === 'meeting' ? 'Meeting title' : 'Poll title', " ", _jsx("span", { className: "text-red-500", children: "*" })] }
                ),
                _jsx(Input, { id: "title", value: title, onChange: (e) => setTitle(e.target.value),
                  placeholder: pollType === 'meeting' ? 'Team sync — week of May 5' : "What's your question?",
                  className: "mt-2 h-12 text-base", maxLength: 150 }),
                _jsxs("p", { className: "mt-1 text-xs text-slate-400", children: [title.length, "/150"] })] }
              ),
              _jsxs("div", { children: [
                _jsx(Label, { htmlFor: "desc", className: "text-sm font-semibold text-slate-800", children: "Description (optional)" }),
                _jsx(Textarea, { id: "desc", value: description, onChange: (e) => setDescription(e.target.value),
                  placeholder: "Add more context...", className: "mt-2 min-h-20", maxLength: 500 })] }
              )] }
            ) }
          ),


          _jsxs(Card, { className: "p-6 border-slate-200", children: [
            _jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              _jsxs("h3", { className: "font-semibold text-slate-900 flex items-center gap-2", children: [
                currentType?.icon && _jsx(currentType.icon, { className: "w-4 h-4" }),
                pollType === 'meeting' ? 'Time slots' : 'Answer options'] }
              ),
              _jsxs("span", { className: "text-xs text-slate-500", children: [options.length, " ", pollType === 'meeting' ? 'slots' : 'options'] })] }
            ),

            pollType === 'basic' && _jsx(BasicOptions, { options: options, setOptions: setOptions }),
            pollType === 'image' && _jsx(ImageOptions, { options: options, setOptions: setOptions }),
            pollType === 'ranking' && _jsx(RankingOptions, { options: options, setOptions: setOptions }),
            pollType === 'meeting' && _jsx(MeetingOptions, { options: options, setOptions: setOptions })] }
          ),


          pollType !== 'meeting' &&
          _jsxs(Card, { className: "p-6 border-slate-200", children: [
            _jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              _jsx(Settings2, { className: "w-5 h-5 text-slate-700" }),
              _jsx("h3", { className: "font-semibold text-slate-900", children: "Settings" })] }
            ),
            _jsxs("div", { className: "space-y-4", children: [
              _jsx(SettingRow, { title: "Allow multiple answers", description: "Voters can select more than one option.", checked: multiple, onChange: setMultiple }),
              _jsx(SettingRow, { title: "Require name", description: "Voters must enter a name before voting.", checked: requireName, onChange: setRequireName })] }
            )] }
          ),



          _jsxs("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
            _jsx(Button, { type: "button", variant: "outline", onClick: () => navigate('/'), children: "Cancel" }),
            _jsx(Button, { type: "submit", disabled: loading,
              className: "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 h-11 font-semibold shadow-md", children:
              loading ? _jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), " Creating\u2026"] }) : 'Create poll' }
            )] }
          )] }
        )] }
      ) }
    ));

}

function SettingRow({ title, description, checked, onChange }) {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    _jsxs("div", {
      className: `flex items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all ${
      checked ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`, children: [


      _jsxs("label", { htmlFor: id, className: "flex-1 cursor-pointer select-none", children: [
        _jsx("div", { className: `font-semibold text-sm transition-colors ${checked ? 'text-indigo-900' : 'text-slate-800'}`, children: title }),
        _jsx("div", { className: `text-xs mt-1 transition-colors ${checked ? 'text-indigo-700/80' : 'text-slate-500'}`, children: description })] }
      ),
      _jsx(Switch, { type: "button", id: id, checked: checked, onCheckedChange: onChange, className: "data-[state=checked]:bg-indigo-600 shadow-sm shrink-0" })] }
    ));

}