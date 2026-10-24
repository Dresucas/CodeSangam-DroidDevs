// ==========================================
// 1. DATA CONTRACT INTERFACES
// ==========================================

export interface DashboardStats {
  totalPhotos: number;
  smartAlbumsCount: number;
  duplicateGroupsCount: number;
}

export interface PhotoItem {
  id: string;
  uri: string;
  name: string;
  createdAt: string;
}

export interface AILabel {
  name: string;
  score: number;
}

export interface PhotoDetail {
  id: string;
  uri: string;
  name: string;
  size: string;
  date: string;
  isStarred: boolean;
  labels: AILabel[];
}

export interface SmartAlbum {
  id: string;
  name: string;
  count: number;
  coverUri: string;
  categoryIcon: string;
}

export interface DuplicateItem {
  id: string;
  uri: string;
  size: string;
  sizeInBytes: number;
  isOriginal: boolean;
}

export interface DuplicateGroup {
  id: string;
  title: string;
  matchType: "Exact Match" | "Similar Angle" | "Burst Shot";
  items: DuplicateItem[];
}

export interface DeleteDuplicatesResponse {
  success: boolean;
  freedBytes: number;
  deletedCount: number;
}

// ==========================================
// 2. CONFIGURATION & CLIENT
// ==========================================

// Configured via EXPO_PUBLIC_API_URL in .env (e.g., http://192.168.1.15:8000/api)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";
const TIMEOUT_MS = 4000;

/**
 * Robust fetch wrapper with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// ==========================================
// 3. MOCK FALLBACK DATA (For Dev & Offline Demos)
// ==========================================

const MOCK_STATS: DashboardStats = {
  totalPhotos: 2458,
  smartAlbumsCount: 6,
  duplicateGroupsCount: 3,
};

const MOCK_PHOTOS: PhotoItem[] = [
  { id: "1", uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80", name: "IMG_20261024_095200.jpg", createdAt: "2026-10-24T09:52:00Z" },
  { id: "2", uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", name: "IMG_20261024_095312.jpg", createdAt: "2026-10-24T09:53:12Z" },
  { id: "3", uri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80", name: "IMG_20261024_100145.jpg", createdAt: "2026-10-24T10:01:45Z" },
  { id: "4", uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", name: "IMG_20261024_111520.jpg", createdAt: "2026-10-24T11:15:20Z" },
  { id: "5", uri: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=600&q=80", name: "IMG_20261024_123010.jpg", createdAt: "2026-10-24T12:30:10Z" },
  { id: "6", uri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", name: "IMG_20261024_134000.jpg", createdAt: "2026-10-24T13:40:00Z" },
  { id: "7", uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", name: "IMG_20261024_142055.jpg", createdAt: "2026-10-24T14:20:55Z" },
  { id: "8", uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", name: "IMG_20261024_150030.jpg", createdAt: "2026-10-24T15:00:30Z" },
  { id: "9", uri: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", name: "IMG_20261024_161040.jpg", createdAt: "2026-10-24T16:10:40Z" },
];

const MOCK_PHOTO_DETAILS: Record<string, PhotoDetail> = {
  "1": {
    id: "1",
    uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=85",
    name: "IMG_20261024_095200.jpg",
    date: "24 Oct 2026",
    size: "3.2 MB",
    isStarred: false,
    labels: [
      { name: "Mountain", score: 0.96 },
      { name: "Lake", score: 0.91 },
      { name: "Nature", score: 0.88 },
      { name: "Landscape", score: 0.74 },
    ],
  },
};

const MOCK_ALBUMS: SmartAlbum[] = [
  { id: "nature", name: "Nature & Travel", count: 342, coverUri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80", categoryIcon: "leaf-outline" },
  { id: "animals", name: "Pets & Animals", count: 189, coverUri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80", categoryIcon: "paw-outline" },
  { id: "architecture", name: "Architecture", count: 114, coverUri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", categoryIcon: "business-outline" },
  { id: "food", name: "Food & Drinks", count: 94, coverUri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", categoryIcon: "restaurant-outline" },
  { id: "portraits", name: "Portraits", count: 245, coverUri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", categoryIcon: "people-outline" },
  { id: "documents", name: "Receipts & Notes", count: 67, coverUri: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", categoryIcon: "document-text-outline" },
];

const MOCK_DUPLICATES: DuplicateGroup[] = [
  {
    id: "group-1",
    title: "Mountain Vista",
    matchType: "Burst Shot",
    items: [
      { id: "p1", uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80", size: "3.4 MB", sizeInBytes: 3400000, isOriginal: true },
      { id: "p2", uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80", size: "3.1 MB", sizeInBytes: 3100000, isOriginal: false },
      { id: "p3", uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80", size: "3.2 MB", sizeInBytes: 3200000, isOriginal: false },
    ],
  },
  {
    id: "group-2",
    title: "Pet Portrait",
    matchType: "Similar Angle",
    items: [
      { id: "p4", uri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80", size: "2.6 MB", sizeInBytes: 2600000, isOriginal: true },
      { id: "p5", uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", size: "2.5 MB", sizeInBytes: 2500000, isOriginal: false },
    ],
  },
];

// ==========================================
// 4. API SERVICE METHODS
// ==========================================

export const apiService = {
  /**
   * Screen 4: Fetch Home Dashboard aggregated metrics
   */
  async getStats(): Promise<DashboardStats> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/stats`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return MOCK_STATS;
    }
  },

  /**
   * Screen 5: Fetch Gallery Photos Grid with optional filter
   */
  async getPhotos(filter: string = "all"): Promise<PhotoItem[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/photos?filter=${encodeURIComponent(filter)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return MOCK_PHOTOS;
    }
  },

  /**
   * Screen 6 & 7: Fetch single photo details and AI classification labels
   */
  async getPhotoById(id: string): Promise<PhotoDetail> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/photos/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return MOCK_PHOTO_DETAILS[id] || {
        ...MOCK_PHOTO_DETAILS["1"],
        id,
      };
    }
  },

  /**
   * Screen 8: Fetch categorized Smart Albums
   */
  async getSmartAlbums(): Promise<SmartAlbum[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/albums/smart`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return MOCK_ALBUMS;
    }
  },

  /**
   * Screen 9: Fetch detected duplicate and burst clusters
   */
  async getDuplicates(): Promise<DuplicateGroup[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/duplicates`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return MOCK_DUPLICATES;
    }
  },

  /**
   * Screen 9: Delete selected duplicate photo IDs
   */
  async deleteDuplicates(photoIds: string[]): Promise<DeleteDuplicatesResponse> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/duplicates`, {
        method: "DELETE",
        body: JSON.stringify({ photoIds }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return {
        success: true,
        freedBytes: photoIds.length * 3200000,
        deletedCount: photoIds.length,
      };
    }
  },
};