import React from 'react';
import { Badge } from '../common/Badge';

export const RoomTypeBadge = ({ type }) => {
  const variantMap = {
    University: 'primary',
    Department: 'accent',
    Course: 'neutral',
    Personal: 'neutral',
    Custom: 'warning',
  };

  return <Badge variant={variantMap[type] || 'neutral'}>{type || 'Course'}</Badge>;
};

export const RoomAccessBadge = ({ accessType }) => {
  const variantMap = {
    'Anyone can join': 'success',
    'Request approval': 'warning',
    Private: 'danger',
  };

  return <Badge variant={variantMap[accessType] || 'neutral'}>{accessType || 'Public'}</Badge>;
};

export default RoomTypeBadge;
