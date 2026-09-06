import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[#94a3b8] text-sm mb-2">
            &copy; {new Date().getFullYear()} Hurghada Programok — Minden jog fenntartva.
          </p>
          <Link to="/admin" className="mb-3 inline-block text-xs text-[#64748b] hover:text-white">Admin</Link>
          <p className="text-[#64748b] text-xs flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-[#f43f5e] fill-current" /> for Hurghada travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
