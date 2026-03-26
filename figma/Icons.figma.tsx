import figma from '@figma/code-connect'
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  CircleCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplet,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  LayoutDashboard,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Trophy,
  User,
  Weight,
  X,
  Zap,
} from 'lucide-react'

const BASE = 'https://www.figma.com/design/E8jkfAtko959z87GfJQN4Y/FitTrack-DS'

figma.connect(Activity,        `${BASE}?node-id=134-23`,   { example: () => <Activity /> })
figma.connect(ArrowRight,      `${BASE}?node-id=134-177`,  { example: () => <ArrowRight /> })
figma.connect(Bell,            `${BASE}?node-id=134-311`,  { example: () => <Bell /> })
figma.connect(Calendar,        `${BASE}?node-id=134-485`,  { example: () => <Calendar /> })
figma.connect(Check,           `${BASE}?node-id=134-609`,  { example: () => <Check /> })
figma.connect(CircleCheck,     `${BASE}?node-id=134-673`,  { example: () => <CircleCheck /> })
figma.connect(ChevronDown,     `${BASE}?node-id=134-617`,  { example: () => <ChevronDown /> })
figma.connect(ChevronLeft,     `${BASE}?node-id=134-623`,  { example: () => <ChevronLeft /> })
figma.connect(ChevronRight,    `${BASE}?node-id=134-625`,  { example: () => <ChevronRight /> })
figma.connect(Clock,           `${BASE}?node-id=134-763`,  { example: () => <Clock /> })
figma.connect(Droplet,         `${BASE}?node-id=134-1011`, { example: () => <Droplet /> })
figma.connect(Dumbbell,        `${BASE}?node-id=134-1019`, { example: () => <Dumbbell /> })
figma.connect(Flame,           `${BASE}?node-id=134-1215`, { example: () => <Flame /> })
figma.connect(Footprints,      `${BASE}?node-id=134-1309`, { example: () => <Footprints /> })
figma.connect(Heart,           `${BASE}?node-id=134-1467`, { example: () => <Heart /> })
figma.connect(LayoutDashboard, `${BASE}?node-id=134-1599`, { example: () => <LayoutDashboard /> })
figma.connect(Menu,            `${BASE}?node-id=134-1765`, { example: () => <Menu /> })
figma.connect(Pencil,          `${BASE}?node-id=134-2057`, { example: () => <Pencil /> })
figma.connect(Plus,            `${BASE}?node-id=134-2131`, { example: () => <Plus /> })
figma.connect(Search,          `${BASE}?node-id=134-2345`, { example: () => <Search /> })
figma.connect(Settings,        `${BASE}?node-id=134-2375`, { example: () => <Settings /> })
figma.connect(Star,            `${BASE}?node-id=134-2635`, { example: () => <Star /> })
figma.connect(Target,          `${BASE}?node-id=134-2725`, { example: () => <Target /> })
figma.connect(Trash2,          `${BASE}?node-id=134-2815`, { example: () => <Trash2 /> })
figma.connect(TrendingUp,      `${BASE}?node-id=134-2829`, { example: () => <TrendingUp /> })
figma.connect(Trophy,          `${BASE}?node-id=134-2837`, { example: () => <Trophy /> })
figma.connect(User,            `${BASE}?node-id=134-2887`, { example: () => <User /> })
figma.connect(Weight,          `${BASE}?node-id=134-2989`, { example: () => <Weight /> })
figma.connect(X,               `${BASE}?node-id=134-3021`, { example: () => <X /> })
figma.connect(Zap,             `${BASE}?node-id=134-3025`, { example: () => <Zap /> })
