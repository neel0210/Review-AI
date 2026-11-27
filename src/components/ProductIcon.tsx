import {
  Smartphone,
  Snowflake,
  Waves,
  Wind,
  Tv,
  Fan,
  Disc3,
  Flame,
  Droplets,
  Utensils,
  Speaker,
  PackagePlus,
  Package,
} from 'lucide-react';

interface Props {
  iconName: string;
  className?: string;
}

export default function ProductIcon({ iconName, className = 'w-5 h-5' }: Props) {
  switch (iconName?.toLowerCase()) {
    case 'smartphone':
    case 'mobiles':
      return <Smartphone className={className} />;
    case 'refrigerator':
    case 'snowflake':
      return <Snowflake className={className} />;
    case 'waves':
    case 'washing':
      return <Waves className={className} />;
    case 'wind':
    case 'ac':
      return <Wind className={className} />;
    case 'tv':
      return <Tv className={className} />;
    case 'fan':
    case 'coolers':
      return <Fan className={className} />;
    case 'disc3':
    case 'fans':
      return <Disc3 className={className} />;
    case 'flame':
    case 'microwave':
      return <Flame className={className} />;
    case 'droplets':
    case 'water':
      return <Droplets className={className} />;
    case 'utensils':
    case 'kitchen':
      return <Utensils className={className} />;
    case 'speaker':
    case 'speakers':
      return <Speaker className={className} />;
    case 'packageplus':
    case 'other':
      return <PackagePlus className={className} />;
    default:
      return <Package className={className} />;
  }
}
