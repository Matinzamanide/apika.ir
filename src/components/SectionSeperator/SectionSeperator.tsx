import { ArrowLeft, CircleChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  linkText?: string;
  linkHref?: string;
}

const SectionHeader = ({
  icon,
  title,
  linkText = "مشاهده همه",
  linkHref = "#",
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-4 w-[95%] mx-auto">
      {/* عنوان و آیکون */}
      <div className="flex items-center gap-2 text-right">
        {icon && <span className="text-blue-600">{icon}</span>}
        <h2 className="text text-gray-800">{title}</h2>
      </div>

      {/* خط جداکننده */}
      <div className="flex-1 mx-4 border-2 border-t border-dotted border-gray-400"></div>

      {/* دکمه مشاهده همه */}
      <a
        href={linkHref}
        className="flex items-center gap-1 text-[11px] text-gray-700 hover:text-blue-600 transition"
      >
        <CircleChevronLeft size={17} color="#155dfc" />
        {linkText}
      </a>
    </div>
  );
};

export default SectionHeader;
