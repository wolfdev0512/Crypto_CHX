export interface IFaqs {
  id: string;
  question: string;
  answer: string;
}

export interface ITeams {
  id: string;
  avatar: string;
  name: string;
  role: string;
}

export interface IVideos {
  id: string;
  video_url: string;
  title: string;
  description: string;
}

export interface IAdminDashboard {
  id: string;
  user: string;
  token_sale_countdown: Date;
  primary_mail: string;
  whitepaper_url: string;
  docs_url: string;
  display_team_section: boolean;
  announcements: {
    title: string;
    description: string;
    image_url: string;
    display: boolean;
  };
}
