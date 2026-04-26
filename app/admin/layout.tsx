// Admin has its own layout — no Navbar or Footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
