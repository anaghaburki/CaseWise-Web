import { Link } from "react-router-dom";

interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick }) => {
  return (
    <Link to={`/${label}`} onClick={onClick} className="no-underline">
      <div
        className={`cursor-pointer font-medium px-3 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${isActive ? 'bg-[#F4EEE4] text-black' : 'text-[#F4EEE4] hover:text-gray-300'}`}
      >
        {label}
      </div>
    </Link>
  );
};