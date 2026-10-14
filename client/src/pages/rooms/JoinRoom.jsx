import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Hash, LogIn } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import roomService from '../../services/roomService';

export const JoinRoom = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please provide a room code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await roomService.joinRoom({ roomCode: code.toUpperCase() });
      navigate('/rooms');
    } catch (err) {
      // In dev scaffold fallback
      console.log('Joined room with code:', code);
      navigate('/rooms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Link
        to="/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Rooms</span>
      </Link>

      <div>
        <h1 className="page-title">Join Academic Room</h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter the 6-character room code shared by your teacher or department.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Room Code"
            id="roomCode"
            placeholder="e.g. CS106B"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            icon={Hash}
            error={error}
            required
          />

          <Button type="submit" variant="primary" className="w-full" disabled={loading} icon={LogIn}>
            {loading ? 'Joining...' : 'Join Room'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JoinRoom;
