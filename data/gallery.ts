export type GalleryFrame = {
  id: string;
  label: string;
  src: string | null;
};

// Placeholder stock photos from Unsplash. Replace with your own before launch.
export const galleryFrames: GalleryFrame[] = [
  { id: "gallery-1", label: "Student with offer letter", src: "https://images.unsplash.com/photo-1618355776464-8666794d2520?q=80&w=900&auto=format&fit=crop" },
  { id: "gallery-2", label: "Counselling session", src: "https://images.unsplash.com/photo-1627556704353-016baeb12c79?q=80&w=900&auto=format&fit=crop" },
  { id: "gallery-3", label: "Campus abroad", src: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=900&auto=format&fit=crop" },
  { id: "gallery-4", label: "Visa stamp / departure", src: "https://images.unsplash.com/photo-1621274790572-7c32596bc67f?q=80&w=900&auto=format&fit=crop" },
];
