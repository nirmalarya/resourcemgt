# Resource Management Dashboard

A comprehensive resource management application for tracking team allocations, project timelines, and resource utilization.

![Resource Management Dashboard](https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Features

- **Dashboard Overview**: View key metrics including team utilization, active projects, and upcoming allocations
- **Team Management**: Manage team members, roles, and departments
- **Project Management**: Track projects, timelines, and statuses
- **Resource Allocation**: Assign team members to projects with specific time allocations
- **Resource Calendar**: Visual weekly calendar view of all team allocations
- **Utilization Tracking**: Monitor team and individual utilization rates

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Charts**: ApexCharts
- **UI Components**: Custom components with Radix UI primitives
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/resource-management-dashboard.git
cd resource-management-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
resource-management-dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── allocations/     # Allocation management components
│   │   ├── calendar/        # Resource calendar components
│   │   ├── dashboard/       # Dashboard components and charts
│   │   ├── layout/          # Layout components (sidebar, header)
│   │   ├── projects/        # Project management components
│   │   └── teams/           # Team management components
│   ├── store/               # Zustand state management
│   │   └── resourceStore.ts # Main store for resources data
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── .gitignore
├── index.html               # HTML entry point
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project documentation
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Usage Guide

### Dashboard

The dashboard provides an overview of your team's resource allocation status:

- **Team Members**: Total number of team members and departments
- **Active Projects**: Count of currently active projects
- **Team Utilization**: Average utilization percentage for the current week
- **Upcoming Allocations**: Number of allocations scheduled in the next 7 days
- **Utilization Chart**: Visual representation of team utilization over time
- **Recent Allocations**: Table showing the most recent resource allocations

### Team Management

Manage your team members:

- View all team members with their roles and departments
- Add new team members
- Edit existing team member details
- Remove team members from the system

### Project Management

Track and manage all projects:

- View all projects with their timelines and statuses
- Add new projects with client information and dates
- Update project details and status
- Archive or delete completed projects

### Resource Allocation

Assign team members to projects:

- Create new allocations with specific time periods and hours per day
- View existing allocations
- Edit allocation details (dates, hours)
- Remove allocations

### Resource Calendar

Visualize team allocations in a calendar view:

- Weekly calendar showing all team members and their assignments
- Navigate between weeks
- Color-coded project assignments
- Quick view of daily allocations

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the look and feel by modifying:

- `tailwind.config.js` for theme customization
- `src/index.css` for global styles

### Data

The application uses sample data stored in the Zustand store. To connect to a real backend:

1. Modify the store actions in `src/store/resourceStore.ts` to make API calls
2. Update the data structures as needed to match your backend schema
3. Implement proper error handling and loading states

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [ApexCharts](https://apexcharts.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
