import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Badge } from '../common/Badge';
import { ROOM_TYPES, ROOM_ACCESS_TYPES } from '../../utils/constants';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import roomService from '../../services/roomService';
import { Hash, CheckCircle, Users, Shield, PlusCircle, ArrowRight, AlertCircle } from 'lucide-react';

export const AddJoinRoomModal = ({ isOpen, onClose, initialTab = 'create' }) => {
  const { addRoom, joinRoom } = useApp();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab); // 'create' | 'join'

  // Create Room state
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    type: ROOM_TYPES.COURSE,
    accessType: ROOM_ACCESS_TYPES.APPROVAL,
    code: '',
  });
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinStep, setJoinStep] = useState(1); // 1: input code, 2: preview, 3: request sent
  const [searchedRoom, setSearchedRoom] = useState(null);
  const [joinError, setJoinError] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinStatus, setJoinStatus] = useState('');

  // Handle Create Room
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;

    setCreateLoading(true);
    setCreateError('');

    try {
      await addRoom({
        name: createForm.name.trim(),
        description: createForm.description || '',
        type: createForm.type,
        accessType: createForm.accessType,
        code: createForm.code ? createForm.code.trim().toUpperCase() : undefined,
      });

      setCreateSuccess(true);
      setTimeout(() => {
        setCreateSuccess(false);
        onClose();
      }, 1000);
    } catch (err) {
      setCreateError(err.message || 'Failed to create room. Please verify your role permissions.');
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle Search Code
  const handleCodeSearch = async (e) => {
    e.preventDefault();
    const cleanCode = joinCode.trim().toUpperCase();
    if (!cleanCode) {
      setJoinError('Please enter a room code.');
      return;
    }

    setJoinError('');
    setJoinLoading(true);

    try {
      const res = await roomService.getRoomById(cleanCode);
      const room = res.data || res;
      if (!room || !room.name) {
        setJoinError(`No active room found with code '${cleanCode}'. Please verify with your instructor.`);
        return;
      }
      setSearchedRoom(room);
      setJoinStep(2);
    } catch (err) {
      setJoinError(`No active room found with code '${cleanCode}'.`);
    } finally {
      setJoinLoading(false);
    }
  };

  // Handle Request to Join
  const handleRequestJoin = async () => {
    if (!searchedRoom) return;
    setJoinLoading(true);
    try {
      const res = await joinRoom(searchedRoom.code);
      setJoinStatus(res?.status || 'joined');
      setJoinStep(3);
    } catch (err) {
      setJoinError(err.message || 'Failed to request room access.');
    } finally {
      setJoinLoading(false);
    }
  };

  const handleReset = () => {
    setJoinCode('');
    setJoinStep(1);
    setSearchedRoom(null);
    setJoinError('');
    setCreateError('');
    setCreateSuccess(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add or Join Room"
      maxWidth="max-w-lg"
    >
      {/* Tabs Switcher */}
      <div className="flex border-b border-[#E2E6EE] -mx-6 px-6 mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab('create');
            handleReset();
          }}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'create'
              ? 'border-[#3157D5] text-[#3157D5]'
              : 'border-transparent text-[#5B6475] hover:text-[#172033]'
          }`}
        >
          Create Room
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('join');
            handleReset();
          }}
          className={`py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'join'
              ? 'border-[#3157D5] text-[#3157D5]'
              : 'border-transparent text-[#5B6475] hover:text-[#172033]'
          }`}
        >
          Join Room
        </button>
      </div>

      {/* CREATE ROOM TAB */}
      {activeTab === 'create' && (
        <>
          {createSuccess ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
              <h4 className="text-base font-semibold text-[#172033]">Room Created Successfully</h4>
              <p className="text-xs text-[#5B6475]">Adding workspace to your campus dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {createError && (
                <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{createError}</span>
                </div>
              )}

              <Input
                label="Room Name"
                id="createRoomName"
                placeholder="e.g. CSE 401 — Computer Networks"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Room Type"
                  id="createRoomType"
                  value={createForm.type}
                  onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                  options={Object.values(ROOM_TYPES)}
                />

                <Select
                  label="Access Type"
                  id="createAccessType"
                  value={createForm.accessType}
                  onChange={(e) => setCreateForm({ ...createForm, accessType: e.target.value })}
                  options={Object.values(ROOM_ACCESS_TYPES)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline room goals, syllabus, discussion rules, or lab instructions..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full rounded-md border border-[#E2E6EE] p-2.5 text-sm text-[#172033] placeholder:text-[#5B6475] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button variant="secondary" size="sm" onClick={handleClose} disabled={createLoading}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" disabled={createLoading} icon={PlusCircle}>
                  {createLoading ? 'Creating...' : 'Create Room'}
                </Button>
              </div>
            </form>
          )}
        </>
      )}

      {/* JOIN ROOM TAB */}
      {activeTab === 'join' && (
        <div>
          {joinStep === 1 && (
            <form onSubmit={handleCodeSearch} className="space-y-4">
              {joinError && (
                <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{joinError}</span>
                </div>
              )}

              <Input
                label="Room Code"
                id="joinRoomCode"
                placeholder="Example: CSE-7K29X"
                value={joinCode}
                onChange={(e) => {
                  setJoinCode(e.target.value.toUpperCase());
                  setJoinError('');
                }}
                icon={Hash}
                helperText="Enter the unique code shared by your instructor or room admin."
                required
              />

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button variant="secondary" size="sm" onClick={handleClose} disabled={joinLoading}>
                  Cancel
                </Button>
                <Button variant="accent" size="sm" type="submit" disabled={joinLoading} icon={ArrowRight}>
                  {joinLoading ? 'Searching...' : 'Continue'}
                </Button>
              </div>
            </form>
          )}

          {joinStep === 2 && searchedRoom && (
            <div className="space-y-4">
              <div className="p-4 rounded-md border border-[#E2E6EE] bg-[#F7F8FA] space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{searchedRoom.type}</Badge>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#E2E6EE] text-[#172033]">
                    {searchedRoom.code}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#172033]">{searchedRoom.name}</h4>
                  {searchedRoom.description && (
                    <p className="text-xs text-[#5B6475] mt-1 leading-relaxed">
                      {searchedRoom.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-[#E2E6EE] grid grid-cols-2 gap-2 text-xs text-[#5B6475]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Admin</span>
                    <span className="font-semibold text-[#172033]">
                      {searchedRoom.admin?.username || searchedRoom.admin?.fullName || 'Room Administrator'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Members</span>
                    <span className="font-semibold text-[#172033]">{searchedRoom.memberCount || 1} scholars</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setJoinStep(1)} disabled={joinLoading}>
                  Change Code
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={handleClose} disabled={joinLoading}>
                    Cancel
                  </Button>
                  <Button variant="accent" size="sm" onClick={handleRequestJoin} disabled={joinLoading}>
                    {joinLoading ? 'Submitting...' : 'Request to Join'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {joinStep === 3 && (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-[#172033]">
                {joinStatus === 'joined' ? 'Joined Room Workspace' : 'Request Sent'}
              </h4>
              <p className="text-xs text-[#5B6475] max-w-sm mx-auto leading-relaxed">
                {joinStatus === 'joined'
                  ? 'You are now an enrolled member of this room workspace.'
                  : 'Waiting for room administrator approval. You will receive an alert once approved.'}
              </p>
              <div className="pt-2">
                <Button variant="primary" size="sm" onClick={handleClose}>
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AddJoinRoomModal;
