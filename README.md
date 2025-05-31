# Government Petition Email Composer

A web application that helps Kenyan citizens compose and send objection emails regarding the Finance Bill 2025, specifically targeting the proposed deletion of Section 59A(1B) of the Tax Procedures Act.

## 🚫 About the Issue

The 2025 Finance Bill proposes the deletion of Section 59A(1B) in the Tax Procedures Act, which currently prohibits KRA from accessing M-Pesa personal data without proper legal procedures. This application helps citizens voice their objections through proper channels.

## ✨ Features

- **Multiple Recipients**: Choose from various government officials and departments
- **Customizable Templates**: Edit the email content to personalize your message
- **Live Preview**: See how your email will look before sending
- **Mobile Responsive**: Works on all devices
- **Easy Integration**: Opens your default email client with pre-filled content

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository:

```bash
git clone https://github.com/yourusername/government-petition-email-composer.git
cd government-petition-email-composer
```

2. Install dependencies:

```bash
npm install
```

3. Place your HTML file in the `src` directory as `index.html`

### Development

Start the development server:

```bash
npm run dev
```

This will open the application at `http://localhost:3000`

### Building for Production

Create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder.

### Serve Production Build

To test the production build locally:

```bash
npm start
```

## 📁 Project Structure

```
├── src/
│   └── index.html          # Source HTML file
├── dist/                   # Production build (generated)
├── package.json           # Project configuration
├── README.md             # This file
└── .gitignore           # Git ignore rules
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run serve` - Serve production build
- `npm start` - Build and serve
- `npm run clean` - Clean build directory

## 📧 Recipients

The application allows sending emails to:

- **Clerk of the National Assembly** (Default)
- **Finance Committee** (Default)
- **Speaker of the National Assembly**
- **Cabinet Secretary for the National Treasury**
- **Office of the President**
- **Chief Justice of Kenya**

## 🎨 Customization

### Email Template

Edit the email content in the textarea to personalize your message while maintaining the core objection points.

### Subject Line

Customize the email subject to make it more specific to your concerns.

### Styling

The application uses a modern gradient design with responsive layout. CSS can be modified in the `<style>` section of the HTML file.

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Run `npm run build`
3. Copy `dist` contents to a `docs` folder
4. Enable GitHub Pages pointing to the `docs` folder

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel

1. Import your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚖️ Legal Notice

This application is designed to facilitate legitimate civic engagement. Users are responsible for the content of their communications and should ensure they comply with all applicable laws and regulations.

## 🇰🇪 For Kenyan Citizens

This tool is specifically designed to help Kenyan citizens exercise their democratic right to petition their government regarding legislation that may affect their privacy and digital rights.

---

**Stand up for your digital privacy rights. Make your voice heard.**
