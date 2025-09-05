
# Kleaners Project Knowledge Base

This knowledge base serves as the central repository for all information related to the Kleaners project. It is designed to be kept in sync with the codebase and documentation.

## Structure

- **Project Overview**: General information about the project, its purpose, and architecture
- **Component Guide**: Documentation for components and their usage
- **Technical Documentation**: Technical details about the codebase, API integrations, etc.
- **UI Design System**: Information about the design system, including colors, typography, spacing, etc.
- **Roles & Responsibilities**: Ownership information for different sections of the codebase
- **Deployment Guide**: Instructions for deploying the application to various environments

## Maintenance

This knowledge base is maintained through regular reviews and updates. Each section has assigned owners who are responsible for keeping the information up-to-date.

To validate the knowledge base against the codebase, run the validation script:

```bash
# Windows
src/knowledge/run-validation.bat

# Linux/Mac
sh src/knowledge/run-validation.sh
```

## External Deployment

When deploying this application outside of lovable.dev:

1. **Environment Setup**:
   - Create a `.env` file with necessary environment variables
   - Configure Supabase credentials

2. **Build the Application**:
   ```bash
   npm run build
   ```

3. **Hosting Options**:
   - **Netlify**: Connect your repository and configure build settings
   - **Vercel**: Import your project and configure environment variables
   - **GitHub Pages**: Configure for SPA routing with 404 redirects
   - **Custom Server**: Serve the `dist` folder with proper SPA routing

4. **SPA Routing**:
   Ensure your hosting platform is configured to redirect all routes to `index.html`

For detailed deployment instructions, see the Technical Documentation file.
