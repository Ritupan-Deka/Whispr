/**
 * Formatting utilities for timestamps in chat streams, contact cards, and status tags.
 */

export function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
        return `Today at ${timeStr}`;
    } else if (isYesterday) {
        return `Yesterday at ${timeStr}`;
    } else {
        const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        return `${dateStr}, ${timeStr}`;
    }
}

export function formatShortTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
}

export function formatLastSeen(timestamp) {
    if (!timestamp) return 'Offline';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Offline';

    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffSec < 60) return 'Last seen just now';
    if (diffSec < 3600) return `Last seen ${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `Last seen ${Math.floor(diffSec / 3600)}h ago`;
    return `Last seen ${date.toLocaleDateString()}`;
}
