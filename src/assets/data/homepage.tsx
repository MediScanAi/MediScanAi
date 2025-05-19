import frame from '../../assets/photos/Frame.svg';
import frame1 from '../../assets/photos/Frame1.svg';
import frame2 from '../../assets/photos/Frame3.svg';
import frame3 from '../../assets/photos/Frame4.svg';
import partner1 from '../../assets/photos/partner1.webp';
import partner2 from '../../assets/photos/partner2.webp';
import partner3 from '../../assets/photos/partner3.webp';
import partner4 from '../../assets/photos/partner4.webp';
import partner5 from '../../assets/photos/partner5.webp';
import partner6 from '../../assets/photos/partner6.webp';
import partner7 from '../../assets/photos/partner7.webp';
import partner8 from '../../assets/photos/partner8.webp';
import type { ReactElement } from 'react';
import "../../assets/styles/homepage.css"

interface Activity {
  title: string;
  text: string;
  icon: ReactElement;
  color: string;
}

interface Question {
  title: string;
  text: string;
}

interface Partner {
  id: number;
  image: string;
  link: string;
  name: string;
  description: string;
}

export const activities: Activity[] = [
  {
    title: 'Data Upload',
    text: 'Securely upload your genomic data via encrypted portal',
    icon: <img src={frame} alt="frame" style={{ width: '60px', height: '100px' }} />,
    color: '#e6f7ff',
  },
  {
    title: 'AI Analysis',
    text: 'AI analyzes genomic data using multi-omic integration techniques',
    icon: <img src={frame1} alt="frame1" style={{ width: '60px', height: '100px' }} />,
    color: '#fff1b8',
  },
  {
    title: 'Insights Report',
    text: 'Receive biomarkers and recommendations in a detailed report',
    icon: <img src={frame2} alt="frame2" style={{ width: '60px', height: '100px' }} />,
    color: '#f4ffb8',
  },
  {
    title: 'Clinical Decision',
    text: 'Physicians apply findings for personalized treatment decision',
    icon: <img src={frame3} alt="frame3" style={{ width: '60px', height: '100px' }} />,
    color: '#ffd6e7'
  }
];

export const questions: Question[] = [
  {
    title: 'What is Mediscan AI?',
    text: 'Mediscan AI is an advanced web-based health integration platform that uses artificial intelligence to analyze medical and genomic data. It supports clinicians with fast, accurate, and personalized insights for better patient care.',
  },
  {
    title: 'How does Mediscan AI ensure data security?',
    text: 'We prioritize data privacy and security. Mediscan AI is built with enterprise-level encryption and complies with HIPAA, GDPR, and other global standards, ensuring all health data is fully protected.',
  },
  {
    title: 'Who can use Mediscan AI?',
    text: 'Mediscan AI is designed for healthcare professionals, researchers, and institutions. Its user-friendly interface allows clinicians of all levels to easily access, interpret, and apply AI-driven insights in their workflow.',
  },
  {
    title: 'How accurate are the AI diagnostics?',
    text: 'Our AI models are trained on vast, high-quality datasets and continuously updated to ensure clinical accuracy. Mediscan AI provides detailed, clinician-ready reports backed by real-world medical intelligence.',
  },
  {
    title: 'What makes Mediscan AI different?',
    text: 'Mediscan AI stands out with its seamless integration, fast turnaround times, intuitive design, and trusted clinical accuracy. We bring advanced diagnostics within reach — no specialized training required.',
  },
];

export const partners: Partner[] = [
  {
    id: 1,
    image: partner1,
    link: 'https://www.mcastghik.com/',
    name: 'Astghik Medical Center',
    description: 'Astghik Medical Center is a modern, multidisciplinary hospital offering advanced medical services with international standards and cutting-edge technologies.',
  },
  {
    id: 2,
    image: partner2,
    link: 'https://i-mc.am/',
    name: 'Izmirlyan Medical Center',
    description: 'Izmirlyan Medical Center is a multifunctional hospital known for specialties like urology, cardiology, and surgery, affiliated with the Mother See of Holy Etchmiadzin.',
  },
  {
    id: 3,
    image: partner3,
    name: 'Erebuni Medical Center',
    link: 'https://www.erebunimed.com/',
    description: 'Erebuni Medical Center is Armenia\'s largest hospital, providing full-spectrum care including emergency services, diagnostics, and surgery since 1991.',
  },
  {
    id: 4,
    image: partner4,
    name: 'Davidyants Laboratory',
    link: 'https://davlab.am/hy',
    description: 'Davidyants Laboratory specializes in clinical diagnostics, offering services like histology, immunohistochemistry, and infectious disease testing.',
  },
  {
    id: 5,
    image: partner5,
    link: 'https://slavmed.am/en/',
    name: 'Slawmed Medical Center',
    description: 'Slawmed is a multidisciplinary medical center offering treatments in gynecology, urology, ENT, ophthalmology, and other fields with modern equipment.',
  },
  {
    id: 6,
    image: partner6,
    link: 'https://wigmore.am/en/',
    name: 'Wigmore Medical Center',
    description: 'Wigmore Medical Center provides top-quality care in orthopedics, spine surgery, vascular surgery, cardiology, and more, with a patient-focused approach.',
  },
  {
    id: 7,
    image: partner7,
    name: 'Nairi Medical Center',
    link: 'https://nairimed.com/hy',
    description: 'Nairi Medical Center is a leading Armenian hospital offering high-standard medical care across multiple specialties and promoting medical research and education.',
  },
  {
    id: 8,
    image: partner8,
    link: 'https://blood.am/arm',
    name: 'Hematological Center',
    description: 'The Armenian Hematological Center specializes in diagnosing and treating blood disorders, providing advanced care for both children and adults.',
  },
];