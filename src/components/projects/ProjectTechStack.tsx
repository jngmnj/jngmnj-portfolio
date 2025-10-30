import { motion } from 'framer-motion';

interface ProjectTechStackProps {
  techStack?: {
    frontend?: string[];
    styling?: string[];
    deployment?: string[];
    tools?: string[];
    stateManagement?: string[];
    backend?: string[];
    realtime?: string[];
    ai?: string[];
    optimization?: string[];
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  frontend: '프론트엔드',
  styling: '스타일링',
  deployment: '배포',
  backend: '백엔드',
  tools: '도구',
  stateManagement: '상태 관리',
  realtime: '실시간 통신',
  ai: 'AI/ML',
  optimization: '최적화',
};

export default function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  if (!techStack) return null;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900">기술 스택</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category} className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold capitalize text-gray-900">
              {CATEGORY_LABELS[category] || category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {techs?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-seagull-100 text-seagull-800 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

