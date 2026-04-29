# Medigo Health Web App - JSX Fix Task

## Approved Plan Steps (Local Dev Server Fix - Option 1)

### [ ] Step 1: Clear Vite cache
rmdir /s /q node_modules\.vite
- Removes cached builds causing "main.jsx" reference.

### [ ] Step 2: Install/update dependencies (if needed)
npm install

### [ ] Step 3: Start Vite development server
npm run dev
- Opens http://localhost:5173 with proper JSX support.

### [ ] Step 4: Verify fix
- Check browser console: No "Unexpected token '<'" error.
- App loads at localhost:5173.
- Test navigation to admin/doctors etc.

### [ ] Step 5: (Optional) Production deploy prep
- Update .htaccess for JSX MIME types OR
- Run conversion script for all-JS.

**Current Status**: Starting Step 1.

**Next Action**: Execute cache clear and dev server start.

