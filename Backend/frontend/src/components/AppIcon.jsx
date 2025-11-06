// src/components/AppIcon.jsx
import React from 'react';
import { Icons } from './IconSet';

export default function AppIcon({ name, size = 20, color = '#2c3e50' }) {
  const Icon = Icons[name];
  return Icon ? <Icon size={size} color={color} /> : null;
}
