import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Hash, ArrowRight, CheckCircle, Shield, Users, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';
import roomService from '../../services/roomService';

export const JoinRoom = () => {
  const navigate = useNavigate();
  const { joinRoom } = useApp();

  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: Input Code, 2: Preview Details, 3: Request Sent / Joined
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewRoom, setPreviewRoom] = useState(null);
  const [joinResultStatus, setJoinResultStatus] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setError('Please enter a room code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await roomService.getRoomById(cleanCode);
      const room = res.data || res;
      if (!room || !room.name) {
        setError(`No active room found with code '${cleanCode}'. Please check with your instructor or room admin.`);
        return;
      }
      setPreviewRoom(room);
      setStep(2);
    } catch (err) {
      setError(`No active room found with code '${cleanCode}'. Please verify the code.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestJoin = async () => {
    if (!previewRoom) return;
    setLoading(true);
    try {
      const res = await joinRoom(previewRoom.code);
      setJoinResultStatus(res?.status || 'joined');
      setStep(3);
    } catch (err) {
      setError(err.message || 'Failed to submit join request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Link
        to="/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Rooms</span>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
          Join Academic Room
        </h1>
        <p className="text-xs text-[#5B6475] mt-0.5">
          Enter the room code shared by your teacher, teaching assistant, or department head.
        </p>
      </div>

      <Card className="p-6">
        {step === 1 && (
          <form onSubmit={handleContinue} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Room Code"
              id="joinRoomCode"
              placeholder="Example: CSE-7K29X"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              icon={Hash}
              required
            />

            <Button
              type="submit"
              variant="accent"
              size="md"
              className="w-full"
              disabled={loading}
              icon={ArrowRight}
            >
              {loading ? 'Searching...' : 'Continue'}
            </Button>
          </form>
        )}

        {step === 2 && previewRoom && (
          <div className="space-y-4">
            <div className="p-4 rounded-md border border-[#E2E6EE] bg-[#F7F8FA] space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{previewRoom.type}</Badge>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#E2E6EE] text-[#172033]">
                  {previewRoom.code}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#172033]">{previewRoom.name}</h4>
                {previewRoom.description && (
                  <p className="text-xs text-[#5B6475] mt-1 leading-relaxed">
                    {previewRoom.description}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#E2E6EE] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Admin</span>
                  <span className="font-semibold text-[#172033] flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#3157D5]" />
                    {previewRoom.admin?.username || previewRoom.admin?.fullName || 'Room Administrator'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Members</span>
                  <span className="font-semibold text-[#172033] flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    {previewRoom.memberCount || 1} scholars
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} disabled={loading}>
                Change Code
              </Button>
              <Button variant="accent" size="sm" onClick={handleRequestJoin} disabled={loading}>
                {loading ? 'Submitting...' : 'Request to Join'}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#172033]">
              {joinResultStatus === 'joined' ? 'Joined Successfully!' : 'Request Sent'}
            </h4>
            <p className="text-xs text-[#5B6475] max-w-xs mx-auto leading-relaxed">
              {joinResultStatus === 'joined'
                ? 'You are now an enrolled member of this room workspace.'
                : 'Request Sent — waiting for room administrator approval.'}
            </p>
            <div className="pt-3">
              <Link to="/rooms">
                <Button variant="primary" size="sm">
                  Go to My Rooms
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default JoinRoom;
