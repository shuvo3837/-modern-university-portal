/**
 * Mock Data for Development & Initial State Testing
 */

import { USER_ROLES, ROOM_TYPES, ROOM_ACCESS_TYPES } from '../utils/constants';

export const mockCurrentUser = {
  id: 'usr_001',
  name: 'Alex Morgan',
  username: 'alexmorgan',
  email: 'alex.morgan@stanford.edu',
  role: USER_ROLES.STUDENT,
  avatarUrl: null,
  university: 'Stanford University',
  department: 'Computer Science',
  bio: 'Junior CS major focused on Distributed Systems and Human-Computer Interaction.',
  yearOfStudy: '3rd Year',
  enrollmentId: 'CS-2024-8891',
};

export const mockRooms = [
  {
    id: 'room_cs106b',
    name: 'CS 106B: Programming Abstractions',
    code: 'CS106B',
    type: ROOM_TYPES.COURSE,
    accessType: ROOM_ACCESS_TYPES.PUBLIC,
    department: 'Computer Science',
    university: 'Stanford University',
    instructor: 'Dr. Julie Zelenski',
    memberCount: 142,
    description: 'Course discussion, announcements, homework help, and lab schedules for Spring 2026.',
    color: 'indigo',
  },
  {
    id: 'room_cs_dept',
    name: 'CS Department Announcements',
    code: 'CSDEPT',
    type: ROOM_TYPES.DEPARTMENT,
    accessType: ROOM_ACCESS_TYPES.PUBLIC,
    department: 'Computer Science',
    university: 'Stanford University',
    instructor: 'Department Chair Office',
    memberCount: 890,
    description: 'Official department notices, research colloquiums, internship opportunities, and seminars.',
    color: 'emerald',
  },
  {
    id: 'room_study_group',
    name: 'Algorithms & LeetCode Study Group',
    code: 'ALGO99',
    type: ROOM_TYPES.PERSONAL,
    accessType: ROOM_ACCESS_TYPES.APPROVAL,
    department: 'Computer Science',
    university: 'Stanford University',
    instructor: 'Alex Morgan',
    memberCount: 8,
    description: 'Weekly peer mock interviews, algorithm walkthroughs, and problem discussions.',
    color: 'purple',
  },
];

export const mockTeachers = [
  {
    id: 'usr_t01',
    name: 'Dr. Julie Zelenski',
    username: 'jzelenski',
    email: 'zelenski@cs.stanford.edu',
    role: USER_ROLES.TEACHER,
    department: 'Computer Science',
    title: 'Senior Lecturer in Computer Science',
    office: 'Gates Computer Science Building, Room 204',
    officeHours: 'Mon, Wed 2:00 PM - 4:00 PM',
    coursesTaught: ['CS 106B', 'CS 107', 'CS 110'],
  },
  {
    id: 'usr_t02',
    name: 'Prof. David Patterson',
    username: 'patterson',
    email: 'patterson@eecs.stanford.edu',
    role: USER_ROLES.DEPARTMENT_HEAD,
    department: 'Computer Science',
    title: 'Professor & Department Chair',
    office: 'Gates Computer Science Building, Room 350',
    officeHours: 'Tue, Thu 10:00 AM - 12:00 PM',
    coursesTaught: ['CS 152', 'CS 250'],
  },
];

export const mockSchedules = [
  {
    id: 'sch_001',
    title: 'CS 106B Lecture: Recursive Backtracking',
    room: 'CS 106B',
    type: 'Lecture',
    date: '2026-10-14',
    startTime: '10:00 AM',
    endTime: '11:20 AM',
    location: 'Turing Auditorium 101',
    instructor: 'Dr. Julie Zelenski',
  },
  {
    id: 'sch_002',
    title: 'CS 106B Section: Recursion Deep Dive',
    room: 'CS 106B',
    type: 'Lab',
    date: '2026-10-15',
    startTime: '02:00 PM',
    endTime: '03:15 PM',
    location: 'Packard Bldg Room 108',
    instructor: 'Alex TA',
  },
];

export const mockNotifications = [
  {
    id: 'notif_001',
    title: 'Assignment 3 Released',
    message: 'Dr. Julie Zelenski posted Assignment 3: Boggle in CS 106B.',
    time: '15 mins ago',
    unread: true,
    type: 'announcement',
  },
  {
    id: 'notif_002',
    title: 'Room Request Approved',
    message: 'Your join request for "Algorithms & LeetCode Study Group" was approved.',
    time: '2 hours ago',
    unread: false,
    type: 'join_request',
  },
];
