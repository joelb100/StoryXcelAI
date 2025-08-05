# Collapsible Panel System

## Feature Name
Independent Collapsible Sidebar Panels

## Purpose & Use Case
Provides users with optional sidebar panels (Friends List and Site Links) that can be toggled independently to maximize workspace area while maintaining quick access to social and navigation features.

## How It Works

### Logic Flow
1. **State Management**: Two independent boolean states control panel visibility
   - `isFriendsListOpen` - Controls Friends List panel
   - `isSiteLinksOpen` - Controls Site Links panel

2. **Grid Layout Calculation**: 28-column CSS Grid system dynamically allocates space
   - Base allocation: 1 (left icon) + 4 (left content) + 1 (right icon) = 6 columns
   - Available space: 28 - 6 = 22 columns for main content + panels
   - Each open panel takes 3 columns from main content area

3. **Conditional Rendering**: Panels only exist in DOM when open
   - Closed panels: Not rendered (no grid space taken)
   - Open panels: Rendered with `col-span-3`

4. **Main Content Expansion**: Dynamically calculated column span
   - Both closed: `col-span-22`
   - One open: `col-span-19` 
   - Both open: `col-span-16`

### Implementation Pattern
```typescript
// State
const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
const [isSiteLinksOpen, setIsSiteLinksOpen] = useState(false);

// Dynamic span calculation
const mainContentSpan = 28 - 1 - 4 - (isFriendsListOpen ? 3 : 0) - (isSiteLinksOpen ? 3 : 0) - 1;

// Conditional rendering
{isFriendsListOpen && (
  <div className="col-span-3">
    <RightSidebar />
  </div>
)}
```

## File References

### Primary Implementation
- `client/src/pages/dashboard-layout.tsx` - Main layout component with grid system
- `client/src/components/right-icon-sidebar.tsx` - Toggle button controls

### Supporting Components
- `client/src/components/right-sidebar.tsx` - Friends List content
- `client/src/components/site-links-sidebar.tsx` - Site Links content

## APIs/Dependencies
- **React State**: `useState` hooks for panel state management
- **Tailwind CSS**: CSS Grid utilities (`grid-cols-28`, `col-span-*`)
- **CSS Transitions**: Smooth panel animations

## Data Structures
```typescript
// State Types
type PanelState = boolean;

// Grid Layout Constants
const GRID_COLUMNS = 28;
const LEFT_ICON_COLS = 1;
const LEFT_CONTENT_COLS = 4;
const RIGHT_ICON_COLS = 1;
const PANEL_COLS = 3;
```

## Constraints & Rules
1. **Dashboard Protection**: Panel toggles disabled on Dashboard tab (permanent layout)
2. **Independent Operation**: Each panel operates without affecting the other
3. **Grid Compatibility**: Uses conditional rendering instead of `col-span-0` (CSS Grid limitation)
4. **Responsive Design**: System works within existing mobile/desktop breakpoints

## Status
**COMPLETED** ✅ (2025-01-05)
- Independent toggle functionality working
- Dynamic grid layout responsive
- Clean production interface (debug elements removed)
- Dashboard protection implemented
- All animations and transitions smooth

## Technical Notes
- Initially attempted `col-span-0` approach but CSS Grid doesn't handle zero-width columns properly
- Conditional rendering approach provides cleaner DOM and reliable grid calculations
- Panel width fixed at 280px with overflow handling for content
