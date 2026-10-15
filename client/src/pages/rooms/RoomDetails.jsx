import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  Building,
  Bell,
  Send,
  Shield,
  AlertCircle,
  Hash,
  UserCheck,
  Check,
  X,
} from 'lucide-react';
import { RoomHeader } from '../../components/rooms/RoomHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
import roomService from '../../services/roomService';

export const RoomDetails = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { rooms } = useApp();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tabs: 'Discussions' | 'Overview' | 'Members' | 'Requests'
  const [activeTab, setActiveTab] = useState('Discussions');

  // Posts State
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [discussionInput, setDiscussionInput] = useState('');
  const [posting, setPosting] = useState(false);

  // Members State
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // Requests State (admin only)
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  // Fetch Room Details
  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await roomService.getRoomById(roomId);
        const data = res.data || res;
        setRoom(data);
      } catch (err) {
        // Fallback to rooms in context if matched by id/code
        const found = rooms?.find(
          (r) =>
            r.id === roomId ||
            r._id === roomId ||
            r.code?.toLowerCase() === roomId?.toLowerCase()
        );
        if (found) {
          setRoom(found);
        } else {
          setError('Room not found or you do not have permission to view this workspace.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, rooms]);

  // Fetch Posts when room is loaded
  const fetchPosts = async (id) => {
    setPostsLoading(true);
    try {
      const res = await roomService.getRoomPosts(id);
      const list = res.data || res || [];
      setPosts(Array.isArray(list) ? list : []);
    } catch (err) {
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  // Fetch Members
  const fetchMembers = async (id) => {
    setMembersLoading(true);
    try {
      const res = await roomService.getRoomMembers(id);
      const list = res.data || res || [];
      setMembers(Array.isArray(list) ? list : []);
    } catch (err) {
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  // Fetch Requests (admin only)
  const fetchRequests = async (id) => {
    setRequestsLoading(true);
    try {
      const res = await roomService.getRoomRequests(id);
      const list = res.data || res || [];
      setRequests(Array.isArray(list) ? list : []);
    } catch (err) {
      setRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    if (room?._id || room?.id) {
      const id = room._id || room.id;
      fetchPosts(id);
      fetchMembers(id);
      if (room.admin?._id === user?.id || room.admin === user?.id || user?.role === 'university_admin') {
        fetchRequests(id);
      }
    }
  }, [room, user]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!discussionInput.trim() || !room) return;

    setPosting(true);
    try {
      const targetId = room._id || room.id;
      const res = await roomService.createRoomPost(targetId, {
        content: discussionInput.trim(),
      });
      const newPost = res.data || res;
      setPosts((prev) => [newPost, ...prev]);
      setDiscussionInput('');
    } catch (err) {
      // Local addition if needed
      setPosts((prev) => [
        {
          _id: `post_${Date.now()}`,
          author: { username: user?.username, fullName: user?.fullName || user?.name || user?.username },
          content: discussionInput.trim(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setDiscussionInput('');
    } finally {
      setPosting(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const targetId = room._id || room.id;
      await roomService.handleRoomRequest(targetId, requestId, 'approve');
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
      fetchMembers(targetId);
    } catch (err) {
      // ignore
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const targetId = room._id || room.id;
      await roomService.handleRoomRequest(targetId, requestId, 'reject');
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-[#5B6475]">
        Loading room details...
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#172033]">Room Not Found</h3>
        <p className="text-xs text-[#5B6475]">
          {error || 'The workspace room could not be found or you do not have permission to view it.'}
        </p>
        <Link to="/rooms">
          <Button variant="secondary" size="sm">
            Back to My Rooms
          </Button>
        </Link>
      </div>
    );
  }

  const isAdmin =
    room.admin?._id === user?.id ||
    room.admin === user?.id ||
    room.currentUserRole === 'admin' ||
    user?.role === 'university_admin';

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <RoomHeader room={room} />

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 border-b border-[#E2E6EE] overflow-x-auto pb-1 scrollbar-none">
        {['Discussions', 'Overview', 'Members', ...(isAdmin ? ['Requests'] : [])].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
              activeTab === tab
                ? 'border-[#3157D5] text-[#3157D5]'
                : 'border-transparent text-[#5B6475] hover:text-[#172033]'
            }`}
          >
            {tab}
            {tab === 'Requests' && requests.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#3157D5] text-white text-[10px]">
                {requests.length}
              </span>
            )}
            {tab === 'Members' && members.length > 0 && (
              <span className="ml-1.5 text-[10px] text-[#5B6475]">
                ({members.length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB: DISCUSSIONS & FEED */}
      {activeTab === 'Discussions' && (
        <div className="space-y-6 max-w-4xl">
          {/* Post Creation Box */}
          <Card className="p-4">
            <form onSubmit={handlePostSubmit} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Share an announcement, lecture notes, lab question, or academic update with the room..."
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                className="w-full rounded-md border border-[#E2E6EE] p-3 text-xs sm:text-sm text-[#172033] placeholder:text-[#5B6475] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#5B6475]">
                  Posting as <strong className="text-[#172033]">{user?.fullName || user?.username || 'You'}</strong>
                </span>
                <Button
                  variant="accent"
                  size="sm"
                  type="submit"
                  disabled={posting || !discussionInput.trim()}
                  icon={Send}
                >
                  {posting ? 'Posting...' : 'Post Message'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Posts Feed */}
          {postsLoading ? (
            <div className="py-8 text-center text-xs text-[#5B6475]">Loading room feed...</div>
          ) : posts.length === 0 ? (
            <EmptyState
              title="No messages or announcements yet"
              description="Be the first to post a question, lecture slide, or course update in this workspace!"
            />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const authorName =
                  post.author?.fullName ||
                  post.author?.username ||
                  (typeof post.author === 'string' ? post.author : 'Room Member');

                return (
                  <Card key={post._id || post.id} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={authorName} size="sm" />
                        <div>
                          <span className="text-xs font-bold text-[#172033] block">
                            {authorName}
                          </span>
                          <span className="text-[10px] text-[#5B6475] block">
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                      </div>
                      {post.author?.role && (
                        <Badge variant="primary" size="xs">
                          {post.author.role}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#172033] leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {/* Comments if any */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="pt-3 border-t border-[#E2E6EE] space-y-2">
                        {post.comments.map((comment, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-[#F7F8FA] text-xs space-y-1">
                            <span className="font-semibold text-[#172033]">
                              {comment.author?.username || comment.author?.fullName || 'Scholar'}:
                            </span>
                            <p className="text-[#5B6475]">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="space-y-6 max-w-4xl">
          <Card title="Workspace Information">
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#172033] uppercase text-[10px] tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-[#5B6475] leading-relaxed">
                  {room.description || 'No description provided for this room.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E2E6EE]">
                <div>
                  <h4 className="font-bold text-[#172033] uppercase text-[10px] tracking-wider mb-1">
                    Room Type
                  </h4>
                  <Badge variant="primary">{room.type || 'Custom'}</Badge>
                </div>

                <div>
                  <h4 className="font-bold text-[#172033] uppercase text-[10px] tracking-wider mb-1">
                    Access Policy
                  </h4>
                  <Badge variant="neutral">{room.accessType || 'Public'}</Badge>
                </div>

                <div>
                  <h4 className="font-bold text-[#172033] uppercase text-[10px] tracking-wider mb-1">
                    Room Code
                  </h4>
                  <span className="font-mono font-semibold px-2 py-0.5 rounded bg-[#F7F8FA] border border-[#E2E6EE] text-[#172033]">
                    {room.code}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-[#172033] uppercase text-[10px] tracking-wider mb-1">
                    Administrator
                  </h4>
                  <span className="text-[#172033] font-medium flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#3157D5]" />
                    {room.admin?.fullName || room.admin?.username || 'Room Admin'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: MEMBERS */}
      {activeTab === 'Members' && (
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
              Enrolled Scholars & Faculty
            </h3>
            <span className="text-xs text-[#5B6475]">
              {members.length} member{members.length !== 1 ? 's' : ''}
            </span>
          </div>

          {membersLoading ? (
            <div className="py-8 text-center text-xs text-[#5B6475]">Loading members...</div>
          ) : members.length === 0 ? (
            <Card className="p-6 text-center text-xs text-[#5B6475]">
              No members enrolled yet. Share room code <strong className="font-mono text-[#172033]">{room.code}</strong> with your students or peers.
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {members.map((m) => {
                const memUser = m.user || {};
                const name = memUser.fullName || memUser.username || 'Scholar';
                return (
                  <Card key={m._id || memUser._id} className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={name} size="sm" />
                      <div>
                        <span className="text-xs font-bold text-[#172033] block">{name}</span>
                        <span className="text-[10px] text-[#5B6475] block capitalize">
                          {m.role || memUser.role || 'Member'}
                        </span>
                      </div>
                    </div>
                    {m.role === 'admin' && (
                      <Badge variant="primary" size="xs">Admin</Badge>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: REQUESTS (Admin Only) */}
      {activeTab === 'Requests' && isAdmin && (
        <div className="space-y-4 max-w-4xl">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider">
            Pending Join Requests
          </h3>

          {requestsLoading ? (
            <div className="py-8 text-center text-xs text-[#5B6475]">Loading requests...</div>
          ) : requests.length === 0 ? (
            <Card className="p-6 text-center text-xs text-[#5B6475]">
              No pending join requests for this room.
            </Card>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => {
                const requester = req.user || {};
                const name = requester.fullName || requester.username || 'Applicant';
                return (
                  <Card key={req._id} className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={name} size="sm" />
                      <div>
                        <span className="text-xs font-bold text-[#172033] block">{name}</span>
                        <span className="text-[11px] text-[#5B6475] block">{requester.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleRejectRequest(req._id)}
                        icon={X}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleApproveRequest(req._id)}
                        icon={Check}
                      >
                        Approve
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
