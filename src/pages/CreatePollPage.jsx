import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Settings2, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { savePoll, generateId, getAuth } from '../mock/mock';
import { useToast } from '../hooks/use-toast';

export default function CreatePollPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
    { id: generateId(), label: '' },
    { id: generateId(), label: '' },
  ]);
  const [multiple, setMultiple] = useState(false);
  const [requireName, setRequireName] = useState(false);
  const [hideResults, setHideResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const addOption = () => setOptions([...options, { id: generateId(), label: '' }]);
  const removeOption = (id) => {
    if (options.length <= 2) return;
    setOptions(options.filter((o) => o.id !== id));
  };
  const updateOption = (id, val) => setOptions(options.map((o) => (o.id === id ? { ...o, label: val } : o)));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a poll title.', variant: 'destructive' });
      return;
    }
    const validOptions = options.filter((o) => o.label.trim());
    if (validOptions.length < 2) {
      toast({ title: 'Not enough options', description: 'Add at least 2 options.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = getAuth();
      const poll = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        author: user?.name || 'Anonymous',
        createdAt: new Date().toISOString().slice(0, 10),
        totalVotes: 0,
        multiple,
        requireName,
        hideResults,
        options: validOptions.map((o) => ({ id: o.id, label: o.label.trim(), votes: 0 })),
      };
      savePoll(poll);
      toast({ title: 'Poll created!', description: 'Share the link with your audience.' });
      navigate(`/polls/${poll.id}`);
    }, 700);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">New Poll</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900">Create a new poll</h1>
          <p className="mt-2 text-slate-600">Fill out the details below. No sign-up required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-slate-800">
                  Poll title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your favorite ice cream flavor?"
                  className="mt-2 h-12 text-base"
                  maxLength={150}
                />
                <p className="mt-1 text-xs text-slate-400">{title.length}/150</p>
              </div>
              <div>
                <Label htmlFor="desc" className="text-sm font-semibold text-slate-800">Description (optional)</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more context to your poll..."
                  className="mt-2 min-h-24"
                  maxLength={500}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Answer options</h3>
              <span className="text-xs text-slate-500">{options.length} options</span>
            </div>
            <div className="space-y-3">
              {options.map((o, i) => (
                <div key={o.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <Input
                    value={o.label}
                    onChange={(e) => updateOption(o.id, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="h-11"
                    maxLength={80}
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(o.id)}
                    disabled={options.length <= 2}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Remove option"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={addOption}
              variant="outline"
              className="mt-4 rounded-lg border-dashed border-slate-300 text-indigo-600 hover:text-indigo-700 hover:border-indigo-400"
            >
              <Plus className="w-4 h-4 mr-1" /> Add option
            </Button>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-2 mb-5">
              <Settings2 className="w-5 h-5 text-slate-700" />
              <h3 className="font-semibold text-slate-900">Settings</h3>
            </div>
            <div className="space-y-4">
              <SettingRow
                title="Allow multiple answers"
                description="Voters can select more than one option."
                checked={multiple}
                onChange={setMultiple}
              />
              <SettingRow
                title="Require name"
                description="Voters must enter a name before voting."
                checked={requireName}
                onChange={setRequireName}
              />
              <SettingRow
                title="Hide results until vote"
                description="Results are only shown after a user votes."
                checked={hideResults}
                onChange={setHideResults}
              />
            </div>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>Cancel</Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-7 py-5 h-auto font-semibold shadow-md"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</>
              ) : (
                'Create poll'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <div>
        <div className="font-medium text-slate-800 text-sm">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} className="data-[state=checked]:bg-indigo-600" />
    </div>
  );
}
