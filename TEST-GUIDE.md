# C3 Web UI - Testing Guide

**Version:** 0.2.0  
**Date:** 2025-11-16

---

## 🚀 Quick Start

### 1. Start the Servers

**Terminal 1 - Start c3-bff API:**
```bash
cd /Users/samuelgleeson/dev/c3-bff
npm run build
npm start

# Should see:
# 🚀 C3 BFF Server running at http://0.0.0.0:3001
```

**Terminal 2 - Start c3-web UI:**
```bash
cd /Users/samuelgleeson/dev/c3-web
npm run dev

# Should see:
# VITE v5.x ready in X ms
# ➜  Local:   http://localhost:5173/
```

**Terminal 3 - Verify Health:**
```bash
curl http://localhost:3001/api/health
# Should return: {"success":true,"data":{"status":"healthy","timestamp":"..."}}
```

**Open Browser:**
```
http://localhost:5173
```

---

## ✅ Test Checklist

### Test 1: Module Analysis ✅
1. [ ] Navigate to **Analysis** page (should be default)
2. [ ] Enter path: `/Users/samuelgleeson/dev/c3-projection/src`
3. [ ] Select: **Top-Level** aggregation
4. [ ] Uncheck "Include test files"
5. [ ] Click **"Analyze Codebase"**
6. [ ] ✅ Verify loading state shows
7. [ ] ✅ Verify toast notification: "Analyzing codebase..."
8. [ ] ✅ Verify toast changes to: "Analysis complete!"
9. [ ] ✅ Verify metrics cards display (Modules, Files, Dependencies, Avg Coupling)
10. [ ] ✅ Verify module list table appears
11. [ ] ✅ Verify hotspots section shows top modules
12. [ ] ✅ Verify "View Graph" button appears

**Expected Results:**
- Modules: ~10-15
- Files: ~30-50
- Dependencies: ~15-30
- Avg Coupling: ~1-2

---

### Test 2: Graph Visualization ✅
1. [ ] Click **"View Graph"** from analysis results
2. [ ] ✅ Verify redirected to Projection page
3. [ ] ✅ Verify graph renders with nodes and edges
4. [ ] ✅ Verify nodes are color-coded (green/blue/orange/red)
5. [ ] ✅ Test **Zoom In** (scroll up or pinch)
6. [ ] ✅ Test **Zoom Out** (scroll down or pinch)
7. [ ] ✅ Test **Pan** (click and drag background)
8. [ ] ✅ Click on a node
9. [ ] ✅ Verify node details panel appears on left
10. [ ] ✅ Verify panel shows: files, dependencies, used by
11. [ ] ✅ Click X to close panel
12. [ ] **Change layout:**
    - [ ] ✅ Switch to "Force-Directed" 
    - [ ] ✅ Verify nodes animate and settle
    - [ ] ✅ Drag a node (should move freely)
    - [ ] ✅ Switch back to "Hierarchical"
    - [ ] ✅ Verify nodes arrange in layers
13. [ ] **Test controls:**
    - [ ] ✅ Uncheck "Show Labels" → labels disappear
    - [ ] ✅ Check "Show Labels" → labels appear
    - [ ] ✅ Try different color schemes
14. [ ] ✅ Verify legend shows on bottom left

**Expected Behavior:**
- Graph renders within 1-2 seconds
- Smooth zoom and pan
- Force layout settles within 3-5 seconds
- Node selection highlights the node
- Details panel shows actual module data

---

### Test 3: Export Functionality ✅
1. [ ] From Analysis page (after running analysis)
2. [ ] Click **"Export ▼"** button
3. [ ] ✅ Verify modal/menu appears with 4 options
4. [ ] Click **"📄 JSON Format"**
5. [ ] ✅ Verify file downloads: `analysis-{id}.json`
6. [ ] ✅ Open file, verify it's valid JSON
7. [ ] Repeat for **"📊 GraphML Format"**
8. [ ] ✅ Verify file downloads: `analysis-{id}.graphml`
9. [ ] ✅ Open file, verify XML format
10. [ ] Repeat for **"🖼️ SVG Image"**
11. [ ] ✅ Verify file downloads: `module-graph-{id}.svg`
12. [ ] ✅ Open file in browser, verify graph visualization
13. [ ] Repeat for **"📝 Markdown Report"**
14. [ ] ✅ Verify file downloads: `ANALYSIS.md`
15. [ ] ✅ Open file, verify markdown table

**Expected Files:**
```
analysis-{timestamp}.json       (JSON with full analysis data)
analysis-{timestamp}.graphml    (GraphML XML format)
module-graph-{timestamp}.svg    (SVG vector image)
ANALYSIS.md                     (Markdown report)
```

---

### Test 4: Architecture Validation ✅
1. [ ] Navigate to **Architecture** page
2. [ ] Enter path: `/Users/samuelgleeson/dev/c3-projection/src`
3. [ ] Click **"Validate Architecture"**
4. [ ] ✅ Verify loading state
5. [ ] ✅ Verify toast: "Validating architecture..."
6. [ ] ✅ Verify toast: "Validation complete!"
7. [ ] ✅ Verify score displays (0-100)
8. [ ] ✅ Verify grade displays (A+, A, B, C, D, F)
9. [ ] ✅ Verify emoji shows (🏆, ✨, 👍, ⚠️, ❌)
10. [ ] ✅ Verify validation checks section
11. [ ] ✅ Verify each check shows: ✅/❌, name, message
12. [ ] ✅ Verify layer summary (if available)
13. [ ] ✅ Verify recommendations (if available)

**Expected for c3-projection:**
- Score: 90-100
- Grade: A or A+
- All checks: ✅ PASS
- Layers: Domain, Application, Infrastructure

---

### Test 5: Analysis History ✅
1. [ ] Navigate to **History** page (📜 History link)
2. [ ] ✅ Verify list of past analyses
3. [ ] ✅ Verify each row shows: Date, Project, Modules count
4. [ ] **Test search:**
   - [ ] Type "c3-projection" in search box
   - [ ] ✅ Verify list filters
   - [ ] Clear search
   - [ ] ✅ Verify list shows all again
5. [ ] **Test view:**
   - [ ] Click **"View"** on an analysis
   - [ ] ✅ Verify redirected to Analysis Detail page
   - [ ] ✅ Verify analysis data loads
6. [ ] **Test delete:**
   - [ ] Go back to History
   - [ ] Click **"Delete"** on an analysis
   - [ ] ✅ Verify confirmation prompt
   - [ ] Click OK
   - [ ] ✅ Verify toast: "Analysis deleted"
   - [ ] ✅ Verify row disappears from list

---

### Test 6: Navigation ✅
1. [ ] Click **"📊 Analysis"** → verify Analysis page
2. [ ] Click **"🎯 Graph"** → verify Projection page (empty if no analysis)
3. [ ] Click **"🏛️ Architecture"** → verify Architecture page
4. [ ] Click **"✅ Compliance"** → verify Compliance page (existing)
5. [ ] Click **"🔍 Discovery"** → verify Discovery page (existing)
6. [ ] Click **"C3"** logo → verify redirects to Analysis
7. [ ] Click **"📜 History"** → verify History page
8. [ ] ✅ Verify active nav link is highlighted (dark background)
9. [ ] **Test browser navigation:**
   - [ ] Click browser back button
   - [ ] ✅ Verify goes to previous page
   - [ ] Click browser forward button
   - [ ] ✅ Verify goes forward

---

### Test 7: Error Handling ✅
1. [ ] **Test invalid path:**
   - [ ] Enter path: `/invalid/path/that/does/not/exist`
   - [ ] Click "Analyze Codebase"
   - [ ] ✅ Verify error toast appears
   - [ ] ✅ Verify user-friendly error message
2. [ ] **Test network error:**
   - [ ] Stop c3-bff server (Ctrl+C in Terminal 1)
   - [ ] Try to analyze a codebase
   - [ ] ✅ Verify error toast: "Analysis failed: ..."
   - [ ] ✅ Verify error message mentions connection
   - [ ] Restart c3-bff server
3. [ ] **Test empty results:**
   - [ ] Go to Projection page without running analysis
   - [ ] ✅ Verify shows: "No Analysis Available"
   - [ ] ✅ Verify link to Analysis page
4. [ ] **Test form validation:**
   - [ ] Clear codebase path field
   - [ ] Try to submit
   - [ ] ✅ Verify HTML5 validation (required field)

---

### Test 8: Responsive Design ⚠️
1. [ ] **Desktop (1920x1080):**
   - [ ] ✅ Verify all content fits
   - [ ] ✅ Verify graph is large
   - [ ] ✅ Verify controls are accessible
2. [ ] **Tablet (768x1024):**
   - [ ] Resize browser or use dev tools
   - [ ] ✅ Verify layout adjusts
   - [ ] ✅ Verify navigation still works
   - [ ] ✅ Verify graph still interactive
3. [ ] **Mobile (375x667):**
   - [ ] Resize to mobile size
   - [ ] ⚠️ Graph may be difficult to use (known limitation)
   - [ ] ✅ Verify navigation exists
   - [ ] ✅ Verify content is readable

---

### Test 9: Performance ⚡
1. [ ] **Analyze a large codebase:**
   - [ ] Try path: `/Users/samuelgleeson/dev/c3-platform`
   - [ ] ⏱️ Time the analysis
   - [ ] ✅ Should complete in < 30 seconds
2. [ ] **Test graph with many nodes:**
   - [ ] Analyze c3-platform (if available)
   - [ ] ✅ Graph should render in < 5 seconds
   - [ ] ⚠️ May be slower with 50+ nodes
3. [ ] **Test page load:**
   - [ ] Refresh Analysis page
   - [ ] ⏱️ Should load in < 1 second
4. [ ] **Test navigation speed:**
   - [ ] Click between pages rapidly
   - [ ] ✅ Should feel instant

---

### Test 10: User Experience ✨
1. [ ] **Loading states:**
   - [ ] ✅ Verify spinners show during loading
   - [ ] ✅ Verify buttons disable during actions
   - [ ] ✅ Verify button text changes ("Analyzing...")
2. [ ] **Toast notifications:**
   - [ ] ✅ Verify toasts appear in top-right
   - [ ] ✅ Verify toasts auto-dismiss after ~3s
   - [ ] ✅ Verify different colors (success=green, error=red)
3. [ ] **Visual feedback:**
   - [ ] ✅ Hover over buttons → color changes
   - [ ] ✅ Hover over nodes → cursor changes
   - [ ] ✅ Click node → border appears
   - [ ] ✅ Active nav link → highlighted

---

## 🐛 Bug Report Template

If you find issues, document them like this:

```markdown
## Bug: [Short description]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
[If applicable]

**Browser:**
- Chrome 119
- Firefox 120
- Safari 17

**Console Errors:**
[Any errors from browser console]
```

---

## ✅ Success Criteria

### Must Pass ✅
- [ ] All features work without crashes
- [ ] No console errors (except warnings ok)
- [ ] Analysis completes successfully
- [ ] Graph visualizes correctly
- [ ] Export downloads files
- [ ] Validation shows scores
- [ ] History lists analyses
- [ ] Navigation works between all pages
- [ ] Error messages are user-friendly

### Nice to Have ⭐
- [ ] Fast performance (< 5s for most actions)
- [ ] Smooth animations
- [ ] No layout shifts
- [ ] Mobile usable (even if not perfect)
- [ ] Accessible (keyboard navigation, screen readers)

---

## 🎬 Quick Demo Script (5 minutes)

**For showcasing to stakeholders:**

1. **Start** (30s)
   - Open browser to http://localhost:5173
   - "This is the C3 Module Dependency Analysis UI"

2. **Analyze** (1 min)
   - Navigate to Analysis page
   - Enter c3-projection path
   - Click Analyze
   - Show loading state
   - Show results with metrics

3. **Visualize** (2 min)
   - Click "View Graph"
   - Show interactive graph
   - Zoom and pan
   - Click on a node
   - Show node details
   - Switch layouts
   - Drag nodes (force layout)

4. **Validate** (1 min)
   - Navigate to Architecture page
   - Run validation
   - Show score and grade
   - Explain validation checks

5. **Export** (30s)
   - Go back to Analysis
   - Show export menu
   - Download SVG
   - Open SVG to show it's a real image

6. **Wrap up** (30s)
   - Show History page
   - Explain future features
   - Q&A

---

## 📊 Test Results Template

After testing, fill this out:

```markdown
## Test Results - [Date]

**Tester:** [Name]  
**Browser:** Chrome 119  
**OS:** macOS 14.0

### Tests Passed: X/10
- ✅ Module Analysis: PASS
- ✅ Graph Visualization: PASS
- ✅ Export Functionality: PASS
- ✅ Architecture Validation: PASS
- ✅ Analysis History: PASS
- ✅ Navigation: PASS
- ✅ Error Handling: PASS
- ⚠️ Responsive Design: PARTIAL (mobile issues)
- ✅ Performance: PASS
- ✅ User Experience: PASS

### Issues Found:
1. [Issue description]
2. [Issue description]

### Overall Assessment:
[Summary of testing results]

### Ready for Production?
[ ] Yes  
[ ] No - needs fixes  
[ ] Partially - with known limitations
```

---

## 🚀 Next Steps After Testing

1. **Document all issues found**
2. **Prioritize bugs** (Critical → Low)
3. **Fix critical bugs** first
4. **Re-test** after fixes
5. **Get stakeholder approval**
6. **Plan production deployment**

---

**Happy Testing! 🧪**

*If you encounter any issues, document them and we'll fix them together.*

