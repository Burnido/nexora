# 🎨 Nexora Design Tokens & Color Reference

## Color Palette

### Navy (Primary)
```
Navy 50:    #f8f9fa
Navy 100:   #f1f3f5
Navy 200:   #e9ecef
Navy 300:   #dee2e6
Navy 400:   #ced4da
Navy 500:   #adb5bd
Navy 600:   #868e96
Navy 700:   #495057
Navy 800:   #343a40
Navy 900:   #1a1e26 ← Main Navy
Navy 950:   #0f1217
```

### Cream (Background)
```
Cream 50:   #fefdfb ← Light background
Cream 100:  #fdfbf7
Cream 200:  #faf7f0
Cream 300:  #f5f0e8
Cream 400:  #efe8da
Cream 500:  #e8dfc9
Cream 600:  #dcd3b8
Cream 700:  #c9bfa4
Cream 800:  #b0a28f
Cream 900:  #8a7968
Cream 950:  #5a5347
```

### Sage (Accent)
```
Sage 50:    #f6f9f7
Sage 100:   #ecf4ef
Sage 200:   #d9e9dd
Sage 300:   #c5dccb
Sage 400:   #a8cab1
Sage 500:   #8fb899 ← Main Sage
Sage 600:   #6fa17a
Sage 700:   #588863
Sage 800:   #476b50
Sage 900:   #364d3d
Sage 950:   #1f2d27
```

## Typography Scale

### Display (Large Headings)
```css
font-size: clamp(2rem, 8vw, 4rem);
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.02em;
```
**Usage**: Main page headings, hero titles
**HTML**: `<h1 class="text-display">`

### Heading (Section Headings)
```css
font-size: clamp(1.5rem, 5vw, 2.5rem);
font-weight: 600;
line-height: 1.2;
```
**Usage**: Section titles, feature titles
**HTML**: `<h2 class="text-heading">`

### Subheading
```css
font-size: clamp(1rem, 3vw, 1.5rem);
font-weight: 500;
line-height: 1.4;
```
**Usage**: Feature titles, component headers
**HTML**: `<h3 class="text-subheading">`

### Body
```css
font-size: 1rem;
line-height: 1.6;
font-weight: 400;
```
**Usage**: Regular text, descriptions
**HTML**: `<p class="text-body">`

### Caption
```css
font-size: 0.875rem;
line-height: 1.5;
font-weight: 400;
```
**Usage**: Small text, metadata
**HTML**: `<p class="text-caption">`

## Button Styles

### Primary Button
```css
Background: #1a1e26 (Navy 950)
Text: #fdfbf7 (Cream 50)
Border: 1px solid #1a1e26
Padding: 0.75rem 1.5rem
Font Weight: 500
```
**HTML**: `<button class="btn">Button Text</button>`

### Outline Button
```css
Background: transparent
Text: #1a1e26 (Navy 950)
Border: 1px solid #1a1e26
Padding: 0.75rem 1.5rem
Font Weight: 500
```
**HTML**: `<button class="btn btn-outline">Button Text</button>`

### Button Hover State
```css
Primary: Navy bg becomes Cream, text becomes Navy
Outline: Outline becomes filled Navy with Cream text
```

## Layout & Spacing

### Container Classes
```css
.container-narrow {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

### Section Spacing
```css
Vertical padding: 5rem (80px) desktop, 4rem (64px) mobile
Horizontal padding: 2rem (32px)
Gap between elements: 2rem (32px)
```

## Border Styles

### Borders
- All borders: **1px solid**
- Border color: Usually Navy 200 (#e9ecef) or Navy 950 (#1a1e26)
- **NO rounded corners** - use sharp edges only!

### Sharp Edges Only
```css
border-radius: 0 !important;
```

## Animations

### Fade In
```css
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Slide Up
```css
.slide-up {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Tailwind CSS Usage Examples

### Colors
```jsx
// Background
<div className="bg-navy-950">Dark navy</div>
<div className="bg-cream-50">Cream background</div>
<div className="bg-sage-600">Sage accent</div>

// Text
<p className="text-navy-950">Navy text</p>
<p className="text-cream-50">Cream text</p>
<p className="text-sage-600">Sage text</p>

// Borders
<div className="border border-navy-200">Subtle border</div>
<div className="border border-navy-950">Strong border</div>
```

### Typography
```jsx
<h1 className="text-display text-navy-950">Large Title</h1>
<h2 className="text-heading text-navy-950">Section</h2>
<h3 className="text-subheading text-navy-950">Subsection</h3>
<p className="text-body text-navy-700">Regular text</p>
<p className="text-caption text-navy-600">Small text</p>
```

### Buttons
```jsx
<button className="btn">Primary Button</button>
<button className="btn btn-outline">Outline Button</button>
```

### Layout
```jsx
<div className="container-narrow">
  <h1>Center-aligned content</h1>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

## Accessibility Guidelines

### Contrast Ratios
- Navy on Cream: **18.5:1** ✅ Excellent
- Navy on Sage (light): **8.2:1** ✅ AAA
- Text minimum size: **14px** (1rem)

### Links
- Always underlined or clearly distinguished
- Sufficient color contrast
- Focus states visible
- Hover states indicate interactivity

### Buttons
- Minimum touch size: 44x44px
- Clear distinction from links
- Disabled state must be visible
- Focus states clearly visible

## Dark Mode (Future)

When implementing dark mode:
```
Light:     Navy as primary, Cream as background
Dark:      Cream as primary, Navy as background
Accent:    Sage remains consistent
```

## Common Component Patterns

### Card Components
```jsx
<div className="border border-navy-200 p-8 hover:border-navy-950 transition-colors">
  <h3 className="text-subheading text-navy-950 mb-3">Title</h3>
  <p className="text-navy-700">Description</p>
</div>
```

### Hero Section
```jsx
<section className="py-20 md:py-28 bg-cream-50">
  <div className="container-narrow">
    <h1 className="text-display text-navy-950 mb-6">Headline</h1>
    <p className="text-lg text-navy-800 mb-8">Description</p>
  </div>
</section>
```

### Navigation
```jsx
<nav className="sticky top-0 z-50 bg-cream-50 border-b border-navy-200">
  <div className="container-narrow py-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">NEXORA</h1>
    {/* Navigation links */}
  </div>
</nav>
```

## CSS Custom Properties (Future Enhancement)

Ready to add to your CSS:
```css
:root {
  --color-navy-950: #1a1e26;
  --color-cream-50: #fdfbf7;
  --color-sage-600: #6fa17a;
  
  --font-display: clamp(2rem, 8vw, 4rem);
  --font-heading: clamp(1.5rem, 5vw, 2.5rem);
  
  --transition-default: all 0.2s ease;
}
```

## Useful Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Color Palette Generator](https://coolors.co)
- [Typography Scaler](https://www.typescale.com)

---

**Remember**: No rounded corners! Keep all edges sharp and clean for that brutalist aesthetic.

_Last Updated: February 2026_
