import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-chocolate-600 py-3" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-strawberry-600 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-chocolate-400" />
            {item.path ? (
              <Link to={item.path} className="hover:text-strawberry-600 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="font-semibold text-chocolate-900">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
