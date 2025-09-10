import { DiMysql } from 'react-icons/di';
import { FaCss3, FaFigma, FaHtml5, FaReact } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { RiNextjsFill } from 'react-icons/ri';
import { SiTypescript } from 'react-icons/si';

export const icons = {
  FaFigma,
  FaHtml5,
  IoLogoJavascript,
  FaCss3,
  FaReact,
  RiNextjsFill,
  DiMysql,
  SiTypescript,
};

const myData = [
  {
    name: '💻 경력',
    description: '',
    content: [
      {
        startDate: '2023.01',
        endDate: '2025.03',
        title: 'UIUX Designer / Publisher',
        list: ['코어소프트'],
      },
      {
        startDate: '2022.12',
        endDate: '2021.10',
        title: 'UIUX Designer / Publisher',
        list: ['KNL정보시스템'],
      },
    ],
  },
  {
    name: '📚 교육',
    description: '',
    content: [
      {
        startDate: '2024.03',
        endDate: '재학중',
        title: '컴퓨터과학 전공',
        list: ['한국방송통신대학교'],
      },
      {
        startDate: '2019.10',
        endDate: '2021.05',
        title: 'JAVA/Spring 개발자 양성과정',
        list: ['코리아IT아카데미'],
      },
      {
        startDate: '2013.03',
        endDate: '2018.02',
        title: '계명대학교 미술대학 패션디자인전공',
        list: ['졸업패션쇼'],
      },
    ],
  },
  {
    name: '🛠️ 기술',
    description: '',
    content: [
      {
        title: 'Figma',
        icon: 'FaFigma',
      },
      {
        title: 'Html5',
        icon: 'FaHtml5',
      },
      {
        title: 'Javascript',
        icon: 'IoLogoJavascript',
      },
      {
        title: 'Typecript',
        icon: 'SiTypescript',
      },
      {
        title: 'CSS3',
        icon: 'FaCss3',
      },
      {
        title: 'React',
        icon: 'FaReact',
      },
      {
        title: 'Nextjs',
        icon: 'RiNextjsFill',
      },
      {
        title: 'SQL',
        icon: 'DiMysql',
      },
    ],
  },
  {
    name: '🙋 자기소개',
    description: '',
    content: [
      {
        label: '이름',
        value: '지정민',
      },
      {
        label: '경력',
        value: '5+ years',
      },
      {
        label: 'Email',
        value: 'jngmnj4@gmail.com',
      },
      {
        label: 'Freelance',
        value: 'Available',
      },
      {
        label: '언어',
        value: '한국어, 영어, 일본어',
      },
      {
        label: '경험',
        value:
          '2015.06 ~ 2015.07 FISEP 장학생 하계연수(미국 캘리포니아 UC Irvine)',
      },
      {
        label: '자격/수상',
        value: [
          '2016.11 제 1회 아웃도어&스포츠디자인 공모전 특선(한국아웃도어스포츠산업협회)',
          '2016.11 제7회 한국패션디자인학회 공모전 입선(한국패션디자인학회)',
        ],
      },
    ],
  },
];
export default myData;
